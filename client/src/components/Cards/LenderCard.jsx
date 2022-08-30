import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Paper, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router';

const LenderCard = ({ details }) => {
    const navigate = useNavigate();

    return (
        <>
            <Card component={Paper} elevation={4} sx={{ px: 1, pb: 1 }}>
                <CardHeader
                avatar={
                    <Avatar 
                        src={details?.image}
                        sx={{ width: 56, height: 56 }}
                     />
                }
                title={<Typography>{details?.name}</Typography>}
            />

                <CardContent>
                    <Typography>{details?.bio}</Typography>
                    <Typography sx={{ mt: 3 }} fontWeight={'bold'}>
                        Interset Rate : {details?.interestRate}%
                    </Typography>
                    <Typography fontWeight={'bold'}>
                        Max Principal : {details?.maxPrincipal} ETH
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button 
                        variant='contained'
                        onClick={() => navigate(`/borrower/lenders/${details?.wallet}`)}
                    >Details
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

export default LenderCard