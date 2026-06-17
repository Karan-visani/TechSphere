import React, { useContext } from 'react'
import { authContext } from '../context/AuthProvider'

const Dashboard = () => {
  const { user } = useContext(authContext)
  console.log(user?.name);
  
  return (
    <div>
      dfvdfv
    </div>
  )
}

export default Dashboard
