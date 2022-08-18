import React from 'react'
import { actions, useEth } from '../../contexts';

const SignUp = () => {
  const { state: { contracts, accounts }, dispatch } = useEth();

  const handleClick = async () => {
    try {
      // const res = await contracts['First'].methods.signUpBorrower("Borrower1", "https://image.png", "pass", 10).send({ from: accounts[0] });
      const res = await contracts['First'].methods.signUpLender("Lender1", "https://image.png", "pass", 10, 100).send({ from: accounts[0] });
      console.log({ res });
      let userData;
      if (res) {
        // userData = await contracts['First'].methods.signInBorrower("pass").call();
        userData = await contracts['First'].methods.signInLender("pass").call();

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
    <>
      <div>
        <button onClick={handleClick}>sign Up</button>
      </div>
    </>
  )
}

export default SignUp