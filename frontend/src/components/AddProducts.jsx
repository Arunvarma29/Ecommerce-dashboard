import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddProducts() {
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [category,setCategory]=useState('')
    const [company,setCompany]=useState('')
    const [error,setError]=useState('')
    const navigate=useNavigate()

    const addProducts=async()=>{

    if(!name || !price || !category || !company){
        setError(true)
        return false;
    }

        console.log(name,price,category,company);
        const userId= JSON.parse(localStorage.getItem('user'))._id;
        let result= await fetch('http://localhost:7000/add-product',{
            method:'POST',
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        console.log(result);
        navigate('/')
        
     }


  return (
    <div className='products'>
        <h1>Add Your Product</h1>
      <input type="text" placeholder='Enter Name' className='inputBox'  value={name} onChange={(e)=>{setName(e.target.value)}}/>
      {error && !name && <span className='invalid-input'>*Field is empty*</span>}
      <input type="text" placeholder='Enter Price' className='inputBox' value={price} onChange={(e)=>{setPrice(e.target.value)}} />
      {error && !price && <span className='invalid-input'>*Field is empty*</span>}
      <input type="text" placeholder='Enter Category' className='inputBox' value={category} onChange={(e)=>{setCategory(e.target.value)}} />
      {error && !category && <span className='invalid-input'>*Field is empty*</span>}
      <input type="text" placeholder='Enter Company' className='inputBox' value={company} onChange={(e)=>{setCompany(e.target.value)}} />
      {error && !company && <span className='invalid-input'>*Field is empty*</span>}

      <button onClick={addProducts} className='appBtn'>Add Product</button>
    </div>
  )
}

export default AddProducts
