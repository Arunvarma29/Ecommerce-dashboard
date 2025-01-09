import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ProductList() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    let result = await fetch('http://localhost:7000/products',{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result)
  }

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:7000/products/delete/${id}`, {
      method: 'DELETE',
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      },

    });
    result = await result.json();
    if (result) {
      alert('Record is deleted')
      getProducts();
    }
  }

  const searchHandle=async(event)=>{
    let key = event.target.value;
    if(key){
      let result=await fetch(`http://localhost:7000/search/${key}`,{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result=await result.json();
      if(result){
        setProducts(result)
      }
      else{
        getProducts()
      }
    }
  }
  // console.log('Products', products);

  return (
    <div className='product-list'>
      <h1> Product list</h1>
      <input type='search' className='searchBox' placeholder='Search Product' onChange={searchHandle} />
      <ul>
        <li><b>S. No</b></li>
        <li><b>Name</b></li>
        <li><b>Price</b></li>
        <li><b>Category</b></li>
        <li><b>Company Name</b></li>
        <li><b>Operation</b></li>
      </ul>
      {
        products.length>0 ? products.map((item, index) =>
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>$ {item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
             &nbsp;&nbsp;<button> <Link to={'/update/'+item._id}>Update</Link> </button>

            </li>
          </ul>
        )
        : <h1>No data available</h1>
      }
    </div>
  )
}

export default ProductList
