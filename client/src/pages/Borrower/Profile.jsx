import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { actions, useEth } from '../../contexts';
import ProfileCard from '../../components/ProfileCard';
import { useParams } from 'react-router';
import { uploadFile, deleteFile } from '../../utils/cloudinaryUtils';
import UpdateIcon from '@mui/icons-material/Update';
import InputField from '../../components/InputField';
import Loading from '../../components/Loading';

const Profile = () => {
    const { state: { accounts, user, contracts }, dispatch } = useEth();
    const [borrowerData, setBorrowerData] = useState({});
    const [loading, setLoading] = useState(true);
    const { borrowerAddress } = useParams()

    const [annualIncome, setAnnualIncome] = useState('');
    const [name, setName] = useState('');
    const [imgDetails, setImgDetails] = useState();
    const [bio, setBio] = useState('');

    const [backdropLoading, setBackdropLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                let data;
                if (borrowerAddress !== accounts[0]) {
                    data = await contracts.P2pLending.methods.borrowers(borrowerAddress).call();
                } else {
                    data = user;
                }
                console.log({ data })
                setBorrowerData(data);
                setAnnualIncome(data?.annualIncome);
                setName(data?.name);
                setBio(data?.bio);

                setLoading(false);
            } catch (error) {
                alert(error.message);
            }
        }
        getData();
    }, [accounts, contracts, borrowerAddress, user])

    const updateProfile = async () => {
        setBackdropLoading(true);
        try {
            console.log({ imgDetails })
            let url = borrowerData?.image;
            if (imgDetails) {
                await deleteFile(borrowerData?.image)
                url = await uploadFile(imgDetails);
            }

            const data = await contracts.P2pLending.methods.updateBorrower(
                name,
                url,
                Number(annualIncome),
                bio
            ).send({ from: accounts[0] })

            console.log({ updateRes: data })
            if (data) {
                const update = await contracts.P2pLending.methods.borrowers(accounts[0]).call()
                const updateObj = Object.assign({}, update);
                console.log({ updateObj, update })

                setBackdropLoading(false);
                dispatch({
                    type: actions.setUser,
                    data: JSON.parse(JSON.stringify(updateObj))
                });
            }
            console.log({ url })
        } catch (error) {
            setBackdropLoading(false);
            alert(error.message);
        }
    }

    return (
        <Layout>
            {loading ? <Loading /> : (
                <ProfileCard
                    spamVotes={borrowerData?.spamVotes || 10}
                    image={borrowerData?.image}
                    setImgDetails={setImgDetails}
                    walletAddress={borrowerAddress}
                >
                    {backdropLoading && <Loading backdrop />}
                    <InputField
                        className="mb-2"
                        label="Approved Loans"
                        value={borrowerData?.approvedLoans}
                        readOnly
                    />
                    <InputField
                        className="mb-2"
                        label="Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        readOnly={borrowerAddress !== accounts[0]}
                    />

                    <InputField
                        className="mb-2"
                        label="Annual Income"
                        type="number"
                        onChange={(e) => setAnnualIncome(e.target.value)}
                        value={annualIncome}
                        readOnly={borrowerAddress !== accounts[0]}
                    />
                    <InputField
                        className="mb-3"
                        label="Bio"
                        as="textarea"
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        readOnly={borrowerAddress !== accounts[0]}
                    />
                    {borrowerAddress === accounts[0] && (
                        <Button variant='contained' onClick={updateProfile}>Update &nbsp;<UpdateIcon /></Button>
                    )}
                </ProfileCard>
            )}
        </Layout>
    )
}

export default Profile