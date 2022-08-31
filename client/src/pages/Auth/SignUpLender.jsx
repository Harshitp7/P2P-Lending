import { React, useState } from 'react';
import { useRef } from 'react';
import { actions, useEth } from '../../contexts';
import InputField from '../../components/InputField';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import { Form, Card } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import { uploadFile } from '../../utils/cloudinaryUtils';
import Loading from '../../components/Loading';
import Layout from '../../components/Layout';
const SignUpLender = () => {

    const { state: { contracts, accounts }, dispatch } = useEth();
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const [previewImg, setPreviewImg] = useState('');
    const [imgDetails, setImgDetails] = useState();
    const [interestRate, setInterestRate] = useState(0);
    const [maximumPrincipal, setMaximumPrincipal] = useState(0);

    const [loading, setLoading] = useState(false);
    const ref = useRef(null);

    const handleClick = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const imgUrl = await uploadFile(imgDetails)
            const res = await contracts['P2pLending'].methods.signUpLender(
                name,
                imgUrl,
                password,
                Number(interestRate),
                Number(maximumPrincipal)
            ).send({ from: accounts[0] });
            console.log({ res });
            let userData;
            if (res) {
                userData = await contracts['P2pLending'].methods.signInLender(password).call({ from: accounts[0] });
            } else {
                throw new Error('Something went wrong');
            }
            console.log({ userData });
            if (userData) {
                const userObj = Object.assign({}, userData);
                setLoading(false);
                console.log({ userObj });
                dispatch({
                    type: actions.setUser,
                    data: JSON.parse(JSON.stringify(userObj))
                });
            }
        } catch (error) {
            console.log({ error });
            setLoading(false);
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
        <>
            <Layout>
                {loading && <Loading backdrop />}
                <div className='w-100 h-100 d-flex justify-content-center align-items-cente flex-column'>

                    <Typography align='center' color='primary' variant='h3' fontSize={'2rem'}>Signup as Lender</Typography>
                    
                    <div className='w-lg-50 w-sm-75 w-xs-100 mt-3 mx-auto'>
                        <Stack>
                            <input ref={ref} type="file" accept='image/*' style={{ display: 'none' }} onChange={handleImageChange} />
                            <Avatar
                                sx={{ width: 250, height: 250, mx: 'auto' }}
                                src={previewImg}
                            />
                            <div className='d-flex w-100 justify-content-center align-items-center mb-5'>

                                <Button
                                    sx={{ mt: 2 }}
                                    variant="outlined"
                                    onClick={() => ref.current.click()}
                                >
                                    Select Image&nbsp;
                                    <EditIcon />
                                </Button>
                            </div>
                            <Card body={true} className="shadow " style={{ borderRadius: '10px'}}>
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
                                        label='Password'
                                        type='password'
                                        value={password}
                                        required
                                        className='mb-3'
                                        onChange={(e) => setpassword(e.target.value)}
                                    />

                                    <InputField
                                        label='Rate of Interest (% per month)'
                                        type='number'
                                        value={interestRate}
                                        required
                                        className='mb-3'
                                        onChange={(e) => setInterestRate(e.target.value)}
                                    />

                                    <InputField
                                        label='Maximum Principal Amount you can give (ETH)'
                                        type='number'
                                        value={maximumPrincipal}
                                        required
                                        className='mb-3'
                                        onChange={(e) => setMaximumPrincipal(e.target.value)}
                                    />

                                    <Box sx={{ display: "grid", placeItems: 'center' }}>
                                        <Button
                                            type="submit"
                                            sx={{ my: 2, }}
                                            variant="contained"
                                            endIcon={<HowToRegRoundedIcon />}
                                        >Sign Up
                                        </Button>
                                    </Box>
                                </Form>
                            </Card>
                        </Stack>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default SignUpLender;