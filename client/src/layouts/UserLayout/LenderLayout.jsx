import React from 'react'
import {Routes, Route, Navigate} from "react-router"
import Home from '../../pages/Lender/Home'
import Profile from '../../pages/Lender/Profile'

const LenderLayout = () => {
  return (
    <Routes>
        <Route path="/lender" element={<Home />} />
        <Route path="/lender/profile/:lenderAddress" element={<Profile />} />
        <Route path='*' element={<Navigate to='/lender' />} />
    </Routes>
  )
}

export default LenderLayout