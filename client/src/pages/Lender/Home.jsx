import { Avatar, Box, Button, Paper, TableContainer, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import DataTable from '../../components/DataTable';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import Status from '../../components/Status';
import { useEth } from '../../contexts';
import { unixToUTCTimestamp } from '../../utils/dateTimeUtils';

const Home = () => {
  const { state: { accounts, contracts } } = useEth();
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // fetch lenders requests
    (async () => {
      try {
        const reqDetails = await contracts['P2pLending'].methods.getLenderRequests().call({ from: accounts[0] });
        console.log({reqDetails});
        const arrObjs = reqDetails.map((req) => Object.assign({}, req));

        const allReqs = Promise.all(arrObjs.map(async (request) => {
          const borrower = await contracts['P2pLending'].methods.borrowers(request.from).call();
          return {
            ...request,
            borrowerImg: borrower.image,
            borrowerName: borrower.name,
          }
        }))
        const allRows = makeRows(await allReqs)
        setRows(allRows);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })()
  }, [])

  const makeRows = (reqs) => reqs?.map((request) => {
    console.log({ request });
    return {
      Borrower: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={request?.borrowerImg}
            sx={{cursor : 'pointer'}}
            onClick={() => navigate(`/lender/borrower-profile/${request?.from}`)}
          />
          <Typography
            sx={{ ml: 3, cursor : 'pointer' }}
            onClick={() => navigate(`/lender/borrower-profile/${request?.from}`)}
          >
            {request?.borrowerName}
          </Typography>
        </Box>
      ),
      Date: (
        <Typography>
          {new Date(unixToUTCTimestamp(request?.createdAt)).toDateString()}
          {" at "} {new Date(unixToUTCTimestamp(request?.createdAt)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      ),
      Status: (
        <Status status={request?.status} />
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
    <Layout>
      {loading ? <Loading /> : (
        <>
          {
            rows && rows.length > 0 ? (
              <>
                <Typography align='center' sx={{ my: 4 }} variant="h5">Requests</Typography>

                <TableContainer component={Paper} elevation={3} >
                  <DataTable rows={rows} />
                </TableContainer>
              </>
            ) : (
              <div className="d-flex w-100 h-100 justify-content-center align-items-center flex-column">
                <Typography align='center' sx={{ my: 4 }} variant="h6">You haven't got any requests yet</Typography>
                {/* <Typography align='center' variant="h6">Explore all Lenders and make a request</Typography>
              <Button variant='contained' onClick={() => navigate('/borrower/lenders')}>Explore</Button> */}
              </div>
            )
          }
        </>
      )}
    </Layout>
  )
}

export default Home