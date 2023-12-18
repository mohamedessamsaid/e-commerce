import React, { useContext, useEffect } from 'react'
import { cartContext } from '../../Context/cartContext'
import { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import toast from 'react-hot-toast'

export default function Wishlist() {
  let [wish, setWish] = useState([])
  let { showWishList, delWishList, addToCart, setcartNum, showCart, setCartProd } = useContext(cartContext)

  async function addtoWishList() {
    let { data } = await showWishList()
    setWish(data)
    setcartNum(data.numOfCartItems);
    console.log(data);
  }

  async function delWish(id) {
    let { data } = await delWishList(id)
    setWish(data)
    addtoWishList()
    console.log(data);
  }
  async function addedToCart(id) {
    let resp = await addToCart(id)
    console.log(resp);
    if (resp.data.status === 'success') {
      toast.success('Product Added to Your Cart');
      setcartNum(resp.data.numOfCartItems)
      delWishList(id)
      addtoWishList()
    }
  }
  async function cartProduct() {
    let { data } = await showCart();
    setCartProd(data);
    if (data?.numOfCartItems !== undefined) {
      setcartNum(data.numOfCartItems);
    }
  }
  useEffect(() => {
    addtoWishList();
     cartProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <>
    {wish?.count === undefined ? (
      <div className="bg-light row py-3">
        <div>
          <h3 className="size">Wish List is Empty</h3>
        </div>
      </div>
    ) : (
      <div>
        {wish ? (<div className="bg-light row py-3">
          <div>
            <h3 className="size">Wish List : </h3>
            <h5>Proudcts Number :{wish.count}</h5>
          </div>
          {wish?.data.map((prod, ind) => (
            <div key={ind} className="row py-2">
              <div className="col-md-2">
                <img
                  className="w-100"
                  src={prod.imageCover}
                  alt=""
                />
              </div>
              <div className="col-md-8 d-flex justify-content-center flex-column">
                <h3>{prod.title}</h3>
                <h6 className="color-red">Price :{prod.price}</h6>
                <button onClick={() => delWish(prod.id)} className="btn width"  >
                  <i className="fa-solid fa-trash-can tra"></i> Remove</button>
              </div>
              <div className="col-md-2 d-flex justify-content-center align-items-center">
                <button onClick={() => addedToCart(prod.id)} className='btn btn-sm  bg-main text-white w-100 mt-2 '>add to cart</button>
              </div>
              <hr className="my-2 p-0" />
            </div>
          ))}
        </div>
        ) : (
          <div className="container d-flex justify-content-center">
            <button className="btn m-auto vh-100" type="button">
              <ThreeDots
                height="50"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
              />
            </button>{" "}
          </div>
        )}
      </div>
    )}
  </>
}
