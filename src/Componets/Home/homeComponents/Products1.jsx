import React, { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import { cartContext } from "../../../Context/cartContext";
import toast from "react-hot-toast";


export default function Products1() {
  let [product, setProduct] = useState(null)
  let [isLoad, setisLoad] = useState(false)
  let [search, setsearch] = useState('');
  let { addToCart, setcartNum, heart, delWishList, setCartProd, showCart, showWishList } = useContext(cartContext)

  async function addedToCart(id) {
    let resp = await addToCart(id)
    console.log(resp);
    if (resp?.data.status === 'success') {
      toast.success('Product Added to Your Cart');
      setcartNum(resp.data.numOfCartItems)

    }
  }

  async function cartProduct() {
    let { data } = await showCart();
    setCartProd(data);
    // console.log(data);
    if (data?.numOfCartItems !== undefined) {
      setcartNum(data.numOfCartItems);
    }
  }

  async function getProducts() {
    setisLoad(true)
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')


    let response = await showWishList();
    // console.log(response.data.data);
    for (let i = 0; i < data?.data.length; i++) {
      for (let x = 0; x < response.data?.data.length; x++) {
        if (data?.data[i].id === response?.data.data[x].id) {
          data.data[i].color = true
        }

      }
    }
    setProduct(data?.data)
    setisLoad(false)
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
    cartProduct()
    getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



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
    /></button> </div> : <div className="container spac pt-3">
      {product ?
        <div>
          <form action="" className="form-inline half mb-3" >
            <input onChange={(e) => setsearch(e.target.value)} className="form-control mr-sm-2 w-50" type="search" placeholder="Search" aria-label="Search" />
          </form>
          <div className="row gy-5">
            {product?.filter((item) => {
              return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search);
            }).map((prod, ind) => <div key={ind} className="col-md-3">

              <div className='p-2 my-2 bg-white product'>
                <Link to={`/productDetailes/${prod.id}`}>
                  <img src={prod?.imageCover} className='w-100' alt="" />
                  <h6 className='text-success'>{prod?.category.name}</h6>
                  <h3 className='h5'>{prod?.title.split(' ').slice(0, 3).join(' ')}</h3>
                  <div className="d-flex justify-content-between">
                    <span>{prod?.price}</span>
                    <span> <i className='fas fa-star text-warning'>{prod?.ratingsAverage}</i></span>
                  </div>
                </Link>
                <div className="d-flex justify-content-end ">
                  <div className='my-3'>
                    <div>
                      <i onClick={() => addAndRemoveHart(prod?.id)} id={prod?.id} className={prod?.color ? 'heart active fa-solid fa-heart' : 'heart fa-solid fa-heart blac'}></i>
                    </div>
                  </div>
                </div>

                <button onClick={() => addedToCart(prod?.id)} className='btn btn-sm  bg-main text-white w-100 mt-2 '>add to cart</button>
              </div>
            </div>)
            }
          </div>
        </div>
        : ''}

    </div >}

  </>
}
