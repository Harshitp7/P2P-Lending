import React from 'react'
import { actions, useEth } from '../../contexts';
const SignIn = () => {

    const { state: { contracts }, dispatch } = useEth();
    const handleClick = async () => {
        try {
            const role = await contracts['P2pLending'].methods.getRole().call();
            console.log({ role });
            let userData;
            if (role === 'Borrower') {
                userData = await contracts['P2pLending'].methods.signInBorrower("pass").call();
            }else if (role === 'Lender') {
                userData = await contracts['P2pLending'].methods.signInLender("pass").call();
            }else {
                throw new Error('User not found');
            }

            console.log({ userData : JSON.parse(JSON.stringify(userData)) });
            if (userData) {
                dispatch({
                    type: actions.setUser,
                    data: JSON.parse(JSON.stringify(userData))
                });
                localStorage.setItem('user', JSON.stringify(userData));
            }
        } catch (error) {
            alert(error.message || "something went wrong")
        }
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