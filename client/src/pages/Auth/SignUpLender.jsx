import { React, useState } from 'react';
import { useRef } from 'react';
import { actions, useEth } from '../../contexts';
import NavbarCommon from '../../components/NavbarCommon.js';
import InputField from '../../components/InputField';
import { Avatar, Grid, Box, Button } from '@mui/material';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import { Form, Card } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';

const SignUpLender = () => {

    const { state: { contracts, accounts }, dispatch } = useEth();
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [previewImg, setPreviewImg] = useState('');
    const [imgDetails, setImgDetails] = useState();
    const [interestRate, setInterestRate] = useState(0);
    const [maximumPrincipal, setMaximumPrincipal] = useState(0);
    const ref = useRef(null);

    const handleClick = async () => {
        try {
            // const res = await contracts['P2pLending'].methods.SignUpLender("Borrower1", "https://image.png", "pass", 10).send({ from: accounts[0] });
            const res = await contracts['P2pLending'].methods.signUpLender(name, previewImg, password , 10, 100).send({ from: accounts[0] });
            console.log({ res });
            let userData;
            if (res) {
                // userData = await contracts['P2pLending'].methods.signInBorrower("pass").call({from : accounts[0]});
                userData = await contracts['P2pLending'].methods.signInLender("pass").call({ from: accounts[0] });

            } else {
                throw new Error('Something went wrong');
            }
            console.log({ userData });
            if (userData) {
                dispatch({
                    type: actions.setUser,
                    data: JSON.parse(JSON.stringify(userData))
                });
            }
        } catch (error) {
            console.log({ error });
            alert(error.message || "something went wrong")
        }
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImgDetails(file);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            setPreviewImg(fileReader.result);
        }
        fileReader.onerror = (err) => {
            console.log(err);
        }
    }


    return (

        <div style={{ position: 'relative' }}>
            <div style={{ paddingBottom: '4rem' }}>
        
                <div className='container my-5'>
                    <h1 style={{ padding: '0 38%' }}>Lender SignUp</h1>
                </div>

                <Card body={true} className="shadow " style={{ borderRadius: '10px', width: '70%', transform: 'translateX(20%)' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                            <input ref={ref} type="file" accept='image/*' style={{ display: 'none' }} onChange={handleImageChange} />
                            <Avatar
                                sx={{ width: 300, height: 300 }}
                                src={previewImg}
                            />

                            <Button
                                sx={{ mt: 2 }}
                                variant="outlined"
                                onClick={() => ref.current.click()}
                            >
                                Change Image&nbsp;
                                <EditIcon />
                            </Button>

                        </Grid>
                        <Grid item xs={12} md={8}>

                            <Form onSubmit={handleClick}>
                                <InputField
                                    label='Account'
                                    value={accounts[0]}
                                    readOnly
                                    className='mb-3'
                                />

                                <InputField
                                    label='Name'
                                    value={name}
                                    required
                                    className='mb-3'
                                    onChange={(e) => setname(e.target.value)}
                                />

                                <InputField
                                    label='Password (In Bytes32)'
                                    type='password'
                                    value={password}
                                    required
                                    className='mb-3'
                                    onChange={(e) => setpassword(e.target.value)}
                                />

                                <InputField
                                    label='Rate of Interest (% per annum)'
                                    type='number'
                                    value={interestRate}
                                    required
                                    className='mb-3'
                                    onChange={(e) => setInterestRate(e.target.value)}
                                />

                                <InputField
                                    label='Maximum Principal Amount (INR)'
                                    type='number'
                                    value={maximumPrincipal}
                                    required
                                    className='mb-3'
                                    onChange={(e) => setMaximumPrincipal(e.target.value)}
                                />

                                <Box sx={{ display: "grid", placeItems: 'center' }}>
                                    <Button
                                        type="submit"
                                        sx={{ mt: 3, mb: 5 }}
                                        variant="contained"
                                        endIcon={<HowToRegRoundedIcon />}
                                    >Sign Up
                                    </Button>
                                </Box>
                            </Form>
                        </Grid>
                    </Grid>
                </Card>
                <br /> <br />
            </div>
            <footer className="footer mt-5 mb-0 py-3 bg-warning" style={{ position: 'absolute', bottom: '0', width: '100%', textAlign: 'center' }}>
                <div className="container">
                    <span>&copy; 2022, All rights reserved.</span>
                </div>
            </footer>
        </div>

    )
}

export default SignUpLender;