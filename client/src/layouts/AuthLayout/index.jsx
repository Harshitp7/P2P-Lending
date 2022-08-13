import React from 'react'
import {Routes, Route} from "react-router"
import Home from '../../pages/Auth/Home'
import SignIn from '../../pages/Auth/SignIn'
import SignUp from '../../pages/Auth/SignUp'

const AuthLayout = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default AuthLayout