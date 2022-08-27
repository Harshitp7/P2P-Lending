import { Alert, Box } from '@mui/material'
import React from 'react'

const Status = ({ status = 0, style }) => {
    console.log({status})
    const statusIndex = {
        0: "PENDING",
        1: "ACCEPTED",
        2: "REJECTED",
        3: "DELAYED",
        4: "COMPLETED"
    }
    const statusColors = {
        PENDING: 'info',
        ACCEPTED: 'success',
        REJECTED: 'error',
        DELAYED: 'warning',
        COMPLETED: 'success',
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent : 'center'}}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent : 'center' }}>
                <Alert severity={statusColors[statusIndex[status]]} sx={{ borderRadius: 10 }} style={style}>
                    {statusIndex[status][0].toUpperCase() + statusIndex[status].slice(1).toLowerCase()}
                </Alert>
            </Box>
        </Box>
    )
}

export default Status