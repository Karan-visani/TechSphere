import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center border-2 border-slate-800 shadow-2xl shadow-slate-800 rounded-3xl text-white px-9 py-5 m-5'>
      <h1 className='text-3xl font-bold'>Tech<span className='text-blue-600'>Sphere</span></h1>
      <div className='flex gap-7'>
        <Link to={'/dashboard'} className='text-xl font-semibold hover:text-gray-400'>Dashboard</Link>
        <h2 className='text-xl font-semibold hover:text-gray-400'>Contact</h2>
        <h2 className='text-xl font-semibold hover:text-gray-400'>About</h2>
        <Link to={'/login'} className='text-xl font-semibold hover:text-gray-400'>Login</Link>
      </div>
    </div>
  )
}

export default Navbar
