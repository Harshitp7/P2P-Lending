import { React, useState } from 'react'
import { Box, Button } from '@mui/material';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import { actions, useEth } from '../../contexts';
import InputField from '../../components/InputField';
import {Form, Card} from 'react-bootstrap';
const SignIn = () => {

    const { state: { contracts, accounts }, dispatch } = useEth();
    const handleClick = async () => {
        try {
            const role = await contracts['P2pLending'].methods.getRole().call({ from: accounts[0] });
            console.log({ role });

            let userData;
            if (role === 'Borrower') {
                userData = await contracts['P2pLending'].methods.signInBorrower("pass").call({ from: accounts[0] });
            } else if (role === 'Lender') {
                userData = await contracts['P2pLending'].methods.signInLender("pass").call({ from: accounts[0] });
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
                   
                    <div className='container mt-5'>
                        <h1 style={{ padding: '0 45%' }}>SignIn</h1>
                    </div>
                    

                        <div className="container mt-5" style={{ width: '50%' }}>
                        <Card body={true} className="shadow " style={{ borderRadius: '10px', width: '70%', transform: 'translateX(20%)'}}>
                            <Form onSubmit={handleClick}>
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
                            </Form>
                            </Card>
                        </div>

                   
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