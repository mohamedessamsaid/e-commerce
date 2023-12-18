import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'


export default function Register() {

  let [error, setError] = useState('');
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate()
  async function sub(values) {
    setLoading(true)
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((error) => {
      setError(error.response.data.message)
      setLoading(false)
    })


    if (data.message === 'success') {
      setLoading(false)
      navigate('/Login')
    }
    console.log(data);
  }
  let phoneregex = /^01[01235][0-9]{8}$/

  let valid = Yup.object({
    name: Yup.string().min(3, 'name minlenght is 3').max(10, 'name maxlenght is 10').required('name is requried'),
    email: Yup.string().email('email is valid').required('email is requried'),
    phone: Yup.string().matches(phoneregex, 'phone is invalid').required('phone is requried'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password is invalid').required('password is requried'),
    rePassword: Yup.string().oneOf([Yup.ref('password')]).required('rePassword is requried')
  })
  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    }
    , onSubmit: sub,
    validationSchema: valid
  })

  return <>
    <div className={style.conatiner}>

      <form className={style.conatiner} onSubmit={formik.handleSubmit}>
        <div className="form-group my-4">
          <label > Register Now :</label>
        </div>
        {error ? <div className="alert alert-danger mt-2 p-3">{error}</div> : ''}
        <div className="form-group">
          <label htmlFor='name' >Name :</label>
          <input value={formik.values.name} onChange={formik.handleChange} type="text" className="form-control" id='name' name='name' />
          {formik.errors.name && formik.touched.name ? <div className="alert alert-danger mt-2 p-3">{formik.errors.name}</div> : ''}
        </div>
        <div className="form-group">
          <label htmlFor='email'>Email :</label>
          <input value={formik.values.email} onChange={formik.handleChange} type="email" className="form-control" id='email' name='email' />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-2 p-3">{formik.errors.email}</div> : ''}
        </div>
        <div className="form-group">
          <label htmlFor='password' >Password :</label>
          <input value={formik.values.password} onChange={formik.handleChange} type="password" className="form-control" id='password' name='password' />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger mt-2 p-3">{formik.errors.password}</div> : ''}
        </div>
        <div className="form-group">
          <label htmlFor='rePassword'>rePassword :</label>
          <input value={formik.values.rePassword} onChange={formik.handleChange} type="password" className="form-control" id='rePassword' name='rePassword' />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger mt-2 p-3">{formik.errors.rePassword}</div> : ''}
        </div>
        <div className="form-group">
          <label htmlFor='phone'>Phone :</label>
          <input value={formik.values.phone} onChange={formik.handleChange} type="tel" className="form-control" id='phone' name='phone' />
          {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger mt-2 p-3">{formik.errors.phone}</div> : ''}
        </div>
        {loading ? <button className='btn m-auto' type='button'><ThreeDots
          height="50"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        /></button> : <button disabled={!formik.isValid && formik.dirty} type="submit" className="btn btn-primary mt-4">Submit</button>}


      </form>
    </div>
  </>
}
