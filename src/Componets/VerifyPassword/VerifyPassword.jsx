import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function VerifyPassword() {
  let navigate = useNavigate()

  async function sendMail(value) {
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, value)
    console.log(data);
    if (data.status === 'Success') {
      navigate('/ResetPassword')
    }

  }
  let validationSchema = Yup.object({
    resetCode: Yup.string().matches(/^[0-9]{6}$/, "Code is invalid").required("Code is requried")
  })
  let formik = useFormik({
    initialValues: {
      resetCode: ''
    },
    onSubmit: (value) => sendMail(value)
    , validationSchema
  })
  return <>
    <div className="row">
      <div>
        <form onSubmit={formik.handleSubmit} className='my-2'>
          <label className='my-3' htmlFor="email">code:</label>
          <input onChange={formik.handleChange} value={formik.values.resetCode} className='form-control' type="tel" name='resetCode' id='resetCode' />
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