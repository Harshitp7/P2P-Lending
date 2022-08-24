import React from 'react'
import {Routes, Route, Navigate} from "react-router"
import Home from '../../pages/Auth/Home'
import SignIn from '../../pages/Auth/SignIn'
import SignUpBorrower from '../../pages/Auth/SignUpBorrower'
import SignUpLender from '../../pages/Auth/SignUpLender'

const AuthLayout = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/SignUpBorrower" element={<SignUpBorrower />} />
        <Route path="/SignUpLender" element={<SignUpLender />} />
        <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default AuthLayout