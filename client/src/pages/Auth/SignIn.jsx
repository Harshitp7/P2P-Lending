import React from 'react'
import { actions, useEth } from '../../contexts';

const SignIn = () => {
    const { dispatch } = useEth()
    const handleClick = () => {
        // take input as password and send to blockchain

        // fetch data from block chain 
        dispatch({
            type: actions.setUser,
            // set user data
            data: {
                userType: 'borrower'
            }
        });
    }
    return (
        <>
            <div>
                <button onClick={handleClick}>signin</button>
            </div>
        </>
    )
}

export default SignIn