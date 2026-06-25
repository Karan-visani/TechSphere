import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthProvider'

const Navbar = () => {
  const {user,logout} = useContext(authContext)
  const navigate = useNavigate()

  const logoutHandler = async() =>{
    await logout()
    navigate("dashboard")
    
  }
  return (
    <div className='flex justify-between items-center border-2 border-slate-800 shadow-xl shadow-slate-800 rounded-3xl text-white px-9 py-5 m-5'>
      <h1 className='text-3xl font-bold'>Tech<span className='text-blue-600'>Sphere</span></h1>
      <div className='flex gap-7'>
        <Link to={'/dashboard'} className='text-xl font-semibold hover:text-gray-400'>Dashboard</Link>
        <h2 className='text-xl font-semibold hover:text-gray-400'>Contact</h2>
        <h2 className='text-xl font-semibold hover:text-gray-400'>About</h2>
        <Link to={"/profile"} className='text-xl font-semibold hover:text-gray-400'>Profile</Link>
        {user?
          <button onClick={logoutHandler} className='text-xl font-semibold text-red-700 hover:scale-110'>Logout</button>
        :
          <Link to={'/login'} className='text-xl font-semibold hover:text-gray-400'>Login</Link>
        }
      </div>
    </div>
  )
}

export default Navbar
