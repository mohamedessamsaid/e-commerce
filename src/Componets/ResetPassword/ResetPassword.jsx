import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ResetPassword() {
  let navigate = useNavigate()

  async function sendMail(value) {
    let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, value)
    console.log(data.token);
    localStorage.setItem('token', data.token)
    localStorage.removeItem('email')
    navigate('/home')

  }
  let emails = localStorage.getItem('email')
  let validationSchema = Yup.object({
    newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "password is invalid")
      .required("password is requried")
  })
  let formik = useFormik({
    initialValues: {
      email: `${emails}`,
      newPassword: ''
    },
    onSubmit: (value) => sendMail(value)
    , validationSchema
  })
  return <>
    <div className="row">
      <div>
        <form onSubmit={formik.handleSubmit} className='my-2'>
          <label className='my-3' htmlFor="email">email:</label>
          <div className="alert alert-danger mt-2 p-3">
            {emails}
          </div>
          <label className='my-3' htmlFor="newPassword">newPassword:</label>
          <input onChange={formik.handleChange} value={formik.values.resetCode} className='form-control' type="password" name='newPassword' id='newPassword' />
          {formik.errors.resetCode ? (
            <div className="alert alert-danger mt-2 p-3">
              {formik.errors.resetCode}
            </div>) : ("")}
          <div className='half'>
            <button disabled={!formik.isValid && formik.dirty} type='submet' className='btn btn-primary my-3 w-25'>Submet</button>
          </div>
        </form>
      </div>
    </div>
  </>
}
