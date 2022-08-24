import React from 'react'
import { Form } from 'react-bootstrap'

const InputField = ({label, size, className, style, readOnly = false, ...rest}) => {
    return (
        <Form.Group className={className} style={style}>
            <Form.Label className='text-muted mb-0' >{label}</Form.Label>
            <Form.Control
                className='fs-6'
                size={size || 'lg'}
                readOnly={readOnly}
                {...rest}
            />
        </Form.Group>
    )
}

export default InputField