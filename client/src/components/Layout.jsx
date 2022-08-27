import { Container } from '@mui/material'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <Container maxWidth='xl' sx={({ palette: { custom } }) => ({
      backgroundColor: custom.background.main,
      py: 5,
      minHeight: '100vh'
    })}>
      <Container sx={{width : '100%', height : '100%'}}>
        {children}
      </Container>
    </Container>
  )
}

export default Layout