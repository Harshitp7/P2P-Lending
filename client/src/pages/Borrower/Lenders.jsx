import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import LenderCard from '../../components/Cards/LenderCard'
import Layout from '../../components/Layout'
import { useEth } from '../../contexts'
import NavbarCommon from '../../components/NavbarCommon'
const Lenders = () => {

    const [lenders, setLenders] = useState([]);
    const { state: { contracts, accounts } } = useEth();

    useEffect(() => {
        (async () => {
            try {
                const allLenders = await contracts.P2pLending.methods.getLenders().call();
                // const updateObj = Object.assign({}, update);
                const arrObjs = allLenders.map((lender) => Object.assign({}, lender));
                console.log({ allLenders, arrObjs });

                setLenders(arrObjs);
            } catch (error) {
                alert(error.message || "Something went wrong");
            }
        })();
    }, [])

    return (
        <>
        <NavbarCommon role="BorrowerLayout"/>
        <Layout>
            <Typography align='center' sx={{ mb: 4 }}>Lenders</Typography>
            <Grid container spacing={3}>
                {lenders.map((lender, i) => (
                    <Grid item md={6} lg={4} key={i}>
                        <LenderCard details={lender} />
                    </Grid>
                ))}
            </Grid>
        </Layout>
        </>
    )
}

export default Lenders