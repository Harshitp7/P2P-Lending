import React from 'react'
import {Routes, Route, Navigate} from "react-router"
import Home from '../../pages/Auth/Home'
import SignIn from '../../pages/Auth/SignIn'
import SignUp from '../../pages/Auth/SignUp'

const AuthLayout = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default AuthLayout