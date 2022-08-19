import { Avatar, Grid, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useEth } from '../../contexts';
import { Form, Card } from 'react-bootstrap';

const Profile = () => {
    const { state: { accounts, user, web3 }, dispatch } = useEth();
    const [balance, setBalance] = useState('');

    useEffect(() => {
        const getBalance = async () => {
            const balance = await web3.eth.getBalance(accounts[0]);
            console.log({ balance, type: typeof balance });
            const balanceInEth = web3.utils.fromWei(balance, 'ether');
            console.log({ balanceInEth });
            setBalance(balanceInEth);
        }
        getBalance();
    }, [])

    return (
        <Layout>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Avatar
                        sx={{ width: 300, height: 300, display: 'block', mr: 'auto', my: 'auto' }}
                        src={"https://material-ui.com/static/images/avatar/1.jpg"}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }} elevation={4}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control size='md' type="name" readOnly value={user?.name} />
                        </Form.Group>
                        <Form.Group className='mt-2'>
                            <Form.Label>Wallet Address</Form.Label>
                            <Form.Control size='md' type="name" readOnly value={accounts[0]} />
                        </Form.Group>
                        <Form.Group className='mt-2'>
                            <Form.Label>Wallet Balance (ether)</Form.Label>
                            <Form.Control size='md' type="name" readOnly value={balance} />
                        </Form.Group>

                        <Form.Group className='mt-2'>
                            <Form.Label>Annual Income</Form.Label>
                            <Form.Control size='md' type="name" readOnly value={user?.annualIncome} />
                        </Form.Group>
                    </Paper>

                </Grid>
            </Grid>
     
        </Layout>
    )
}

export default Profile