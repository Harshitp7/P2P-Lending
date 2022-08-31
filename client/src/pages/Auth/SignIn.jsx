import { React, useState } from 'react'
import { Box, Button, Typography } from '@mui/material';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import { actions, useEth } from '../../contexts';
import InputField from '../../components/InputField';
import { Card } from 'react-bootstrap';
import Layout from '../../components/Layout';
import Loading from '../../components/Loading';
import "../../index.css"

const SignIn = () => {

    const { state: { contracts, accounts }, dispatch } = useEth();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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
            const userObj = Object.assign({}, userData);
            console.log({ userObj });
            setLoading(false);
            console.log({ userData: JSON.parse(JSON.stringify(userObj)) });
            if (userData) {
                dispatch({
                    type: actions.setUser,
                    data: JSON.parse(JSON.stringify(userObj))
                });
            }
        } catch (error) {
            setLoading(false);
            alert(error.message || "something went wrong")
        }
    }

    const [password, setpassword] = useState('');


    return (
        <Layout>
            {loading && <Loading backdrop />}
            <div className='w-100 h-100 d-flex justify-content-center align-items-cente flex-column'>
                <Typography align='center' color='primary' variant='h3' fontSize={'2rem'}>Sign In</Typography>
                <div className='w-lg-50 w-sm-75 w-xs-100 mt-3 mx-auto'>
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <Card body={true} className="shadow" style={{ borderRadius: '10px', }}>
                                <InputField
                                    label='Account'
                                    value={accounts[0]}
                                    readOnly
                                    className='mb-3'
                                />
                                <InputField
                                    label='Password'
                                    type='password'
                                    className='mb-3'
                                    value={password}
                                    required
                                    onChange={(e) => setpassword(e.target.value)}
                                />


                                <Box sx={{ display: "grid", placeItems: 'center' }}>
                                    <Button
                                        type="submit"
                                        sx={{ mt: 3, mb: 5 }}
                                        variant="contained"
                                        endIcon={<LockOpenRoundedIcon />}
                                    >Sign In
                                    </Button>
                                </Box>

                            </Card>
                        </div>
                    </form>
                </div>
            </div>
            {/* </div>
            </div> */}
        </Layout>
    )
}

export default SignIn;