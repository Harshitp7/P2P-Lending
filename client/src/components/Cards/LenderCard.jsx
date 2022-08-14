import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Paper, Typography } from '@mui/material'
import React from 'react'

const LenderCard = () => {
  return (
    <>
        <Card component={Paper} elevation={4} sx={{px : 1, pb : 1}}>
            <CardHeader
                avatar={
                    <Avatar 
                        src={"https://material-ui.com/static/images/avatar/1.jpg"}
                        sx={{ width: 56, height: 56 }}
                     />
                }
                title="Lender's Name"
            />
            <CardContent>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                </Typography>
                <Typography sx={{mt : 3}} fontWeight={'bold'}>
                    Interset Rate : 0.5%
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant='contained'>Request Loan</Button>
            </CardActions>
        </Card>
    </>
  )
}

export default LenderCard