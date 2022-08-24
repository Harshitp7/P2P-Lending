import { Grid, Typography } from '@mui/material'
import React from 'react'
import LenderCard from '../../components/Cards/LenderCard'
import Layout from '../../components/Layout'

const Lenders = () => {
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
        </Layout>
    )
}

export default Lenders