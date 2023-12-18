import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

export default function ForgorPassword() {
  if(document.getElementById('email').value !=null){
      let email=document.getElementById('email').value
      localStorage.setItem('email',email);
  }

  
  let navigate = useNavigate()
  let validationSchema = Yup.object({
    email: Yup.string().email("email is notvalid").required("email is requried")
  })
  async function sendMail(value) {
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, value)
    console.log(data);
    
    if (data.statusMsg === 'success') {
      navigate('/VerifyPassword')
    }

  }
  let formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: (value) => sendMail(value)
    , validationSchema
  })
  return <>
    <div className="row spac">
      <div>
        <form onSubmit={formik.handleSubmit} className='my-2'>
          <label className='my-3' htmlFor="email">email:</label>
          <input onChange={formik.handleChange} value={formik.values.email} className='form-control' type="email" name='email' id='email' />
          {formik.errors.email ? (
            <div className="alert alert-danger mt-2 p-3">
              {formik.errors.email}
            </div>) : ("")}
          <div className="half">
            <button disabled={!formik.isValid && formik.dirty} type='submet' className='btn btn-secondary my-3 w-25'>Submet</button>
          </div>
        </form>
      </div>
    </div>

  </>
}
