import React from 'react'
import { actions, useEth } from '../../contexts';

const SignUp = () => {
  const { state: { contracts, accounts }, dispatch } = useEth();

  const handleClick = async () => {
    try {
      const res = await contracts['First'].methods.signUpBorrower("Borrower1", "https://image.png", "pass", 10).send({ from: accounts[0] });
      console.log({ res });
      let userData;
      if (res) {
        userData = await contracts['First'].methods.borrowers(accounts[0]).call();
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