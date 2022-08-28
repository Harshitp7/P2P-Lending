import { Button, Chip, Divider } from '@mui/material'
import React, { useState } from 'react'
import RequestCommonDetails from '../../components/Cards/RequestCommonDetails'
import Layout from '../../components/Layout'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import { useEffect } from 'react';
import { useEth } from '../../contexts';
import { useNavigate, useParams } from 'react-router';
import Loading from '../../components/Loading';

const RequestDetails = () => {
    const { requestId } = useParams();
    const navigate = useNavigate();

    if(!requestId){
        navigate('/lender');
    }

    const [reqDetails, setReqDetails] = useState({});
    const { state: { contracts, accounts, web3 } } = useEth();
    const [reload, setReload] = useState(false);
    const [loading, setLoading] = useState(true);
    const [backdropLoading, setBackdropLoading] = useState(false);
    const [isPaymentDelayed, setIsPaymentDelayed] = useState(false);


    useEffect(() => {
        // fetch request details
        (async () => {
            try {
                const details = await contracts.P2pLending.methods.requests(requestId).call();
                if(details){
                    setReqDetails(details);
                    const delayRes = await contracts.P2pLending.methods.isRequestDelayed(requestId).call();
                    console.log({delayRes});
                    setIsPaymentDelayed(delayRes);
                    setLoading(false);
                }else{
                    throw new Error('Request not found')
                }

            } catch (error) {
                setLoading(false);
                alert(error.message || "Something went wrong");
            }
        })()
    }, [reload])


    const acceptRequest = async () => {
        try {
            setBackdropLoading(true);
            const res = await contracts.P2pLending.methods.acceptRequest(requestId).send({ 
                from: accounts[0], 
                value: web3.utils.toWei(reqDetails.amount, 'ether'),
            });
            if(res?.status){
                setBackdropLoading(false);
                alert('Request accepted successfully')
                setReload(prev => !prev);
            }else{
                throw new Error('Request acceptance failed')
            }
        } catch (error) {
            setBackdropLoading(false);
            alert(error.message || "Something went wrong");
        }
    }

    const rejectRequest = async () => {
        try {
            setBackdropLoading(true);
            const res = await contracts.P2pLending.methods.rejectRequest(requestId).send({ from: accounts[0] });
            if (res.status) {
                setBackdropLoading(false);
                alert("Request rejected successfully");
                setReload(prev => !prev);
            } else {
                throw new Error('Request rejection failed')
            }
        } catch (error) {
            setBackdropLoading(false);
            alert(error.message || "Something went wrong");
        }
    }


    const markAsDelayed = async () => {
        try {
            setBackdropLoading(true);
            const res = await contracts.P2pLending.methods.markAsDelayed(requestId).send({ from: accounts[0] });
            if (res.status) {
                setBackdropLoading(false);
                alert("Request marked as delayed successfully");
                setReload(prev => !prev);
            } else {
                throw new Error('Request marking as delayed failed')
            }
        } catch (error) {
            setBackdropLoading(false);
            alert(error.message || "Something went wrong");
        }
    }

    const markAsFraud = async () => {
        try {
            setBackdropLoading(true);
            const res = await contracts.P2pLending.methods.markAsFraud(reqDetails?.from, requestId).send({ from: accounts[0] });
            if (res.status) {
                setBackdropLoading(false);
                alert("Profile marked as fraud successfully");
                setReload(prev => !prev);
            } else {
                throw new Error('Profile marking as fraud failed')
            }
        } catch (error) {
            setBackdropLoading(false);
            alert(error.message || "Something went wrong");
        }
    }

    return (
        <Layout>
            {loading ? <Loading /> : (
                <RequestCommonDetails details={reqDetails}>
                    {backdropLoading && <Loading backdrop />}
                    <Divider>
                        <Chip label="Take an action" />
                    </Divider>
                    
                    {/* PENDING */}
                    {reqDetails?.status === "0" && (
                        <div className="d-flex justify-content-evenly align-items-center mt-5">
                            <Button
                                variant="contained"
                                size="large"
                                color="success"
                                onClick={acceptRequest}
                                endIcon={<CheckCircleIcon />}
                            >
                                Accept
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                color="error"
                                onClick={rejectRequest}
                                endIcon={<CancelIcon />}
                            >
                                Reject
                            </Button>
                        </div>
                    )}

                    {/* ACCEPTED */}
                    {(reqDetails?.status === "1" && isPaymentDelayed) && (
                        <div className="d-flex justify-content-evenly align-items-center mt-5">
                            <Button
                                variant="contained"
                                size="large"
                                color="warning"
                                onClick={markAsDelayed}
                                endIcon={<WarningIcon />}
                            >
                                Mark as Delayed
                            </Button>
                        </div>
                    )}
                    {/* DELAYED */}
                    {(reqDetails?.status === "3" && isPaymentDelayed) && (
                        <div className="d-flex justify-content-evenly align-items-center mt-5">
                            <Button
                                variant="contained"
                                size="large"
                                color="error"
                                onClick={markAsFraud}
                                endIcon={<ReportIcon />}
                            >
                                Mark as Fraud
                            </Button>
                        </div>
                    )}

                </RequestCommonDetails>
            )}
        </Layout>
    )
}

export default RequestDetails