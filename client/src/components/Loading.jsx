import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = ({ backdrop = false }) => {

    return (
        <>
            {
                backdrop ?
                    <>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open
                        >
                            <CircularProgress color="secondary" size={60} />
                        </Backdrop>
                    </>
                    : (
                        <div style={{ height: "100vh", width : '100%', display : 'grid', placeItems : 'center' }}>
                            <CircularProgress color="primary" size={60}  />
                        </div>
                    )
            }

        </>
    )
}

export default Loading