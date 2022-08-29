import { React, useState } from 'react';
import { useRef } from 'react';
import { actions, useEth } from '../../contexts';
import InputField from '../../components/InputField';
import { Avatar, Grid, Box, Button, Stack } from '@mui/material';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import { Form, Card } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import { uploadFile } from '../../utils/cloudinaryUtils';
import NavbarCommon from '../../components/NavbarCommon';

export default function SignUpBorrower({ image }) {

  const { state: { contracts, accounts }, dispatch } = useEth();
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [annualIncome, setAnnualIncome] = useState(0);
  const [previewImg, setPreviewImg] = useState('');
  const [imgDetails, setImgDetails] = useState();
  const ref = useRef(null);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const imgUrl = uploadFile(imgDetails)
      const res = await contracts['P2pLending'].methods.signUpBorrower(
            name,
            imgUrl,
            password,
            Number(annualIncome)
        ).send({ from: accounts[0] });
      console.log({ res });
      let userData;
      if (res) {
        userData = await contracts['P2pLending'].methods.signInBorrower(password).call({ from: accounts[0] });
      } else {
        throw new Error('Something went wrong');
      }
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
    setImgDetails(file)
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      setPreviewImg(fileReader.result)
    }
    fileReader.onerror = (err) => {
      console.log(err)
    }
  }


  return (
    <>
      <div style={{ position: 'relative' }}>
        <div style={{ paddingBottom: '4rem' }}>
         <NavbarCommon />
          <div className='container my-5'>
            <h1 style={{ padding: '0 35%', }}>Borrower SignUp</h1>
          </div>


          <Stack>
            <input ref={ref} type="file" accept='image/*' style={{ display: 'none' }} onChange={handleImageChange} />
            <Avatar
              sx={{ width: 250, height: 250, mx: 'auto' }}
              src={previewImg || image}
            />

            <div className='d-flex w-100 justify-content-center align-items-center'>
              <Button
                sx={{ mt: 2, mb: 5 }}
                variant="outlined"
                fullWidth={false}
                onClick={() => ref.current.click()}
              >
                Select Image&nbsp;
                <EditIcon />
              </Button>
            </div>

            <Card body={true} className="shadow " style={{ borderRadius: '10px', width: '70%', transform: 'translateX(20%)' }}>
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
                  label='Annual Income (INR)'
                  type='select'
                  value={annualIncome}
                  required
                  className='mb-3'
                  onChange={(e) => setAnnualIncome(e.target.value)}
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
            </Card>
          </Stack>







          <br /> <br />
        </div>
        <footer className="footer mt-5 mb-0 py-3 bg-warning" style={{ position: 'absolute', bottom: '0', width: '100%', textAlign: 'center' }}>
          <div className="container">
            <span>&copy; 2022, All rights reserved.</span>
          </div>
        </footer>
      </div>

    </>
  )


}
