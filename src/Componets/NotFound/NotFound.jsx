import React from 'react'
import style from './NotFound.module.css'
import error from '../../Assets/images/error.svg'
export default function NotFound() {
  return <>
  <div className='d-flex w-10'>
  <img className={style.NotFound} src={error} alt="img" />
  </div>
  </>
}
