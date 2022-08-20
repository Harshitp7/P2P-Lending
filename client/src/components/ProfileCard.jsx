import { Alert, Avatar, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Form, Card } from 'react-bootstrap';
import { useEth } from '../contexts';

const ProfileCard = ({ children, spamVotes = 0 }) => {
    const { state: { accounts, user, web3 } } = useEth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBalance = async () => {
            const balance = await web3.eth.getBalance(accounts[0]);
            const balanceInEth = web3.utils.fromWei(balance, 'ether');
            console.log({ balanceInEth });
            setData([
                {
                    label: 'Name',
                    value: user?.name
                },
                {
                    label: 'Wallet Address',
                    value: accounts[0]
                },
                {
                    label: 'Wallet Balance (ETH)',
                    value: balanceInEth
                },
            ])
            setLoading(false);
        }
        getBalance();
    }, [])

    return (
        <>
            {loading ? <div>Loading...</div> : (
                <Card body={true} className="shadow " style={{ borderRadius: '10px' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            <Avatar
                                sx={{ width: 300, height: 300 }}
                                src={"https://material-ui.com/static/images/avatar/1.jpg"}
                            />
                        </Grid>
                        <Grid item xs={12} md={8}>
                            {
                                spamVotes > 0  && (
                                    <Alert severity="error">
                                            {spamVotes}{" "}
                                            people marked as fraud
                                    </Alert>
                                )
                            }

                            {
                                data.map((item, i) => (
                                    <Form.Group key={i} className='mb-3'>
                                        <Form.Label className='text-muted mb-0' >{item.label}</Form.Label>
                                        <Form.Control className='fs-6' size='lg' type="name" readOnly value={item.value} />
                                    </Form.Group>
                                ))
                            }
                            {children}
                        </Grid>
                    </Grid>
                    {/* <TextField
                        // label={item.label}
                        // label=""
                        hiddenLabel
                        value={item.value}
                        sx={({ palette }) => ({ backgroundColor: palette.custom.disabled.main })}
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                     /> */}
                </Card>
            )}
        </>
    )
}

export default ProfileCard