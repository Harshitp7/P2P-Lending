import { React, useState } from 'react';
import { useRef } from 'react';
import { actions, useEth } from '../../contexts';
import InputField from '../../components/InputField';
import { Avatar, Grid, Box, Button, Stack } from '@mui/material';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import { Form, Card } from 'react-bootstrap';
import EditIcon from '@mui/icons-material/Edit';
import sha1 from 'js-sha1'


<<<<<<< HEAD
export default function SignUpBorrower(){
=======
export default function SignUpBorrower({ image }) {
>>>>>>> 8c4c64a092cfb5fea5586c2c72421a138bee8970

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
      // const res = await contracts['P2pLending'].methods.SignUp("Borrower1", "https://image.png", "pass", 10).send({ from: accounts[0] });
<<<<<<< HEAD
      const res = await contracts['P2pLending'].methods.signUpBorrower(name , previewImg, password , annualIncome).send({ from: accounts[0] });
=======
      const res = await contracts['P2pLending'].methods.signUpBorrower(
        name, "https://image.png", password, Number(annualIncome))
        .send({ from: accounts[0] });
>>>>>>> 8c4c64a092cfb5fea5586c2c72421a138bee8970
      console.log({ res });
      let userData;
      if (res) {
        // userData = await contracts['P2pLending'].methods.signInBorrower("pass").call({from : accounts[0]});
        userData = await contracts['P2pLending'].methods.signInBorrower(password).call({ from: accounts[0] });

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
  const uploadFile =  async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'P2pLending')
    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: formData,
    });
    const json = await response.json();
    console.log({uploadRes : json});
    return json?.secure_url;
}
setPreviewImg(uploadFile);

<<<<<<< HEAD
  
  
 
=======
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
>>>>>>> 8c4c64a092cfb5fea5586c2c72421a138bee8970


  return (
    <>
      <div style={{ position: 'relative' }}>
        <div style={{ paddingBottom: '4rem' }}>
<<<<<<< HEAD
         <div className='container my-5'>
            <h1 style={{ padding: '0 35%',}}>Borrower SignUp</h1>
          </div>
          <div>
          <Card body={true} className="shadow " style={{ borderRadius: '10px', width: '70%', transform: 'translateX(20%)'}}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                    <input ref={ref} type="file" accept='image/*' style={{ display: 'none' }} onChange={uploadFile} />
                    <Avatar
                        sx={{ width: 300, height: 300}}
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
                         label='Annual Income (INR)'
                         type='number'
                         value= {Number(annualIncome)}
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
                  </Grid>
            </Grid>
        </Card>
=======
          <NavbarCommon role="Borrower" />


          <div className='container my-5'>
            <h1 style={{ padding: '0 35%', }}>Borrower SignUp</h1>
          </div>
          <div>
            <Card body={true} className="shadow " style={{ borderRadius: '10px', width: '70%', transform: 'translateX(20%)' }}>
              <Stack>
                <input ref={ref} type="file" accept='image/*' style={{ display: 'none' }} onChange={handleImageChange} />
                <Avatar
                  sx={{ width: 250, height: 250, mx: 'auto' }}
                  src={previewImg || image}
                />

                <div className='d-flex w-100 justify-content-center align-items-center'>
                  <Button
                    sx={{ mt: 2 }}
                    variant="outlined"
                    fullWidth={false}
                    onClick={() => ref.current.click()}
                  >
                    Select Image&nbsp;
                    <EditIcon />
                  </Button>
                </div>

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
              </Stack>
            </Card>
>>>>>>> 8c4c64a092cfb5fea5586c2c72421a138bee8970

            <div className="container mt-5" style={{ width: '50%' }}>

            </div>
            <br /> <br />
          </div>
          <footer className="footer mt-5 mb-0 py-3 bg-warning" style={{ position: 'absolute', bottom: '0', width: '100%', textAlign: 'center' }}>
            <div className="container">
              <span>&copy; 2022, All rights reserved.</span>
            </div>
          </footer>
        </div>
      </div>
    </>
  )


}

