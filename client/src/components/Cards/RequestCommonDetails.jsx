import { Avatar, Divider, Link, Typography } from '@mui/material'
import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import Pair from '../Pair'

const RequestCommonDetails = () => {

  return (
    <Card body className="shadow" style={{ borderRadius: '10px' }}>
      <Pair
        left="Requested to"
        right={
          <div>
            <Avatar sx={{ width: 75, height: 75 }} />
            <Typography variant="subtitle1">John Doe</Typography>
          </div>
        }
      />

      <Pair
        left="Amount"
        right="1 year"
      />
      <Pair
        left="Duration in years"
        right="0.1 ETH"
      />
      <Pair
        left="Purpose"
        right="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem. lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem adf adf asdf sdf asdf sadfsdf sadf asdf sadf  asdf adsf asdf a sdf asdf sadf asdf asdf sadf asdfasdf"
      />
      <Pair
        left="Recent 1 year bank statement"
        right={
          <div className="d-flex w-100 flex-column justify-content-center align-items-center">
            <iframe
              src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf"
              width="90%"
              height="500px"
              allowfullscreen
            >
            </iframe>
            <Link
              href="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf"
              download
              sx={{ mt: 2 }}
              variant="body2"
              target="_blank"
              rel="noreferrer"
            >
              <Typography variant="subtitle1">Download</Typography>
            </Link>
          </div>
        }
      />
    </Card>
  )
}

export default RequestCommonDetails