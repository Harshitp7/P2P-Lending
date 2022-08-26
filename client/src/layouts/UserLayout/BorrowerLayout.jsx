import React from 'react'
import { Routes, Route, Navigate } from "react-router"
import CreateRequest from '../../pages/Borrower/CreateRequest'
import Home from '../../pages/Borrower/Home'
import Lenders from '../../pages/Borrower/Lenders'
import Profile from '../../pages/Borrower/Profile'
import RequestDetails from '../../pages/Borrower/RequestDetails'
import LenderProfile from '../../pages/Lender/Profile'
import NavbarCommon from '../../components/NavbarCommon'

const BorrowerLayout = () => {
  return (
    <>
    <NavbarCommon role="BorrowerLayout"/>
    <Routes>
      <Route path="/borrower" element={<Home />} />
      <Route path="/borrower/profile/:borrowerAddress" element={<Profile />} />
      <Route path="/borrower/lenders" element={<Lenders />} />
      <Route path="/borrower/request-details/:requestId" element={<RequestDetails />} />
      <Route path="/borrower/lenders/:lenderAddress" element={<LenderProfile />} />
      <Route path="/borrower/lenders/create-request" element={<CreateRequest />} />
      <Route path='*' element={<Navigate to='/borrower' />} />
    </Routes>
    </>
  )
}

export default BorrowerLayout;