import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router';
import Layout from '../../components/Layout'
import ProfileCard from '../../components/ProfileCard';
import UpdateIcon from '@mui/icons-material/Update';
import { actions, useEth } from '../../contexts';
import { deleteFile, uploadFile } from '../../utils/cloudinaryUtils';

const Profile = () => {
    const { state: { accounts, user, web3, contracts }, dispatch } = useEth();
    const [readOnlyData, setReadOnlyData] = useState([]);
    const [restData, setRestData] = useState({});
    const [loading, setLoading] = useState(true);
    const { lenderAddress } = useParams()
    const [interestRate, setInterestRate] = useState('');
    const [maxPrinciplal, setMaxPrinciplal] = useState('');

    const [imgDetails, setImgDetails] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                let lenderData;
                if (lenderAddress !== accounts[0]) {
                    lenderData = await contracts.P2pLending.methods.borrowers(lenderAddress).call();
                }else{
                    lenderData = user;
                }
                console.log({ lenderData })
                const balance = await web3.eth.getBalance(lenderData?.wallet);
                const balanceInEth = web3.utils.fromWei(balance, 'ether');

                setReadOnlyData([
                    {
                        label: 'Name',
                        value: lenderData?.name
                    },
                    {
                        label: 'Wallet Address',
                        value: lenderData?.wallet
                    },
                    {
                        label: 'Wallet Balance (ETH)',
                        value: balanceInEth
                    },
                ])
                setRestData(lenderData);
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

            const lenderData = await contracts.P2pLending.methods.updateLender(
                Number(interestRate || restData?.interestRate),
                Number(maxPrinciplal || restData?.maxPrinciplal),
                url
            ).send({ from: accounts[0] })

            console.log({ updateRes: lenderData })
            if (lenderData) {
                const update = await contracts.P2pLending.methods.getLender(accounts[0]).call()
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
                <ProfileCard setImgDetails={setImgDetails} walletAddress={lenderAddress}>
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
                            onChange={(e) => setInterestRate(e.target.value)}
                            value={interestRate || restData?.interestRate}
                        />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label className='text-muted mb-0' >Max Principal</Form.Label>
                        <Form.Control
                            className='fs-6'
                            size='lg'
                            type="number"
                            onChange={(e) => setMaxPrinciplal(e.target.value)}
                            value={maxPrinciplal || restData?.maxPrinciplal}
                        />
                    </Form.Group>

                    {lenderAddress === accounts[0] && (
                        <Button variant='contained' onClick={updateProfile}>Update &nbsp;<UpdateIcon /></Button>
                    )}
                </ProfileCard>
            )}
        </Layout>
    )
}

export default Profile