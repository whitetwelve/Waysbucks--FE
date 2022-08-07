import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import { UserContext } from './context/user-context';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from "./pages/auth/Main"
import AddDrink from './pages/admin/Add-drink';
import DetailProduct from './pages/customer/Detail-product';
import Home from './pages/customer/Home';
import AddToping from './pages/admin/Add-topping';
import Profile from './pages/customer/Profile';
import Cart from './pages/customer/Cart';
import Transaction from './pages/admin/Transaction';


function App() {

  const moving = useNavigate()
  const [state,_] = useContext(UserContext)
  console.log(state);


  useEffect(() => {
    if(state.isLogin === false) {
      return moving('/Auth')
    }
    if(state.user.email === 'admin@mail.com') { 
      alert("Login Succes!")
      moving ('/transaction')
    } else if(state.user.email === "inggil@mail.com") {
      alert("Login Success!")
      moving('/')
    } else if(state.user.email === "fuad@mail.com") {
      alert("Login Success!")
      moving('/')
    } else if(state.isLogin === false) {
      alert('...')
    }
  },[state])
  
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path='/transaction' element={<Transaction/>}/>
        <Route exact path='/Auth' element={<Main/>}/>
        <Route exact path='/add-drink' element={<AddDrink/>}/>
        <Route exact path='/add-toping' element={<AddToping/>}/>
        <Route exact path='/detail-drink/:id' element={<DetailProduct/>}/>
    </Routes>
  );
}

export default App;
