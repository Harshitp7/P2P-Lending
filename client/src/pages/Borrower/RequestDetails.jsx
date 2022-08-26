import { Box, Button, Chip, Divider } from '@mui/material'
import React, { useState } from 'react'
import RequestCommonDetails from '../../components/Cards/RequestCommonDetails'
import Layout from '../../components/Layout'
import Pair from '../../components/Pair'
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useEth } from '../../contexts'


const RequestDetails = () => {

  const {requestId} = useParams();
  const navigate = useNavigate();

  // if(!requestId){
  //     navigate('/lender');
  // }

  const [reqDetails, setReqDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const {state : {contracts, accounts}} = useEth();

  // useEffect(() => {
  //   // fetch request details
  //   // fetch payment details

  //   (async () => {
  //     try {
  //         const details = await contracts['P2pLending'].methods.requests(requestId).call();
  //         setReqDetails(details);
  //     } catch (error) {
          
  //     }
  // })()
  // }, [])

  return (
    <Layout>
        <RequestCommonDetails details={reqDetails}>
            <Divider>
              <Chip label="Payment Details"/>
            </Divider>

            <Pair
              left="Amount calculated with interest"
              right="1 ETH"
            />
            <Pair
              left="Delay cost"
              right="0.1 ETH"
              border={false}
            />
             <Divider>
              <Chip label="Total"/>
            </Divider>
            <Pair
              left="Total amount to be paid"
              right="1.1 ETH"
            />
            <Box sx={{mt : 3, display : 'grid', placeItems : 'center'}}>
            <Button 
                variant="contained" 
                color="primary"
                endIcon={<AddTaskIcon />}
             >
              Payback
            </Button>
            </Box>
        </RequestCommonDetails>
    </Layout>
  )
}

export default RequestDetails