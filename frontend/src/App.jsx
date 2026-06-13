import React from 'react'
import Navbar from './components/Navbar'
import{ Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Registration from './pages/Registration'

const App = () => {
  return (
    <div className='min-h-screen w-full overflow-x-hidden bg-slate-950 text-white'>
      <Navbar/>
      <Routes>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registration' element={<Registration/>}/>
      </Routes>
    </div>
  )
}

export default App
