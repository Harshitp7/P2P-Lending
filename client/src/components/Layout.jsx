import { Container } from '@mui/material'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <Container maxWidth='xl' sx={({ palette: { custom } }) => ({
      backgroundColor: custom.background.main,
      flexGrow: 1,
      py: 5,
    })}>
      <Container sx={{width : '100%', height : '100%'}}>
        {children}
      </Container>
    </Container>
  )
}

export default Layout