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
app.use(cors({origin: 'https://singular-buttercream-c6141b.netlify.app/', credentials: true}));
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
 
    console.log(password);
 
    if (data.Password == '' || password[0][0] === undefined ) {
     return res.send({message : 'nopassword'});
    } 
    else {
    
    

    const confirm = await bcrypt.compare(data.Password, password[0][0].password)
    
    if (confirm) {
         const id = await pool.query(`SELECT userID FROM user_data WHERE email = '${data.Email}'`); 
         const name = await pool.query(`SELECT name FROM users WHERE userID = ${id[0][0].userID}`);
         const token = jwt.sign({ID : id[0][0].userID}, process.env.JWT_SECRET, {expiresIn : "1h"});
         const responses = await pool.query(`SELECT question, response FROM prompts WHERE userID = ${id[0][0].userID};`)
         res.cookie("token", token);//{httpOnly : true})
    

         return res.send({message : 'passwordvalid', ID : id, Responses : responses[0], Name : name[0][0].name})
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


        await pool.query(`INSERT INTO prompts (userID, question, response) VALUES (${data.ID}, '${question}', '${text}');`);
    
        const name = await pool.query(`SELECT name FROM users WHERE userID = ${data.ID}`); 
        
        return res.send({message : 'question_sent', Response : text, Name : name[0][0].name});}
    else{
        return res.send({message : 'failed to verify token!'});
        
    }

    
})

app.post('/getresponse', async (req, res) => {

    const token =  req.cookies.token;
    const data = jwt.verify(token, process.env.JWT_SECRET)
    
    if (data !== undefined){
        const id = req.body.ID + 1

        const promptdata = await pool.query(`SELECT question, response FROM prompts WHERE promptID = ${id}`)
        
        const name = await pool.query(`SELECT name FROM users WHERE userID = ${data.ID}`);
        
        return res.send({message : 'response_gotten', Response : promptdata[0][0].response, Name : name[0][0].name, Question : promptdata[0][0].question})
    
    }
    
    else{
        return res.send({message : 'failed to verify token'});
    }


});

app.post('/getresponses', async (req, res) => {


    const token =  req.cookies.token;
    const data = jwt.verify(token, process.env.JWT_SECRET)
    
    if (data !== undefined){

        const name = await pool.query(`SELECT name FROM users WHERE userID = ${data.ID}`);
        const responses = await pool.query(`SELECT question, response FROM prompts WHERE userID = ${data.ID};`)
        return res.send({message : 'showmessages', ID : data.ID, Responses : responses[0], Name : name[0][0].name})
    } 
    else{
        return res.send({message : 'failed to verify token'});
    }


});


app.listen(5000, () => {
    console.log('Server running on port 5000!');
})