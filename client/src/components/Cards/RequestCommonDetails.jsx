import { Avatar, Button, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Pair from '../Pair'
import Status from '../Status';
import { useEth } from '../../contexts';

const RequestCommonDetails = ({children, details}) => {

  const {state : {user, contracts}} = useEth()
  const [person, setPerson] = useState({})

  useEffect(() => {
    (async () => {
      let persn
      if(user?.userType === 'lender'){
        persn = await contracts.P2pLending.methods.borrowers(details?.from).call()
      }else{
          persn = await contracts.P2pLending.methods.getLender(details?.to).call()
      }
      setPerson(persn)
    })()
  }, [details])

  return (
    <Card body className="shadow" style={{ borderRadius: '10px' }}>
      <Status 
        status={details?.status}
        style={{width : '100%', display : 'flex', justifyContent : 'center', borderRadius : 5, marginBottom : 10 }} 
      />
      <Pair
        left={user?.userType === "Borrower" ? "Requested to" : "Request from"}
        right={
          <div>
            <Avatar sx={{ width: 75, height: 75 }}  src={person?.image}  />
            <Typography variant="subtitle1">{person?.name || "John Doe"}</Typography>
          </div>
        }
      />

      <Pair
        left="Amount"
        right={details?.amount || "0.1 ETH"}
      />
      <Pair
        left="Duration in years"
        right={`${details?.duration || "1"} years`}
      />
      <Pair
        left="Purpose"
        right={details?.purpose || "Business"}
      />
      <Pair
        left="Recent 1 year bank statement"
        border={false}
        right={
          <div className="d-flex w-100 flex-column justify-content-center align-items-center">
            <iframe
              src={details?.bankStatement || "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf"}
              width="90%"
              height="500px"
            >
            </iframe>
            <Button variant="text" sx={{mt : 3}}>
              <Link 
                href={details?.bankStatement || "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf"}
                target="_blank"
                rel="noreferrer"
                underline="none"
                color="inherit"
                variant="inherit"  
              >
                <Typography color="primary" variant="inherit">
                Open in new tab
                </Typography>
              </Link>
              <OpenInNewIcon />
            </Button>
          </div>
        }
      />
      {children}
    </Card>
  )
}

export default RequestCommonDetails