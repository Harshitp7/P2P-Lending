import React from 'react'
import { Routes, Route, Navigate } from "react-router"
import Home from '../../pages/Lender/Home'
import Profile from '../../pages/Lender/Profile'
import BorrowerProfile from '../../pages/Borrower/Profile'
import HomeMain from '../../pages/Auth/Home'
import RequestDetails from '../../pages/Lender/RequestDetails'

const LenderLayout = () => {
  return (
    <div className='w-100 h-100 d-flex flex-column'>
      <div style={{ position: 'sticky', left: 0, top: 0, zIndex: 5 }}>
        <NavbarCommon role="LenderLayout" />
      </div>
      <Routes>
        <Route path="/lender" element={<Home />} />
        <Route path="/lender/profile/:lenderAddress" element={<Profile />} />
        <Route path="/lender/borrower-profile/:borrowerAddress" element={<BorrowerProfile />} />
        <Route path="/lender/request-details/:requestId" element={<RequestDetails />} />
        <Route path='*' element={<Navigate to='/lender' />} />
    </Routes>
    </>
  )
}

export default LenderLayout