import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { cartContext } from '../../Context/cartContext';

export default function ProductDetailes() {

  let { addToCart, setcartNum, heart, delWishList, showWishList } = useContext(cartContext)
  let [isLoad, setIsLoad] = useState();
  let [product, setProduct] = useState([])

  async function addedToCart(id) {
    let resp = await addToCart(id)
    console.log(resp);
    if (resp.data.status === 'success') {
      toast.success('Product Added to Your Cart');
      setcartNum(resp.data.numOfCartItems)
    }
  }
  let params = useParams()

  async function productDetailes(id) {
    setIsLoad(true)
    let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    console.log(response);
    let { data } = await showWishList();
    console.log(data);
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].id === params.id) {
        response.data.data.color = true
      }

    }
    setProduct(response.data.data)
    setIsLoad(false)
  }
  console.log(product);

  async function addAndRemoveHart(id) {
    if (document.getElementById(`${id}`).classList.contains('active') === true) {
      await delWishList(id)
      document.getElementById(`${id}`).classList.replace('active', 'blac')
      toast.success("Product removed from Your Wish List", { className: 'bg-warning' });
    }
    else {
      await heart(id)
      document.getElementById(`${id}`).classList.replace('blac', 'active')
      toast.success("Product Added to Your Wish List", { className: 'bg-danger' });

    }
  }

  useEffect(() => {
    productDetailes(params.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  return <>
    {isLoad ? <div className="container d-flex justify-content-center"> <button className='btn m-auto vh-100' type='button'><ThreeDots
      height="50"
      width="80"
      radius="9"
      color="#4fa94d"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible={true}
    /></button> </div> :
      <div className="">
        {product? 
          <div className='row d-flex align-items-center spac'>
            <div className="col-md-4">
              <Slider {...settings}>
                {product.images?.map((image, ind) => <img key={ind} src={image} alt={product?.title} />)}
              </Slider>
            </div>
            <div className="col-md-8 ">
              <h3>{product?.title}</h3>
              <p>{product?.description}</p>
              <div className="d-flex justify-content-between">
                <span>Price :{product?.price} eg</span>
                <span> <i className='fas fa-star text-warning'>{product?.ratingsAverage}</i></span>
              </div>
              <div className="d-flex justify-content-end ">
                <div className='my-3'>
                  <i onClick={() => addAndRemoveHart(product?.id)} id={product?.id} className={product?.color ? 'heart active fa-solid fa-heart' : 'heart fa-solid fa-heart blac'}></i>
                </div>
              </div>
              <button onClick={() => addedToCart(params.id)} className='btn btn-sm  bg-main text-white w-100 mt-2 p-2'>add to cart</button>
            </div>
          </div>:''}
      </div>

    }
  </>
}