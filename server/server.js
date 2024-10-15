const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { GoogleGenerativeAI } = require('@google/generative-ai')
require('dotenv').config();
const app = express();


const genAI = new GoogleGenerativeAI(process.env.API_KEY)
const model = genAI.getGenerativeModel({
    model : "gemini-pro"
});

const pool = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    port : process.env.DB_PORT,
    connectionLimit : process.env.DB_CONNECTION_LIMIT
}).promise();

app.use(cookieParser());
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());




app.post('/add', async (req, res) => {

    const data = req.body;
   
    //handle checking on server side 
    if (data.Name === '' || data.Email === '' || data.Password === '' ){
       return res.send({message : 'please fill all fields'});
     } 
    if (!String(data.Email).includes('@gmail.com')){
       return res.send({message : 'invalid email'})
     }
    if (String(data.Password).length < 8 || ! /[A-Z]/.test(data.Password) || ! /[0-9]/.test(data.Password)){
      return res.send({message : 'password not valid'}) 
    } 
    
      console.log(data.Password);    
      
      const hash = await bcrypt.hash(data.Password, 10);
       
      //insert the password into the database + put it into the token
      await pool.query(`INSERT INTO users (name) VALUES ('${data.Name}')`)
      const id = await pool.query(`SELECT * FROM users WHERE userID = (SELECT max(userID) FROM users);`);
      await pool.query(`INSERT INTO user_data (userID, email, password) VALUES (${id[0][0].userID}, '${data.Email}', '${hash}');`)
       
      //const msg = await bcrypt.compare(data.Password, hash);
      //console.log(msg);
   
       return res.send({message : 'success'});

})


app.post('/getuser', async (req, res) => {

    const data = req.body;
    const password = await pool.query(`SELECT password FROM user_data WHERE email = '${data.Email}'`) 
 
 
    if (data.Password == '') {
     return res.send({message : 'nopassword'});
    } else {
    
    const confirm = await bcrypt.compare(data.Password, password[0][0].password)
    
    if (confirm) {
         const id = await pool.query(`SELECT userID FROM user_data WHERE email = '${data.Email}'`); 
         const token = jwt.sign({id : id}, process.env.JWT_SECRET, {expiresIn : "1h"});
         
         res.cookie("token", token, {httpOnly : true})
         
         return res.send({message : 'passwordvalid', data : id})
    } else {
         return res.send({message : 'passwordnotvalid'})
    }
 
 
 
 
 }
 
 })


 app.post('/question', async (req, res) => {

    const token =  req.cookies.token;
    const data = jwt.verify(token, process.env.JWT_SECRET)

    if (data !== undefined){        
      
        const question = req.body.Question;

        const chat = model.startChat({
            history: [
                {
                    role : 'user',
                    parts: [{text : 'Hello, I would like you to assist today'}]
                },
                {
                    role : 'model',
                    parts: [{text: "Hello, how can i assist you today?"}]
                }
            ],
            generationConfig: {
                maxOutputTokens : 100
            }
        });

        const result = await chat.sendMessage(question);
        const response = await result.response;
        const text = response.text();

        console.log(text);


        return res.send({message : 'success', Response : 'hi' });}
    else{
        return res.send({message : 'failed to verify token!'});
    }

    
})




app.listen(5000, () => {
    console.log('Server running on port 5000!');
})