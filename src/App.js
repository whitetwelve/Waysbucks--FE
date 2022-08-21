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
import { API, setAuthToken } from "./config/API"
import MainAdmin from "./pages/admin/Main-Admin"
import EditProfile from './pages/customer/Edit-Profile';
import UpdateDrink from './pages/admin/Update-drink';
import { CartContext } from './context/cart-context';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {

  const moving = useNavigate()
  const [state,dispatch] = useContext(UserContext)
  // console.log(state);
  const [payload, _] = useContext(CartContext)
  // console.log(payload);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    if(state.isLogin === false) {
      return moving('/Auth')
    }
  },[state])
  
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log(response);
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      console.log(payload);
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);
  return (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/profile' element={<Profile/>}/>
        <Route exact path='/edit-profile/:id' element={<EditProfile/>}/>
        <Route exact path='/cart' element={<Cart/>}/>
        <Route exact path='/transaction' element={<Transaction/>}/>
        <Route exact path='/Auth' element={<Main/>}/>
        <Route exact path='/add-drink' element={<AddDrink/>}/>
        <Route exact path='/add-toping' element={<AddToping/>}/>
        <Route exact path='/main-admin' element={<MainAdmin/>}/>
        <Route exact path='/update-product/:id' element={<UpdateDrink/>}/>
        <Route exact path='/detail-drink/:id' element={<DetailProduct/>}/>
    </Routes>
  );
}

export default App;
