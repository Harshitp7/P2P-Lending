import { Alert, Box } from '@mui/material'
import React from 'react'

const Status = ({ status = 0, style }) => {
    
    const statusInfo = [
        {
            text : "Pending",
            color : "info"
        },
        {
            text : "Accepted",
            color : "success"
        },
        {
            text : "Rejected",
            color : "error"
        },
        {
            text : "Delayed",
            color : "warning"
        },
        {
            text : "Completed",
            color : "success"
        }
    ]

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent : 'center'}}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent : 'center' }}>
                <Alert severity={statusInfo[status].color} sx={{ borderRadius: 10 }} style={style}>
                    {statusInfo[status].text}
                </Alert>
            </Box>
        </Box>
    )
}

export default Status