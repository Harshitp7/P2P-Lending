import { Typography } from '@mui/material'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Pair = ({ left, right, border = true }) => {
    console.log({ left, right })
    return (
        <>
            <Row className={`${border ? "border-bottom border-sm-5 " : ""}`}>
                <Col md={6} className="py-3">
                    <div className="d-flex w-100 h-100 align-items-center justify-content-center">
                        <Typography variant="h6" fontWeight="bold">{left}</Typography>
                    </div>
                </Col>

                <Col md={6} className="border-start border-md-5 border-sm-left-0 py-3">
                    <div className="d-flex w-100 h-100 align-items-center justify-content-center">
                        {typeof right === "string" ? (
                            <Typography variant="subtitle1">{right}</Typography>
                        ) : (
                            <>
                                {right}
                            </>
                        )}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Pair