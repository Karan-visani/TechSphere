import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png'
import API from '../api/axios'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [loggedInUser, setLoggedInUser] = useState([])

  const getUser = async () =>{
    const res = await API.get("/auth/me")
    setLoggedInUser(res.data)
    
  }

  useEffect(() => {
    getUser()
  },[])
  
  

  return (
    <div className= 'min-h-[85vh] w-full flex p-8 overflow-x-auto'>
        <div className=' flex w-1/3 flex-col gap-10 items-center py-4'>
        <img
    src={loggedInUser.avatar || profile}
    alt="Profile"
    className="h-[250px] w-[250px] rounded-full object-cover"
/>
        <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-semibold '>{loggedInUser.name}</h2>
        <h2 className='text-2xl font-semibold '>{loggedInUser.email}</h2>
        <Link to={"editProfile"} className='text-3xl font-bold border-2 border-blue-600 mt-10 px-6 py-3 rounded-2xl text-blue-100 hover:scale-110 hover:shadow-2xl shadow-blue-800'>Edit Profile</Link>
        </div>
            
        </div>
      
        <div className="w-2/3 px-12 py-8 rounded-2xl shadow-md">
  <h2 className="text-3xl font-bold mb-10">Profile Information</h2>

  <div className="space-y-6">
    <div className="flex justify-between border-b pb-4">
      <p className="text-gray-500 text-lg font-medium">Full Name</p>
      <p className="font-semibold text-lg">{loggedInUser.name}</p>
    </div>
    <div className="flex justify-between border-b pb-4">
      <p className="text-gray-500 text-lg font-medium">Email</p>
      <p className="font-semibold text-lg">{loggedInUser.email}</p>
    </div>
    <div className="flex justify-between border-b pb-4">
      <p className="text-gray-500 text-lg font-medium">Phone</p>
      <p className="font-semibold text-lg">{loggedInUser.phone}</p>
    </div>
    <div className="flex justify-between border-b pb-4">
      <p className="text-gray-500 text-lg font-medium w-1/2">Address</p>
      <p className="font-semibold text-lg">{loggedInUser.address}</p>
    </div>
    <div className="flex justify-between border-b pb-4">
      <p className="text-gray-500 text-lg font-medium">Role</p>
      <p className="font-semibold text-lg">{loggedInUser.role}</p>
    </div>
  </div>
</div>
    </div>
  )
}

export default Profile
