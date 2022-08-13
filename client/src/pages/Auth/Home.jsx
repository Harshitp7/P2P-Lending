import React from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
    <div>Auth Home</div>
    <div>
      <button onClick={()=>navigate('/signin')}>sign in now</button>
    </div>
    </>
  )
}

export default Home