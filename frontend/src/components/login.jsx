import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';

function Login() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();

    useEffect(()=>{
        const auth=localStorage.getItem('user');  
        if(auth){
            navigate('/')
        }
    },[])

    const handleLogin= async()=>{
        console.log(email,password);
        
        let result=await fetch('http://localhost:7000/login',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });

        result=await result.json()
        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));
            localStorage.setItem('userId', result.user._id)
            navigate('/');
        }
        else{
            alert('Please enter correct details');
        }
        
    }

  return (
    <div className='loginBox'>
      <h1>Login </h1>
        <input className='inputBox' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter Email' />
        <input className='inputBox' type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter Password' />
        <button className='appBtn' type='button' onClick={handleLogin}> Login</button>

        <label className='loginlabel' htmlFor="">Do you have account?&nbsp;<Link to='/signUp'>Sign Up</Link></label>
    </div>
  )
}

export default Login
