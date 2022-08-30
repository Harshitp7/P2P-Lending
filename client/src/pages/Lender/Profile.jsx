import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
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
    const [bio, setBio] = useState('');

    const [backdropLoading, setBackdropLoading] = useState(false);

    console.log({ lenderAddress })
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
                setBio(data?.bio);

                setLoading(false);
            } catch (error) {
                alert(error.message || "Something went wrong");
            }
        }
        getData();
    }, [accounts, contracts, lenderAddress, user])


    const updateProfile = async () => {
        setBackdropLoading(true);
        try {
            console.log({ imgDetails })
            let url = lenderData?.image;
            if (imgDetails) {
                await deleteFile(lenderData?.image)
                url = await uploadFile(imgDetails);
            }

            const res = await contracts.P2pLending.methods.updateLender(
                name,
                url,
                Number(interestRate),
                Number(maxPrincipal),
                bio
            ).send({ from: accounts[0] })

            console.log({ updateRes: res })
            if (res) {
                const update = await contracts.P2pLending.methods.getLender(accounts[0]).call()
                // cinvert array into object
                const updateObj = Object.assign({}, update);
                setBackdropLoading(false);
                dispatch({
                    type: actions.setUser,
                    data: JSON.parse(JSON.stringify(updateObj))
                });
            }
            console.log({ url })
        } catch (error) {
            setBackdropLoading(false);
            alert(error.message || "Something went wrong");
        }
    }


    return (
        <div className='w-100 h-100 d-flex flex-column'>
            <div style={{ position: 'sticky', left: 0, top: 0, zIndex: 5 }} className="shadow">
                <NavbarCommon role="LenderLayout" />
            </div>

            <Layout>
                {loading ? <Loading /> : (
                    <ProfileCard setImgDetails={setImgDetails} walletAddress={lenderAddress} image={lenderData?.image}>
                        {backdropLoading && <Loading backdrop />}
                        <InputField
                            className="mb-2"
                            label="Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            readOnly={lenderAddress !== accounts[0]}
                        />

                        <InputField
                            className="mb-2"
                            type="number"
                            label="Interest Rate"
                            onChange={(e) => setInterestRate(e.target.value)}
                            value={interestRate}
                            readOnly={lenderAddress !== accounts[0]}
                        />

                        <InputField
                            className="mb-2"
                            type="number"
                            label="Max Principal"
                            onChange={(e) => setMaxPrincipal(e.target.value)}
                            value={maxPrincipal}
                            readOnly={lenderAddress !== accounts[0]}
                        />
                        <InputField
                            className="mb-3"
                            as="textarea"
                            label="Bio"
                            onChange={(e) => setBio(e.target.value)}
                            value={bio}
                            readOnly={lenderAddress !== accounts[0]}
                        />

                        {lenderAddress === accounts[0] && (
                            <Button variant='contained' onClick={updateProfile}>Update &nbsp;<UpdateIcon /></Button>
                        )}
                        {lenderAddress !== accounts[0] && (
                            <Button
                                variant="contained"
                                onClick={() => navigate(`/borrower/lenders/create-request`, { state: { lenderAddress, lenderImage: lenderData?.image } })}
                            >Request Loan
                            </Button>
                        )}
                    </ProfileCard>
                )}
            </Layout>
        </div>
    )
}

export default Profile