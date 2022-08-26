import { React, useState } from 'react'
import { Box, Button } from '@mui/material';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import { actions, useEth } from '../../contexts';
import NavbarCommon from '../../components/NavbarCommon.js';
import InputField from '../../components/InputField';

const SignIn = () => {

    const { state: { contracts, accounts }, dispatch } = useEth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const role = await contracts['P2pLending'].methods.getRole().call({ from: accounts[0] });
            console.log({ role });

            let userData;
            if (role === 'Borrower') {
                userData = await contracts['P2pLending'].methods.signInBorrower(password).call({ from: accounts[0] });
            } else if (role === 'Lender') {
                userData = await contracts['P2pLending'].methods.signInLender(password).call({ from: accounts[0] });
            } else {
                throw new Error('User not found');
            }

            console.log({ userData: JSON.parse(JSON.stringify(userData)) });
            if (userData) {
                dispatch({
                    type: actions.setUser,
                    data: JSON.parse(JSON.stringify(userData))
                });
            }
        } catch (error) {
            alert(error.message || "something went wrong")
        }
    }

    const [password, setpassword] = useState('');


    return (

        <>
            <div style={{ position: 'relative' }}>
                <div style={{ paddingBottom: '4rem' }}>
                    <NavbarCommon role="signIn" />


                    <div className='container mt-5'>
                        <h1 style={{ padding: '0 45%' }}>SignIn</h1>
                    </div>
                    
                        <form onSubmit={handleSubmit}>
                        <div className="container mt-5" style={{ width: '50%' }}>
                            <InputField
                                label='Account'
                                value={accounts[0]}
                                readOnly
                                className='mb-3'
                            />
                            <InputField
                                label='Password'
                                className='mb-3'
                                value={password}
                                required
                                onChange={(e) => setpassword(e.target.value)}
                            />


                            <Box sx={{ display: "grid", placeItems: 'center' }}>
                                <Button
                                    type="submit"
                                    sx={{ mt: 3, mb: 5}}
                                    variant="contained"
                                    endIcon={<LockOpenRoundedIcon />}
                                >Sign In
                                </Button>
                            </Box>
                        </div>
                        </form>

                   
                    <footer className="footer mt-6 mb-0 py-3 bg-warning" style={{
                        position: 'absolute', bottom: '0', width: '100%', textAlign: 'center', transform:
                            'translateY(280%)'
                    }}>
                        <div className="container">
                            <span>&copy; 2022, All rights reserved.</span>
                        </div>
                    </footer>
                </div>
            </div>



        </>


    )
}

export default SignIn;