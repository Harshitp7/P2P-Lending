import React from 'react'
import { actions, useEth } from '../../contexts';
import NavbarCommon from '../../components/NavbarCommon.js';
const SignIn = () => {

    const { state: { contracts, accounts }, dispatch } = useEth();
    const handleClick = async () => {
        try {
            const role = await contracts['P2pLending'].methods.getRole().call({ from: accounts[0] });
            console.log({ role });

            let userData;
            if (role === 'Borrower') {
                userData = await contracts['P2pLending'].methods.signInBorrower("pass").call({ from: accounts[0] });
            } else if (role === 'Lender') {
                userData = await contracts['P2pLending'].methods.signInLender("pass").call({ from: accounts[0] });
            } else {
                throw new Error('User not found');
            }

            console.log({ userData: JSON.parse(JSON.stringify(userData)) });
            if (userData) {
                dispatch({
                    type: actions.setUser,
                    data: JSON.parse(JSON.stringify(userData))
                });
            }
        } catch (error) {
            alert(error.message || "something went wrong")
        }
    }
    return (

<>
      <div style={{ position: 'relative' }}>
        <div style={{ paddingBottom: '4rem' }}>
          <NavbarCommon role="signIn" />
          

          <div className='container mt-5'>
            <h1 style={{ padding: '0 45%' }}>SignIn</h1>
          </div>
          <div>

            <div className="container mt-5" style={{ width: '50%' }}>
              <button type="button" className="btn mb-5" style={{ backgroundColor: 'purple', borderRadius: '20px', color: 'white' }}>
                Account: {accounts[0]}
              </button>

              
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                <label htmlFor="floatingPassword">Enter your Password to sign-in</label>
              </div>
              
              <div className="container my-5">
                <button onClick={handleClick} style={{ transform: 'translateX(450%)', backgroundColor: 'purple', color: 'white', borderRadius: '20px', width: '10%' }}>Sign In</button>
              </div>
            </div>
            
          </div>
          <footer className="footer mt-6 mb-0 py-3 bg-warning" style={{ position: 'absolute', bottom: '0', width: '100%', textAlign: 'center', transform:
        'translateY(280%)'}}>
            <div className="container">
              <span>&copy; 2022, All rights reserved.</span>
            </div>
          </footer>
        </div>
      </div>



    </>


    )
}

export default SignIn