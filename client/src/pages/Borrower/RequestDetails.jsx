import { Box, Button, Chip, Divider } from '@mui/material'
import React, { useState } from 'react'
import RequestCommonDetails from '../../components/Cards/RequestCommonDetails'
import Layout from '../../components/Layout'
import Pair from '../../components/Pair'
import AddTaskIcon from '@mui/icons-material/AddTask';
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { actions, useEth } from '../../contexts'
import Loading from '../../components/Loading'


const RequestDetails = () => {

  const { requestId } = useParams();
  const navigate = useNavigate();

  if (!requestId) {
    navigate('/borrower');
  }

  const [reqDetails, setReqDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const { state: { contracts, accounts, web3 }, dispatch } = useEth();
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [backdropLoading, setBackdropLoading] = useState(false);

  console.log({ paymentDetails })

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
  }, [contracts, requestId, reload])


  const payBack = async () => {
    try {
      setBackdropLoading(true);
      const res = await contracts['P2pLending'].methods.payBack(requestId).send({
        from: accounts[0],
        value: paymentDetails.totalAmount
      });
      if (res?.status) {
        setReload(prev => !prev);
        const update = await contracts['P2pLending'].methods.borrowers(accounts[0]).call()
        const updateObj = Object.assign({}, update);
        console.log({ updateObj, update })
        dispatch({
          type: actions.setUser,
          data: JSON.parse(JSON.stringify(updateObj))
        });
        setBackdropLoading(false);
        alert("Payment sent successfully");
      } else {
        throw new Error('Payment failed')
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
          {/* ACCEPTED or COMPLETED */}
          {(reqDetails?.status === "1" || reqDetails?.status === "4") && (
            <>
              <Divider>
                <Chip label="Payment Details" />
              </Divider>

              <Pair
                left="Amount calculated with interest"
                right={`${web3.utils.fromWei(paymentDetails?.originalAmount, 'ether')} ETH`}
              />
              <Pair
                left="Delay cost"
                right={`${web3.utils.fromWei(paymentDetails?.totalAmount, 'ether') - web3.utils.fromWei(paymentDetails?.originalAmount, 'ether')} ETH`}
                border={false}
              />
              <Divider>
                <Chip label="Total" />
              </Divider>
              <Pair
                left="Total amount to be paid"
                right={`${web3.utils.fromWei(paymentDetails?.totalAmount, 'ether')} ETH`}
              />

              {reqDetails?.status === "1" && (
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
              )}
              {/* COMPLETED */}
              {reqDetails?.status === "4" && (
                <Box sx={{ mt: 3, display: 'grid', placeItems: 'center' }}>
                  <Chip label="Request Completed" />
                </Box>
              )}
            </>
          )}
        </RequestCommonDetails>
      )}
    </Layout>
  )
}

export default RequestDetails