import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/cartContext'

export default function Categories() {
  let { setCartProd, showCart, setcartNum } = useContext(cartContext)

  async function cartProduct() {
    let { data } = await showCart();
    setCartProd(data);
    if (data?.numOfCartItems !== undefined) {
      setcartNum(data.numOfCartItems);
    }
  }
  useEffect(()=>{
    cartProduct()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  function getCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then((res) => res).catch((err) => err)
  }
  let { data, isLoading } = useQuery('category', getCategory)
  console.log(data?.data.data);
  return <>
    {isLoading ? <div className="container d-flex justify-content-center"> <button className='btn m-auto vh-100' type='button'><ThreeDots
      height="50"
      width="80"
      radius="9"
      color="#4fa94d"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    /></button> </div> :
      <div className="row g-5 my-3 spac">
        {data.data.data.map((cat, ind) =>
          <div key={ind} className="col-md-4">
            <Link to={`/categoryDetailes/${cat._id}`}>
              <div key={cat._id} className=" cate">
                <img height={400} className='w-100' src={cat.image} alt="" />
                <h3 className='text-center'>{cat.name}</h3>
              </div>
            </Link>
          </div>
        )}
      </div>}
  </>
}
