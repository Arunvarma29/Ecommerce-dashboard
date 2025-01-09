import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function UpdateProducts() {
    const [name,setName]=useState('')
    const [price,setPrice]=useState('')
    const [category,setCategory]=useState('')
    const [company,setCompany]=useState('')
    const params=useParams();
    const navigate=useNavigate()

    useEffect(()=>{
      getProductDetails();
    },[])
  
    const getProductDetails= async()=>{
      console.log(params);
      let result= await fetch(`http://localhost:7000/products/${params.id}`,{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result=await result.json();
      console.log(result)
      setName(result.name)
      setPrice(result.price)
      setCategory(result.category)
      setCompany(result.company)      
    }


    const updateProd=async()=>{
            console.log(name,price,category,company); 
            let result = await fetch(`http://localhost:7000/products/${params.id}`,{
              method:'PUT',
              body:JSON.stringify({name,price,category,company}),
              headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
            })    
            result=await result.json();
            console.log(result);
            navigate('/')    
     }


  return (
    <div className='products'>
        <h1>Update Your Product</h1>
      <input type="text" placeholder='Enter Name' className='inputBox'  value={name} onChange={(e)=>{setName(e.target.value)}}/>
           <input type="text" placeholder='Enter Price' className='inputBox' value={price} onChange={(e)=>{setPrice(e.target.value)}} />
           <input type="text" placeholder='Enter Category' className='inputBox' value={category} onChange={(e)=>{setCategory(e.target.value)}} />
           <input type="text" placeholder='Enter Company' className='inputBox' value={company} onChange={(e)=>{setCompany(e.target.value)}} />
     
      <button onClick={updateProd} className='appBtn'>Update</button>
    </div>
  )
}

export default UpdateProducts
