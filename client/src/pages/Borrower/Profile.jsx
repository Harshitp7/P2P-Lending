import { Avatar, Grid, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useEth } from '../../contexts';
import { Form, } from 'react-bootstrap';
import ProfileCard from '../../components/ProfileCard';
import { useParams } from 'react-router';
import uploadFile from '../../utils/uploadFile';

const Profile = () => {
    const { state: { accounts, user, web3, contracts } } = useEth();
    const [readOnlyData, setReadOnlyData] = useState([]);
    const [restData, setRestData] = useState({});
    const [loading, setLoading] = useState(true);
    const {borrowerAddress} = useParams()

    const [annualIncome, setAnnualIncome] = useState('');
    const [imgDetails, setImgDetails] = useState();

    console.log({annualIncome})
    useEffect(() => {
        const getData = async () => {
            try {
                let borrowerData;
                if(borrowerAddress !== accounts[0]){
                     borrowerData = await contracts.P2pLending.methods.borrowers(borrowerAddress).call();
                }
                console.log({borrowerData})
                const balance = await web3.eth.getBalance(borrowerData?.wallet || accounts[0]);
                const balanceInEth = web3.utils.fromWei(balance, 'ether');
                console.log({ balanceInEth });
                setReadOnlyData([
                    {
                        label: 'Name',
                        value: borrowerData?.name || user?.name
                    },
                    {
                        label: 'Wallet Address',
                        value: borrowerData?.wallet || accounts[0]
                    },
                    {
                        label: 'Wallet Balance (ETH)',
                        value: balanceInEth
                    },
                ])
                setRestData(borrowerData || user);
                setLoading(false);
            } catch (error) {
                alert(error.message);
            }
        }
        getData();
    }, [])

    const updateProfile = async () => {
        try {
            console.log({imgDetails})
            if(!imgDetails){
                return;
            }
            const url = await uploadFile(imgDetails);
            console.log({url})
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <Layout>
            {loading ? <div>Loading...</div> : (
                <ProfileCard spamVotes={restData?.spamVotes || 10} setImgDetails={setImgDetails}>
                    {
                        readOnlyData.map((item, i) => (
                            <Form.Group key={i} className='mb-3'>
                                <Form.Label className='text-muted mb-0' >{item.label}</Form.Label>
                                <Form.Control className='fs-6' size='lg' type="name" readOnly value={item.value} />
                            </Form.Group>
                        ))
                    }
                    <Form.Group className='mb-3'>
                        <Form.Label className='text-muted mb-0' >Annual Income</Form.Label>
                        <Form.Control 
                            className='fs-6' 
                            size='lg' 
                            type="number" 
                            onChange={(e) => setAnnualIncome(e.target.value)}
                            value={annualIncome || restData?.annualIncome}
                        />
                    </Form.Group>
                    <Button variant='contained' onClick={updateProfile}>Update Profile</Button>
                </ProfileCard>
            )}
        </Layout>
    )
}

export default Profile