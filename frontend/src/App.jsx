import React from 'react'
import Navbar from './components/Navbar'
import{ Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'

const App = () => {
  return (
    <div className='min-h-screen w-full overflow-x-hidden bg-slate-950 text-white'>
      <Navbar/>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/profile/editProfile' element={<EditProfile/>}/>
      </Routes>
    </div>
  )
}

export default App
