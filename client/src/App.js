// App.js
import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Home from './pages/home';

const App = () => {


return(
<BrowserRouter>
  <Routes>
    <Route path='/' element={<Navigate to={'/login'}/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signUp' element={<Signup/>}/>
    <Route path='/home' element={<Home/>}/>   
  </Routes>
</BrowserRouter>)

}

export default App;
