import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import SignUp from './components/signUp';
import PrivateComponent from './components/privateComponent';
import Login from './components/login';
import AddProducts from './components/AddProducts';
import ProductList from './components/ProductList';
import UpdateProducts from './components/updateProducts';
import Profile from './components/profile';


function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>

          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />

          <Route element={<PrivateComponent />}>

          <Route path='/' element={<ProductList/>} />
            <Route path='/add' element={<AddProducts/>} />
            <Route path='/update/:id' element={<UpdateProducts/>} />
            {/* <Route path='/update' element={<UpdateProducts/>} /> */}
            <Route path='/profile' element={<Profile/>} />
            {/* <Route path='/profile' element={<h1> Profile Component</h1>} /> */}
            
          </Route>

        </Routes>
      </BrowserRouter>
      <Footer />

    </>
  )
}

export default App
