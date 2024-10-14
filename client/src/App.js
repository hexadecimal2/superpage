// App.js
import React from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Home from './components/home';
import Login from './components/login';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/signup';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>        
        
        <Route path='/' element={<Navigate to={'/Login'} />}/>
        
        <Route path='/Login' element={
                  <div className="app">  
                  <Sidebar />
            <div className="main-content">
              <Login/>
            </div>
          </div>
        }/>

        <Route path='/SignUp' element={
                  <div className="app">  
                  <Sidebar />
            <div className="main-content">
              <SignUp/>
            </div>
          </div>
        }/>
        
        <Route path='/Home' element = {
        <div className="app">  
            <Sidebar />
            <div className="main-content">
            <Home/>
            </div>
        </div>
        }/>
        

      
      </Routes>
    </BrowserRouter>
    );
};

export default App;
