import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { cartContext } from '../../Context/cartContext'
import { useParams } from 'react-router-dom'

export default function OnlinePayment() {
let {onlinePayment ,setcartNum}=useContext(cartContext)
let param=useParams()
console.log(param.id);
async function pay(value ,id){
let {data}= await  onlinePayment(value , id)

// console.log(data?.session.url);
if(data?.status === 'success'){
  window.location.href=data.session.url
  setcartNum(0)
}
}

let formik = useFormik({
  initialValues:{
    details:'',
    phone:'',
    city:''
  },
  onSubmit:(value)=>{pay(value , param.id)}
})
  return <>
<div className="row">
  <form onSubmit={formik.handleSubmit}>
    <div className='my-5'>
    <label htmlFor="details">details</label>
    <input onChange={formik.handleChange} value={formik.values.details} type="text" className='w-100' name='details' id='details'/>
    </div>
    <div className='my-5'>
    <label htmlFor="phone">phone</label>
    <input onChange={formik.handleChange} value={formik.values.phone} type="tel" className='w-100' name='phone' id='phone'/>
    </div>
    <div className='my-5'>
    <label htmlFor="city">city</label>
    <input onChange={formik.handleChange} value={formik.values.city} type="text" className='w-100' name='city' id='city'/>
    </div>
    <div className='my-5'>
    <button type='submet' className='btn btn-primary '> Submet </button>
    </div>
  </form>
  </div> 
   </>
}
