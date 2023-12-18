import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { cartContext } from '../../Context/cartContext';

export default function CategoryDetailes() {
  let { showCart, setcartNum } = useContext(cartContext)

  async function cartProduct() {
    let { data } = await showCart();
    setcartNum(data.numOfCartItems);
  }
  useEffect(()=>{
    cartProduct()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let params=useParams()
  console.log(params.id);
  function getCategoryDetailes(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }

  let {data}=useQuery('specific category',()=>getCategoryDetailes(params.id))
  console.log(data);
  return <>
  
  <div className="row d-flex align-items-center my-5 spac">
      <div className="col-md-4">
        <img className='w-100' src={data?.data.data.image} alt={data?.data.data.title} />
        
      </div>
      <div className="col-md-8 ">
        <h2 className='text-center'>{data?.data.data.name}</h2>
        
      </div>
    </div>
  </>
}
