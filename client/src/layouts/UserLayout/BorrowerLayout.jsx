import React from 'react'
import {Routes, Route, Navigate} from "react-router"
import Home from '../../pages/Borrower/Home'
import Profile from '../../pages/Borrower/Profile'

const BorrowerLayout = () => {
  return (
    <Routes>
        <Route path="/borrower" element={<Home />} />
        <Route path="/borrower/profile/:borrowerAddress" element={<Profile />} />
        <Route path='*' element={<Navigate to='/borrower' />} />
    </Routes>
  )
}

export default BorrowerLayout