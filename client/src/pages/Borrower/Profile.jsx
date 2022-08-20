import { Avatar, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useEth } from '../../contexts';
import { Form, Card } from 'react-bootstrap';
import ProfileCard from '../../components/ProfileCard';

const Profile = () => {
    const { state: { accounts, user, web3 } } = useEth();

    return (
        <Layout>
            <ProfileCard spamVotes={user?.spamVotes || 10}>
                <Form.Group className='mb-3'>
                    <Form.Label className='text-muted mb-0' >Annual Income</Form.Label>
                    <Form.Control className='fs-6' size='lg' type="name"  defaultValue={user?.annualIncome} />
                </Form.Group>
            </ProfileCard>
        </Layout>
    )
}

export default Profile