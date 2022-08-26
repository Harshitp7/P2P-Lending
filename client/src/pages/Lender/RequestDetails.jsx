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

const RequestDetails = () => {
    const { requestId } = useParams();
    const navigate = useNavigate();

    // if(!requestId){
    //     navigate('/lender');
    // }

    const [reqDetails, setReqDetails] = useState({});
    const { state: { contracts, accounts } } = useEth();

    // useEffect(() => {
    //     // fetch request details
    //     (async () => {
    //         try {
    //             const details = await contracts.P2pLending.methods.requests(requestId).call();
    //             setReqDetails(details);

    //         } catch (error) {
    //             alert(error.message || "Something went wrong");
    //         }
    //     })()
    // }, [])


    const acceptRequest = async () => {
        // try {
        //     await contracts.P2pLending.methods.acceptRequest(requestId).send({ from: accounts[0] });
        //     alert("Request accepted");
        // } catch (error) {
        //     alert(error.message || "Something went wrong");
        // }
    }

    const rejectRequest = async () => {
        // try {
        //     await contracts.P2pLending.methods.rejectRequest(requestId).send({ from: accounts[0] });
        //     alert("Request rejected");
        // } catch (error) {
        //     alert(error.message || "Something went wrong");
        // }
    }


    const markAsDelayed = async () => {
        // try {
        //     await contracts.P2pLending.methods.markAsDelayed(requestId).send({ from: accounts[0] });
        //     alert("Request marked as delayed");
        // } catch (error) {
        //     alert(error.message || "Something went wrong");
        // }
    }

    const markAsFraud = async () => {
        // try {
        //     await contracts.P2pLending.methods.markAsFraud(reqDetails?.from).send({ from: accounts[0] });
        //     alert("Request marked as fraud");
        // } catch (error) {
        //     alert(error.message || "Something went wrong");
        // }
    }
    
    return (
        <Layout>
            <RequestCommonDetails details={reqDetails}>
                <Divider>
                    <Chip label="Take an action" />
                </Divider>
                
                {reqDetails?.status === "PENDING" && (
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

                {reqDetails?.status === "ACCEPTED" && (
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

                {reqDetails?.status === "DELAYED" && (
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
        </Layout>
    )
}

export default RequestDetails