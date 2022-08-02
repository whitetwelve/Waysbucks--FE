import React, { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { UserContext } from './context/user-context';
import { API } from "./config/API"
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from "./pages/auth/Main"
import AddDrink from './pages/admin/Add-drink';
import AddTopping from './pages/customer/Add-topping';
import Home from './pages/customer/Home';


function App() {

  const moving = useNavigate()
  const [state, dispatch] = useContext(UserContext)
  console.log(state);

  useEffect(() => {
    if(state.isLogin === false) { 
      return moving ('/Auth')
    }
  },[])
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/Auth' element={<Main/>}/>
        <Route exact path='/add-drink' element={<AddDrink/>}/>
        <Route exact path='/detail-drink/:id' element={<AddTopping/>}/>
    </Routes>
  );
}

export default App;
