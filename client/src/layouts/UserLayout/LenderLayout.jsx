import React from 'react'
import {Routes, Route, Navigate} from "react-router"
import Home from '../../pages/Lender/Home'

const LenderLayout = () => {
  return (
    <Routes>
        <Route path="/lender" element={<Home />} />
        <Route path='*' element={<Navigate to='/lender' />} />
    </Routes>
  )
}

export default LenderLayout