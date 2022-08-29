import React from 'react'
import {Routes, Route, Navigate} from "react-router"
import Home from '../../pages/Lender/Home'
import Profile from '../../pages/Lender/Profile'
import RequestDetails from '../../pages/Lender/RequestDetails'
import HomeMain from '../../pages/Auth/Home'
const LenderLayout = () => {
  return (
    <>
   <Routes>
        <Route path="/" element={<HomeMain />} />
        <Route path="/lender" element={<Home />} />
        <Route path="/lender/profile/:lenderAddress" element={<Profile />} />
        <Route path="/lender/request-details/:requestId" element={<RequestDetails />} />
        <Route path='*' element={<Navigate to='/lender' />} />
    </Routes>
    </>
  )
}

export default LenderLayout