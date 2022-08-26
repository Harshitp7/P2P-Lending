import { Avatar, Box, Button, Grid, Paper, TableContainer, Typography } from '@mui/material'
import React from 'react'
import LenderCard from '../../components/Cards/LenderCard'
import DataTable from '../../components/DataTable'
import Layout from '../../components/Layout'
import Status from '../../components/Status'
import { useEth } from '../../contexts'

const Home = () => {
  const { state } = useEth();
  console.log({
    name : state?.user?.name,
    userType : state?.user?.userType,
    address : state?.user?.wallet,
    image : state?.user?.image,
  })

  const rows = [
    {
      Lender: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <Typography
            sx={{ ml: 3 }}
          >
            Lender's Name
          </Typography>
        </Box>
      ),
      Date: (
        <Typography>
          Applied Date
        </Typography>
      ),
      Status: (
        <Status status={'PENDING'} />
      ),
      Action: (
        <Button variant='contained'>Details</Button>
      ),
    },
    {
      Lender: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <Typography
            sx={{ ml: 3 }}
          >
            Lender's Name
          </Typography>
        </Box>
      ),
      Date: (
        <Typography>
          Applied Date
        </Typography>
      ),
      Status: (
        <Status status={'REJECTED'} />
      ),
      Action: (
        <Button variant='contained'>Details</Button>
      ),
    },
    {
      Lender: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <Typography
            sx={{ ml: 3 }}
          >
            Lender's Name
          </Typography>
        </Box>
      ),
      Date: (
        <Typography>
          Applied Date
        </Typography>
      ),
      Status: (
        <Status status={'DELAYED'} />
      ),
      Action: (
        <Button variant='contained'>Details</Button>
      ),
    },
    {
      Lender: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src="https://material-ui.com/static/images/avatar/1.jpg"
          />
          <Typography
            sx={{ ml: 3 }}
          >
            Lender's Name
          </Typography>
        </Box>
      ),
      Date: (
        <Typography>
          Applied Date
        </Typography>
      ),
      Status: (
        <Status status={'ACCEPTED'} />
      ),
      Action: (
        <Button variant='contained'>Details</Button>
      ),
    },
  ]

  return (
    
    <Layout>
      <Typography align='center' sx={{ mb: 4 }}>Lenders</Typography>
      <Grid container spacing={3}>
        <Grid item md={6} lg={4}>
          <LenderCard />
        </Grid>
        <Grid item md={6} lg={4}>
          <LenderCard />
        </Grid>
        <Grid item md={6} lg={4}>
          <LenderCard />
        </Grid>
      </Grid>
      <Typography align='center' sx={{ my: 4 }}>Requests</Typography>

      <TableContainer component={Paper} elevation={3} >
        <DataTable rows={rows} />
      </TableContainer>
    </Layout>
  )
}

export default Home