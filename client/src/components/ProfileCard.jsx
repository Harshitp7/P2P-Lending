import { Alert, Avatar, Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Form, Card } from 'react-bootstrap';
import { useEth } from '../contexts';
import EditIcon from '@mui/icons-material/Edit';

const ProfileCard = ({ children, setImgDetails, walletAddress, image, spamVotes = 0 }) => {
    const { state: { accounts, web3 } } = useEth();
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [previewImg, setPreviewImg] = useState('');
    const ref = useRef(null)

    useEffect(() => {
        const getData = async () => {
            try {
                const balance = await web3.eth.getBalance(walletAddress);
                const balanceInEth = web3.utils.fromWei(balance, 'ether');
                setBalance(balanceInEth);
                setLoading(false);
            } catch (error) {
                alert(error.message);
            }
        }
        getData();
    }, [web3, walletAddress])
    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImgDetails(file)
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            setPreviewImg(fileReader.result)
        }
        fileReader.onerror = (err) => {
            console.log(err)
        }
    }

    return (
        <Card body={true} className="shadow " style={{ borderRadius: '10px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                    <input ref={ref} type="file" accept='image/*' style={{ display: 'none' }} onChange={handleImageChange} />
                    <Avatar
                        sx={{ width: 300, height: 300}}
                        src={previewImg || image}
                    />
                    {walletAddress === accounts[0] && (
                        <Button
                            sx={{ mt: 2 }}
                            variant="outlined"
                            onClick={() => ref.current.click()}
                        >
                            Change Image&nbsp;
                            <EditIcon />
                        </Button>
                    )}
                </Grid>
                <Grid item xs={12} md={8}>
                    {
                        spamVotes > 0 && (
                            <Alert severity="error" style={{ borderRadius: '10px' }}>
                                {spamVotes}{" "}
                                people marked as fraud
                            </Alert>
                        )
                    }
                    <Form.Group  className='mb-3'>
                        <Form.Label className='text-muted mb-0' >Wallet Address</Form.Label>
                        <Form.Control className='fs-6' size='lg' type="name" readOnly value={walletAddress} />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label className='text-muted mb-0' >Wallet Balance (ETH)</Form.Label>
                        <Form.Control className='fs-6' size='lg' type="name" readOnly value={balance} />
                    </Form.Group>
                    {children}
                </Grid>
            </Grid>
        </Card>
    )
}

export default ProfileCard