import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import mylogo from '../assets/images/CM-logo.webp'


function Header(userId) {
  const auth = localStorage.getItem('user')

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/signUp')
  }

  return (
    <div className='header'>
      <img className='mylogos' src={mylogo} alt="logo" />
      {auth ? ( < ul className='nav-ul'>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/add'>Add Product</Link></li>
        <li><Link to='/update'>Update Products</Link></li>
        {/* <li ><Link to='/profile'>Profile</Link></li> */}
        <li ><Link to='/profile'>Profile</Link></li>
        <li className='nav-logout'><Link onClick={logout} to='/signup'>Logout({JSON.parse(auth).name})</Link></li>
        </ul>
       ) :  (
      <ul className='nav-ul nav-right'>
         <li> <Link to='/signUp'>Sign Up</Link></li>
         <li> <Link to='/login'>Login</Link></li>
      </ul>
)}
        {/* this condition will only help for signup and logout condition */}
        {/* <li>{auth?<Link onClick={logout} to='/signup'>Logout</Link>:<Link to='/signUp'>Sign Up</Link>}</li>
                <li><Link to='/login'>Login</Link></li> */}

        {/* Lets write same this with differently */}
        {/* {
          auth ? <li><Link onClick={logout} to='/signup'>Logout</Link></li>
            :<>
              <li> <Link to='/signUp'>Sign Up</Link></li>
              <li> <Link to='/login'>Login</Link></li>
            </>
        } */}
      
    </div>
  )
}

export default Header
