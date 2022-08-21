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
    const { state: { accounts, user, web3, contracts }, dispatch } = useEth();
    const [readOnlyData, setReadOnlyData] = useState([]);
    const [restData, setRestData] = useState({});
    const [loading, setLoading] = useState(true);
    const { borrowerAddress } = useParams()

    const [annualIncome, setAnnualIncome] = useState('');
    const [imgDetails, setImgDetails] = useState();

    console.log({ annualIncome })
    useEffect(() => {
        const getData = async () => {
            try {
                let borrowerData;
                if (borrowerAddress !== accounts[0]) {
                    borrowerData = await contracts.P2pLending.methods.borrowers(borrowerAddress).call();
                }
                console.log({ borrowerData })
                const balance = await web3.eth.getBalance(borrowerData?.wallet || accounts[0]);
                const balanceInEth = web3.utils.fromWei(balance, 'ether');
                console.log({ balanceInEth });
                setReadOnlyData([
                    {
                        label: 'Name',
                        value: borrowerData?.name || user?.name
                    },
                    {
                        label: 'Wallet Address',
                        value: borrowerData?.wallet || accounts[0]
                    },
                    {
                        label: 'Wallet Balance (ETH)',
                        value: balanceInEth
                    },
                ])
                setRestData(borrowerData || user);
                setLoading(false);
            } catch (error) {
                alert(error.message);
            }
        }
        getData();
    }, [])

    const updateProfile = async () => {
        try {
            console.log({ imgDetails })
            let url = restData?.image;
            if (imgDetails) {
                const isDeleted = await deleteFile(restData?.image)
                if (isDeleted) {
                    url = await uploadFile(imgDetails);
                }
            }

            const borrowerData = await contracts.P2pLending.methods.updateBorrower(
                Number(annualIncome),
                url
            ).send({ from: accounts[0] })

            console.log({ updateRes: borrowerData })
            if (borrowerData) {
                const update = await contracts.P2pLending.methods.borrowers(accounts[0]).call()
                dispatch({
                    type: actions.setUser,
                    data: JSON.parse(JSON.stringify(update))
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
                <ProfileCard spamVotes={restData?.spamVotes || 10} setImgDetails={setImgDetails} walletAddress={borrowerAddress}>
                    {
                        readOnlyData.map((item, i) => (
                            <Form.Group key={i} className='mb-3'>
                                <Form.Label className='text-muted mb-0' >{item.label}</Form.Label>
                                <Form.Control className='fs-6' size='lg' type="name" readOnly value={item.value} />
                            </Form.Group>
                        ))
                    }
                    <Form.Group className='mb-3'>
                        <Form.Label className='text-muted mb-0' >Annual Income</Form.Label>
                        <Form.Control
                            className='fs-6'
                            size='lg'
                            type="number"
                            onChange={(e) => setAnnualIncome(e.target.value)}
                            value={annualIncome || restData?.annualIncome}
                        />
                    </Form.Group>
                    {borrowerAddress === accounts[0] && (
                        <Button variant='contained' onClick={updateProfile}>Update &nbsp;<UpdateIcon/></Button>
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