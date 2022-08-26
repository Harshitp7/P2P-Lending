import { Alert, Box } from '@mui/material'
import React from 'react'

const Status = ({ status, style }) => {

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
                <Alert severity={statusColors[status]} sx={{ borderRadius: 10 }} style={style}>
                    {status[0].toUpperCase() + status.slice(1).toLowerCase()}
                </Alert>
            </Box>
        </Box>
    )
}

export default Status