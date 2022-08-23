import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const DataTable = ({rows}) => {
    if(!rows || rows.length === 0) {
        return (
            <Typography align='center' sx={{ mb: 4 }}>No Requests</Typography>
        )
    }
    return (
        <>
            <Table sx={{minWidth : 650}}>
                <TableHead>
                    <TableRow sx={({palette}) => ({backgroundColor : palette.primary.light})}>
                        {
                            Object.keys(rows[0]).map((col, index) => (
                                <TableCell key={index} align={index === 0 ? 'left' : 'center'} >
                                    <Typography 
                                        fontWeight={'medium'} 
                                        variant='button' 
                                        display='block'
                                        sx={{color : '#fff'}}
                                        >
                                            {col}
                                        </Typography>
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        rows.map((row, i) => (
                            <TableRow 
                                sx={({palette}) => ({backgroundColor : `${i%2 !== 0 ? palette.custom.background.light : 'white'}`})}
                                key={i}>
                                {
                                    Object.keys(row).map((col, index) => (
                                        <TableCell 
                                            align={index === 0 ? 'left' : 'center'}
                                            key={index}
                                        >{row[col]}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default DataTable