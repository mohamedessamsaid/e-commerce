import React, { useContext, useEffect } from "react";
import { cartContext } from "../../Context/cartContext";
import { Link, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

export default function Cart() {
  let navigate = useNavigate();

  let { showCart, deletCart, upDateCount, clearCart, setcartNum, cartprod, setCartProd } = useContext(cartContext);

  async function cartProduct() {
    let { data } = await showCart();
    setCartProd(data);
    if (data?.numOfCartItems !== undefined) {
      setcartNum( data.numOfCartItems );
    }
    console.log(data);
  }

  async function delItem(id) {
    let { data } = await deletCart(id);
    setCartProd(data);
    setcartNum(data.numOfCartItems);
  }
  async function dataCount(id, count) {
    let { data } = await upDateCount(id, count);
    setCartProd(data);
    setcartNum(data.numOfCartItems);
  }
  async function CountMin(id, count) {
    if (count >= 2) {
      let { data } = await upDateCount(id, count - 1);
      setCartProd(data);
      setcartNum(data.numOfCartItems);
    }
    else {
      delItem(id)
    }
  }

  async function clear() {
    let { data } = await clearCart();
    setCartProd(data);
    setcartNum(data.numOfCartItems);
    navigate("/home")
  }
  
  useEffect(() => {
    cartProduct();
    console.log(cartprod);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {cartprod?.data === undefined ? (
        <div className="row spac">
          <div>
            <h3 className="size">Shop Cart is Empty</h3>
            <h5>Total Cart Price :0</h5>
          </div>
        </div>
      ) : (
        <div>
          {cartprod ? (
            <div className="bg-light row spac">
              <div>
                <h3 className="size">Shop Cart : {cartprod.numOfCartItems}</h3>
                <h5>Total Cart Price :{cartprod.data.totalCartPrice}</h5>
              </div>
              {cartprod?.data.products.map((prod, ind) => (
                <div key={ind} className="row py-2">
                  <div className="col-md-1">
                    <img
                      className="w-100"
                      src={prod.product.imageCover}
                      alt=""
                    />
                  </div>
                  <div className="col-md-9">
                    <h6>{prod.product.title}</h6>
                    <h6 className="color-red">Price :{prod.price}</h6>
                    <button
                      onClick={() => delItem(prod.product.id)}
                      className="btn"
                    >
                      <i className="fa-solid fa-trash-can tra"></i> Remove
                    </button>
                  </div>
                  <div className="col-md-2 d-flex justify-content-center align-items-center">
                    <button
                      onClick={() => dataCount(prod.product.id, prod.count + 1)}
                      className="btn btn-danger size px-2 mx-2"
                    >
                      +
                    </button>
                    <h5>{prod.count}</h5>
                    <button
                      onClick={() => CountMin(prod.product.id, prod.count)}
                      className="btn btn-danger size px-2 mx-2"
                    >
                      -
                    </button>
                  </div>
                  <hr className="my-2 p-0" />
                </div>
              ))}
              <div className="d-flex align-items-center justify-content-center">
                <button onClick={clear} className="btn btn-warmnig clear">
                  Clear Your Cart
                </button>
              </div>
              <div className="row m-3 d-flex justify-content-around">
                <div className="col-md-5 d-flex justify-content-center">
                  <Link
                    to={`/OnlinePayment/${cartprod.data._id}`}
                    className="btn btn-primary text-white w-50"
                  >
                    Online Payment
                  </Link>
                </div>
                <div className="col-md-5 d-flex justify-content-center">
                  <Link
                    to={`/CashPay/${cartprod.data._id}`}
                    className="btn btn-primary text-white w-50"
                  >
                    Cash Payment
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="container d-flex justify-content-center">
              {" "}
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
  );
}
