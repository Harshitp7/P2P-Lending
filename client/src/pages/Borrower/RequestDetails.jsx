import { Box, Button, Chip, Divider } from '@mui/material'
import React, { useState } from 'react'
import RequestCommonDetails from '../../components/Cards/RequestCommonDetails'
import Layout from '../../components/Layout'
import Pair from '../../components/Pair'
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useEth } from '../../contexts'
import Loading from '../../components/Loading'


const RequestDetails = () => {

  const { requestId } = useParams();
  const navigate = useNavigate();

  if (!requestId) {
    navigate('/borrower');
  }

  const [reqDetails, setReqDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const { state: { contracts, accounts } } = useEth();
  const [loading, setLoading] = useState(true);
  console.log({paymentDetails})

  useEffect(() => {
    // fetch request details
    // fetch payment details
    (async () => {
      try {
        const details = await contracts['P2pLending'].methods.requests(requestId).call();
        const paymentInfo = await contracts['P2pLending'].methods.calculatePaybackCost(requestId).call();
        setPaymentDetails(paymentInfo);
        setReqDetails(details);
        setLoading(false);
      } catch (error) {
        alert(error.message || "Something went wrong");
        setLoading(false);
      }
    })()
  }, [])


  const payBack = async () => {
    // try {
    //   await contracts['P2pLending'].methods.payback(requestId).send({ 
    //     from: accounts[0], 
    //     value : paymentDetails.totalAmount 
    //   });
    //   alert("Payment sent successfully");
    // } catch (error) {
    //   alert(error.message || "Something went wrong");
    // }
  }

  return (
    <Layout>
      {loading ? <Loading /> : (
        <RequestCommonDetails details={reqDetails}>
          {/* ACCEPTED */}
          {reqDetails?.status === "1" && (
            <>
              <Divider>
                <Chip label="Payment Details" />
              </Divider>

              <Pair
                left="Amount calculated with interest"
                right={`${paymentDetails?.originalAmount} ETH`}
              />
              <Pair
                left="Delay cost"
                right={`${paymentDetails?.totalAmount - paymentDetails?.originalAmount} ETH`}
                border={false}
              />
              <Divider>
                <Chip label="Total" />
              </Divider>
              <Pair
                left="Total amount to be paid"
                right={`${paymentDetails?.totalAmount} ETH`}
              />
              <Box sx={{ mt: 3, display: 'grid', placeItems: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<AddTaskIcon />}
                  onClick={payBack}
                >
                  Payback
                </Button>
              </Box>
            </>
          )}
        </RequestCommonDetails>
      )}
    </Layout>
  )
}

export default RequestDetails