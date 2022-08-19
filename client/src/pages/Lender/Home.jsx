import React, { useEffect } from 'react'
import { useEth } from '../../contexts';

const Home = () => {
  const { state } = useEth();

  useEffect(() => {
    const fun = async () => {
      const lenders = await state.contracts['P2pLending'].methods.getLenders().call();
      console.log({ lenders });
    }
    fun();
  }, [])

  return (
    <div>Lender Home</div>
  )
}

export default Home