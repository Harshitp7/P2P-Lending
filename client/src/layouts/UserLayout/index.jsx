import React from 'react'
import BorrowerLayout from './BorrowerLayout'
import LenderLayout from './LenderLayout'

const UserLayout = ({userType}) => {
  return (
    <>
        {userType === 'Lender' ? 
        <LenderLayout /> : 
        <BorrowerLayout />}
    </>
  )
}

export default UserLayout