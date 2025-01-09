import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate=useNavigate();
  

  useEffect(()=>{
    const auth=localStorage.getItem('user')
    if(auth){
      navigate('/')
    }
  },[])

  const collectData = async () => {
    console.log(name, email, password);
    
    let result = await fetch('http://localhost:7000/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    result=await result.json()
    console.log(result);
    // if(result){
      localStorage.setItem('user',JSON.stringify(result.result));
      localStorage.setItem('token',JSON.stringify(result.auth));
      navigate('/')
    // }
    // else{
      // console.log(Error);
      
    // }
    
  }

  return (
    <>
      <div className='signUpbox'>
        <h1>Register</h1>
        <input className='inputBox' type="text" onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
        <input className='inputBox' type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
        <input className='inputBox' type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
        <button className='appBtn' type='button' onClick={collectData}> Sign Up</button>

        <label className='loginlabel'>Do you have account?&nbsp;<Link to='/login'>Login</Link></label>

      </div>
    </>
  )
}

export default SignUp
