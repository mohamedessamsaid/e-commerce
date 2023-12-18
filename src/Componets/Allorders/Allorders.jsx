import React from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useQuery } from 'react-query';
import { ThreeDots } from 'react-loader-spinner';

export default function Allorders() {
  let token = localStorage.getItem('token')
  let decode = jwtDecode(token)
  
  console.log(decode.id);

 async function getMyOrders(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
      .then((res) => res).catch((err) => err)
  }
  let { data, error, isLoading } = useQuery('orderQuery', () => getMyOrders(decode.id))
  console.log(data);
  console.log('error', error, isLoading);
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
      <div className="row bg-light spac">
        {data?.data.map((ord, ind) =>
          <div className="row">
            <div key={ind} className="col-md-8">
              <h3>Order Number: {ord.id}  </h3>
              <h5>Order time at : {ord.createdAt}  </h5>
              <h5>Payment Method: {ord.paymentMethodType}</h5>
            </div>
            <div className="col-md-4 half">
              <h4>order Price : {ord.totalOrderPrice}</h4>
            </div>
            <hr className="my-4 p-0" />
          </div>
        )}
      </div>
    }
  </>
}
