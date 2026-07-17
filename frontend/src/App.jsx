import React from 'react'
import Navbar from './components/Navbar'
import{ Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Products from './pages/Products'
import AddProduct from './pages/AddProducts'
import ProductDetails from './pages/ProductDetails'
import EditProduct from './pages/EditProduct'

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
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/add' element={<AddProduct/>}/>
        <Route path='/products/details' element={<ProductDetails/>}/>
        <Route path='/products/edit' element={<EditProduct/>}/>
      </Routes>
    </div>
  )
}

export default App
