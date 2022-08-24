import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { actions, useEth } from '../../contexts';
import { Form, } from 'react-bootstrap';
import ProfileCard from '../../components/ProfileCard';
import { useParams } from 'react-router';
import { uploadFile, deleteFile } from '../../utils/cloudinaryUtils';
import UpdateIcon from '@mui/icons-material/Update';

const Profile = () => {
    const { state: { accounts, user, contracts }, dispatch } = useEth();
    const [borrowerData, setBorrowerData] = useState({});
    const [loading, setLoading] = useState(true);
    const { borrowerAddress } = useParams()

    const [annualIncome, setAnnualIncome] = useState('');
    const [name, setName] = useState('');
    const [imgDetails, setImgDetails] = useState();

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

                setLoading(false);
            } catch (error) {
                alert(error.message);
            }
        }
        getData();
    }, [accounts, contracts, borrowerAddress, user])

    const updateProfile = async () => {
        try {
            console.log({ imgDetails })
            let url = borrowerData?.image;
            if (imgDetails) {
                await deleteFile(borrowerData?.image)
                url = await uploadFile(imgDetails);
            }

            const data = await contracts.P2pLending.methods.updateBorrower(
                name || borrowerData?.name,
                url,
                Number(annualIncome || borrowerData?.annualIncome),
            ).send({ from: accounts[0] })

            console.log({ updateRes: data })
            if (data) {
                const update = await contracts.P2pLending.methods.borrowers(accounts[0]).call()
                const updateObj = Object.assign({}, update);
                console.log({ updateObj, update })
                dispatch({
                    type: actions.setUser,
                    data: JSON.parse(JSON.stringify(updateObj))
                });
            }
            console.log({ url })
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <Layout>
            {loading ? <div>Loading...</div> : (
                <ProfileCard
                    spamVotes={borrowerData?.spamVotes || 10}
                    image={borrowerData?.image}
                    setImgDetails={setImgDetails}
                    walletAddress={borrowerAddress}
                >

                    <Form.Group className='mb-3'>
                        <Form.Label className='text-muted mb-0' >Name</Form.Label>
                        <Form.Control
                            className='fs-6'
                            size='lg'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label className='text-muted mb-0' >Annual Income</Form.Label>
                        <Form.Control
                            className='fs-6'
                            size='lg'
                            type="number"
                            onChange={(e) => setAnnualIncome(e.target.value)}
                            value={annualIncome}
                        />
                    </Form.Group>
                    {borrowerAddress === accounts[0] && (
                        <Button variant='contained' onClick={updateProfile}>Update &nbsp;<UpdateIcon /></Button>
                    )}
                    {borrowerAddress !== accounts[0] && (
                        <Button color="error" variant='contained' >Mark as Spam</Button>
                    )}
                </ProfileCard>
            )}
        </Layout>
    )
}

export default Profile