import { Box, Button, Paper, TableContainer, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useEth } from '../contexts';
import Status from './Status';

const RequestTable = ({ role }) => {
    const { state: { contracts, accounts, user } } = useEth();
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        // fetch lenders requests
        (async () => {
            try {
                let reqDetails;

                if (user?.userType === 'Borrower') {
                    reqDetails = await contracts['P2pLending'].methods.getBorrowerRequests().call({ from: accounts[0] });
                } else {
                    reqDetails = await contracts['P2pLending'].methods.getLenderRequests().call({ from: accounts[0] });
                }
                console.log(reqDetails);
                const arrObjs = reqDetails.map((req) => Object.assign({}, req));

                const allReqs = arrObjs.map(async (request) => {
                    let person;
                    if (user?.userType === 'Borrower') {
                        person = await contracts['P2pLending'].methods.getLender(request.to).call();
                    } else {
                        person = await contracts['P2pLending'].methods.borrowers(request.from).call();
                    }

                    return {
                        ...request,
                        personImg: person.image,
                        personName: person.name,
                    }
                })
                setRequests(allReqs);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    const rows = [0, 1].map((request) => {
        return {
            Lender: (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        src={request?.personImg || "https://material-ui.com/static/images/avatar/1.jpg"}
                    />
                    <Typography
                        sx={{ ml: 3 }}
                    >
                        {request?.personName || 'Borrower Name'}
                    </Typography>
                </Box>
            ),
            Date: (
                <Typography>
                    {/* {new Date(unixToUTCTimestamp(request?.date)).toDateString()} */}
                    {new Date().toDateString()}
                </Typography>
            ),
            Status: (
                <Status status={request?.status || "PENDING"} />
            ),
            Action: (
                <Button
                    variant='contained'
                    onClick={() => navigate(`/lender/request-details/${request?.id}`)}
                >Details
                </Button>
            ),
        }
    })

    return (
        <>
            <TableContainer component={Paper} elevation={3} >
                <DataTable rows={rows} />
            </TableContainer>
        </>
    )
}

export default RequestTable