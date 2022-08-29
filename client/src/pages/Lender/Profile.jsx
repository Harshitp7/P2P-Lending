import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import Layout from '../../components/Layout'
import ProfileCard from '../../components/ProfileCard';
import UpdateIcon from '@mui/icons-material/Update';
import { actions, useEth } from '../../contexts';
import { deleteFile, uploadFile } from '../../utils/cloudinaryUtils';
import InputField from '../../components/InputField';
import NavbarCommon from '../../components/NavbarCommon';

const Profile = () => {
    const { state: { accounts, user, contracts }, dispatch } = useEth();
    const [lenderData, setLenderData] = useState({});
    const [loading, setLoading] = useState(true);
    const { lenderAddress } = useParams()
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [maxPrincipal, setMaxPrincipal] = useState('');
    const [imgDetails, setImgDetails] = useState();

    console.log({lenderAddress})
    useEffect(() => {
        const getData = async () => {
            try {
                let data;
                if (lenderAddress !== accounts[0]) {
                    data = await contracts.P2pLending.methods.getLender(lenderAddress).call();
                } else {
                    data = user;
                }
                console.log({ data })
                setLenderData(data);
                setName(data?.name);
                setInterestRate(data?.interestRate);
                setMaxPrincipal(data?.maxPrincipal);

                setLoading(false);
            } catch (error) {
                alert(error.message || "Something went wrong");
            }
        }
        getData();
    }, [accounts, contracts, lenderAddress, user])


    const updateProfile = async () => {
        try {
            console.log({ imgDetails })
            let url = lenderData?.image;
            if (imgDetails) {
                await deleteFile(lenderData?.image)
                url = await uploadFile(imgDetails);
            }

            const res = await contracts.P2pLending.methods.updateLender(
                name || lenderData?.name,
                url,
                Number(interestRate || lenderData?.interestRate),
                Number(maxPrincipal || lenderData?.maxPrincipal),
            ).send({ from: accounts[0] })

            console.log({ updateRes: res })
            if (res) {
                const update = await contracts.P2pLending.methods.getLender(accounts[0]).call()
                // cinvert array into object
                const updateObj = Object.assign({}, update);
                dispatch({
                    type: actions.setUser,
                    data: JSON.parse(JSON.stringify(updateObj))
                });
            }
            console.log({ url })
        } catch (error) {
            alert(error.message || "Something went wrong");
        }
    }


    return (
        <>
        <NavbarCommon role="LenderLayout"/>
        <Layout>
            {loading ? <div>Loading...</div> : (
                <ProfileCard setImgDetails={setImgDetails} walletAddress={lenderAddress} image={lenderData?.image}>

                        <InputField
                            className="mb-3"
                            label="Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        
                        <InputField
                            className="mb-3"
                            type="number"
                            label="Interest Rate"
                            onChange={(e) => setInterestRate(e.target.value)}
                            value={interestRate}
                        />

                        <InputField
                            className="mb-3"
                            type="number"
                            label="Max Principal"
                            onChange={(e) => setMaxPrincipal(e.target.value)}
                            value={maxPrincipal}
                        />

                    {lenderAddress === accounts[0] && (
                        <Button variant='contained' onClick={updateProfile}>Update &nbsp;<UpdateIcon /></Button>
                    )}
                    {lenderAddress !== accounts[0] && (
                        <Button 
                            variant="contained"
                            onClick={() => navigate(`/borrower/lenders/create-request`, { state: { lenderAddress, lenderImage : lenderData?.image } })}
                        >Request Loan
                        </Button>
                    )}
                </ProfileCard>
            )}
        </Layout>
        </>
    )
}

export default Profile