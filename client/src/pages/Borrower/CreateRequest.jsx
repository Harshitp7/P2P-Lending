import { Avatar, Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import InputField from '../../components/InputField'
import Layout from '../../components/Layout'
import { useEth } from '../../contexts'
import SendIcon from '@mui/icons-material/Send';
import { useLocation, useNavigate } from 'react-router'
import {uploadFile} from '../../utils/cloudinaryUtils'
import NavbarCommon from '../../components/NavbarCommon'

const CreateRequest = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const {state} = location

    if(!state || !state?.lenderAddress || !state?.lenderImage) {
        navigate('/borrower')
    }

    const { state: { accounts, contracts, user } } = useEth();
    const [amount, setAmount] = useState('');
    const [purpose, setPurpose] = useState('');
    const [duration, setDuration] = useState('');
    const [bankStatement, setBankStatement] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const bankStatementUrl = await uploadFile(bankStatement);
            console.log({bankStatementUrl})
            const res = await contracts.P2pLending.methods.createRequest(
                accounts[0],
                state?.lenderAddress,
                Number(amount),
                Number(duration),
                purpose,
                bankStatementUrl
            ).send({ from: accounts[0] });

            if(res?.status){
                setLoading(false);
                alert('Request created successfully')
                navigate('/borrower')
            }else{
                throw new Error('Request creation failed')
            }
        } catch (error) {
            console.log({ error });
            setLoading(false);
            alert(error.message || "Something went wrong");
        }
    }

    console.log({ purpose, bankStatement, location })
    return (
        <>
        <div className='w-100 h-100 d-flex flex-column'>
            <div style={{ position: 'sticky', left: 0, top: 0, zIndex: 5 }} className="shadow">
                <NavbarCommon role = 'BorrowerLayout' />
            </div>
        <Layout>
            {loading && <Loading backdrop />}
            <Typography align='center' sx={{ mb: 4 }}>Create Request</Typography>
            <Card body={true} className="shadow px-2" style={{ borderRadius: '10px' }}>
                <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                    <Avatar
                        sx={{ width: 56, height: 56 }}
                        src={user?.image}
                    />
                    <hr style={{ width: '20%' }} />
                    <Avatar
                        sx={{ width: 56, height: 56 }}
                        src={state?.lenderImage}
                    />
                </Box>

                <form onSubmit={handleSubmit}>

                    <Row>
                        <Col lg={6}>
                            <InputField
                                label='sending request from Address'
                                value={accounts[0]}
                                readOnly
                                className='mb-3'
                            />
                        </Col>
                        <Col lg={6}>
                            <InputField
                                label='sending request to Address'
                                value={state?.lenderAddress}
                                readOnly
                                className='mb-3'
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <InputField
                                label='Request amount'
                                type='number'
                                className='mb-3'
                                value={amount}
                                required
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Col>
                        <Col lg={6}>
                            <InputField
                                label='Duration in months'
                                type='number'
                                className='mb-3'
                                value={duration}
                                required
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <InputField
                        label="Upload your recent 1 year bank statement"
                        type="file"
                        accept="application/pdf"
                        required
                        className='mb-3'
                        onChange={(e) => setBankStatement(e.target.files[0])}
                    />

                    <InputField
                        label="Purpose"
                        placeholder="Describe the purpose of loan in detail"
                        value={purpose}
                        required
                        as="textarea"
                        className='mb-3'
                        onChange={(e) => setPurpose(e.target.value)}
                    />

                    <Box sx={{ display: "grid", placeItems: 'center' }}>
                        <Button
                            type="submit"
                            sx={{ mt: 3, }}
                            variant="contained"
                            endIcon={<SendIcon />}
                        >Send Request
                        </Button>
                    </Box>

                </form>
            </Card>
        </Layout>
        </div>
        </>
    )
}

export default CreateRequest