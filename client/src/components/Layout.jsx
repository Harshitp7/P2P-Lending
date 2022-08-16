import { Container } from '@mui/material'
import React from 'react'

const Layout = ({children}) => {
  return (
    <Container  maxWidth='xl' sx={({palette : {custom}}) => ({
        backgroundColor : custom.background.main,
        py : 3
        })}>
        <Container>
            {children}
        </Container>
    </Container>
  )
}

export default Layout