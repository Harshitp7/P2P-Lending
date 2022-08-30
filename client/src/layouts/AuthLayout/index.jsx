import React from 'react'
import { Routes, Route, Navigate } from "react-router"
import Home from '../../pages/Auth/Home'
import SignIn from '../../pages/Auth/SignIn'
import SignUpBorrower from '../../pages/Auth/SignUpBorrower'
import SignUpLender from '../../pages/Auth/SignUpLender'
import NavbarCommon from '../../components/NavbarCommon'

const AuthLayout = () => {
  return (
    <div className='w-100 h-100 d-flex flex-column'>
      <div style={{ position: 'sticky', left: 0, top: 0, zIndex: 5 }}>
        <NavbarCommon />
      </div>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/SignUpBorrower" element={<SignUpBorrower />} />
        <Route path="/SignUpLender" element={<SignUpLender />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  )
}

export default AuthLayout