import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Container } from 'react-bootstrap'
import LenderCard from '../../components/Cards/LenderCard'

const Home = () => {
  return (
    <Container className='py-5'>
      <Typography align='center' sx={{ mb: 4 }}>Borrower Home</Typography>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <LenderCard />
        </Grid>
        <Grid item xs={4}>
          <LenderCard />
        </Grid>
        <Grid item xs={4}>
          <LenderCard />
        </Grid>
        <Grid item xs={4}>
          <LenderCard />
        </Grid>
        <Grid item xs={4}>
          <LenderCard />
        </Grid>
        <Grid item xs={4}>
          <LenderCard />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home