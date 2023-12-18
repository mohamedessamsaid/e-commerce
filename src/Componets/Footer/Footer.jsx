import React from 'react'
// import style from './Footer.module.css'
export default function Footer() {
  return  <>
  <div className="bg-light py-5">
  <div className='container ' >
    <h2>Get the FreshCart app</h2>
    <p>we will send you a link , open it on your phone to download the app</p>
    <div className='row d-flex align-items-center'>
        <div className="col-md-9">
    <input className='w-100' type="email" placeholder='Email'/>
  </div>
  <div className="col-md-3">
    <button className='btn btn-danger w-100'>Share App Link</button>
  </div>

    </div>
    <hr />


  </div>
  </div>
  </>
}

