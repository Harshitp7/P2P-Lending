import { Alert, Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Form, Card } from 'react-bootstrap';
import { useEth } from '../contexts';
import EditIcon from '@mui/icons-material/Edit';

const ProfileCard = ({ children, setImgDetails, spamVotes = 0 }) => {
    const { state: { accounts, user, web3 } } = useEth();
    const [loading, setLoading] = useState(true);
    const [previewImg, setPreviewImg] = useState('');
    const ref = useRef(null)

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setImgDetails(file)
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = ()=>{
            setPreviewImg(fileReader.result)
        }
        fileReader.onerror = (err)=>{
          console.log(err)
        }
    }

    return (
        <Card body={true} className="shadow " style={{ borderRadius: '10px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection : 'column' }} >
                    <input ref={ref} type="file" accept='image/*' style={{ display: 'none' }} onChange={handleImageChange} />
                    <Avatar
                        sx={{ width: 300, height: 300 }}
                        src={previewImg || "https://material-ui.com/static/images/avatar/1.jpg"}
                    />
                    <Button
                        sx={{mt : 2}} 
                        variant="outlined"
                        onClick={() => ref.current.click()}
                    >
                        Update Image
                        <EditIcon />
                    </Button>
                </Grid>
                <Grid item xs={12} md={8}>
                    {
                        spamVotes > 0 && (
                            <Alert severity="error" style={{ borderRadius: '10px' }}>
                                {spamVotes}{" "}
                                people marked as fraud
                            </Alert>
                        )
                    }
                    {children}
                </Grid>
            </Grid>
        </Card>
    )
}

export default ProfileCard