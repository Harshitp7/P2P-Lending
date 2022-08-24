import React from 'react'
import { actions, useEth } from '../../contexts';
import NavbarCommon from '../../components/NavbarCommon.js';

const SignUpLender = (props) => {
    const { state: { contracts, accounts }, dispatch } = useEth();

    const handleClick = async () => {
        try {
            // const res = await contracts['P2pLending'].methods.SignUpLender("Borrower1", "https://image.png", "pass", 10).send({ from: accounts[0] });
            const res = await contracts['P2pLending'].methods.signUpLender("Lender3", "https://image1.png", "pass", 10, 100).send({ from: accounts[0] });
            console.log({ res });
            let userData;
            if (res) {
                // userData = await contracts['P2pLending'].methods.signInBorrower("pass").call({from : accounts[0]});
                userData = await contracts['P2pLending'].methods.signInLender("pass").call({ from: accounts[0] });

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

    return (

        <div style={{ position: 'relative' }}>
            <div style={{ paddingBottom: '4rem' }}>
                <NavbarCommon role="Lender" />
                <div className='container mt-5'>
                    <h1 style={{ padding: '0 35%' }}>Lender SignUp</h1>
                </div>

                <div className="container mt-5" style={{ width: '50%' }}>
                    <button type="button" className="btn mb-3" style={{ backgroundColor: 'purple', borderRadius: '20px', color: 'white' }}>
                        Account : {accounts[0]}
                    </button>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Name" />
                        <label htmlFor="floatingInput">Name</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Profile Image</label>
                        <input className="form-control" type="file" id="formFile" />
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Name" />
                        <label htmlFor="floatingInput">Rate of Interest (INR)</label>

                    </div>
                    <div className="form-floating mb-4">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Name" />
                        <label htmlFor="floatingInput">Maximum Principal Amount</label>

                    </div>
                    <div className="container mb-4">
                        <button onClick={handleClick} style={{ transform: 'translateX(450%)', backgroundColor: 'purple', color: 'white', borderRadius: '20px', width: '10%' }}>Sign Up</button>
                    </div>
                </div>
                <br /> <br />
            </div>
            <footer className="footer mt-5 mb-0 py-3 bg-warning" style={{ position: 'absolute', bottom: '0', width: '100%', textAlign: 'center' }}>
                <div className="container">
                    <span>&copy; 2022, All rights reserved.</span>
                </div>
            </footer>
        </div>

    )
}

export default SignUpLender;