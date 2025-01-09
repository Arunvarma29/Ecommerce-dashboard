import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function profile() {

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  const userId=localStorage.getItem('userId')

  const handleProfile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };


  useEffect(() => {
    console.log(userId);
    if (userId) {
      getUserDetails(userId);
    }
  }, [])



  const getUserDetails = async () => {

    try {
      let result = await fetch(`http://localhost:7000/userprofile/${userId}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if (result) {
        console.log(result)
        setImage(result.image || '');
        setName(result.name || '');
        setEmail(result.email || '');
        setPassword(result.password || '');
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  }



  const updateUserData = async () => {
    console.log(name, email, password);
    let result = await fetch(`http://localhost:7000/userprofile/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ name, email, password,image }),
      headers: {
        'Content-Type': 'application/json',
         authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    result = await result.json();
    console.log(result);
    navigate('/profile')
    alert("Data updated successfully");
  }



  return (
    <div className='profContainer'>
      <div className='profile'>
        <h1>Profile</h1>
        <div className='profuploader'>
          {<img src={image} className="profile-image" />}
          <input type="file" onChange={handleProfile} />
        </div>
        <input className='inputBox'
          type="text"
          placeholder='Name'
          value={name}
          onChange={(e) => { setName(e.target.value) }} />

        <input className='inputBox'
          type="email"
          placeholder='Email'
          value={email}
          onChange={(e) => { setEmail(e.target.value) }} />

        <input className='inputBox'
          type="text"
          placeholder='Password'
          value={password}
          onChange={(e) => { setPassword(e.target.value) }} />

        <button onClick={updateUserData}
          className='profBtn'>
          Update</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      </div>
    </div>
  )
}

export default profile
