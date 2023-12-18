/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { UserContext } from '../../Context/userContext'


export default function Layout() {
  let { setUserToken } = useContext(UserContext)
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      setUserToken(localStorage.getItem('token'))
    }
  }, [])

  return <>
    <Navbar />
    <div className="container spacetop">
      <Outlet />
    </div>
    <Footer />
  </>
}
