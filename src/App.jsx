import React, { useEffect } from 'react';
import Header from './Component/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Card from './Component/Card';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ProductDetails } from './Component/ProductDetails';
import {HelmetProvider} from 'react-helmet-async'
import ProductSearch from './Component/ProductSearch';
import Login from './Component/User/Login';
import Register from './Component/User/Register';
import { Home } from './Component/Home';
import store from './store'
import { loaduser } from './action/UserActions';
import { ToastContainer } from 'react-toastify';
import Profile from './Component/Profile';
import UpdateProfile from './Component/User/UpdateProfile';
import ProtectorRoute from './Component/Routes/ProtectorRoute';



function App() {

    useEffect(()=>{

   store.dispatch(loaduser)
  
    })
 
  return (
    <>
      <BrowserRouter>
      <HelmetProvider>
        <Header />
        <ToastContainer/>
        <div className='container container-fluid'>
          <Routes>
            <Route path='/E-commerce-website-Mern-stack/' element={<Home/>} />
            <Route path='/' element={<Home/>} />
            <Route path='/search/:keyword' element={<ProductSearch/>}/>
            <Route path='/Cart' element={<Card/>} />
            <Route path='/Productviews/:id' element={<ProductDetails/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>}/>
            <Route path='/update/Myprofile' element={<ProtectorRoute><UpdateProfile/></ProtectorRoute>}/>
            <Route path='/Myprofile' element={<ProtectorRoute><Profile/></ProtectorRoute>} />
          </Routes>
        </div>
        </HelmetProvider>
      </BrowserRouter>
      
    </>
  );
}

export default App;
