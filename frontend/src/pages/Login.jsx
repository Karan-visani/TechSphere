import React, { useContext, useState } from 'react'
import techsphere from '../assets/TechSphere.png'
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthProvider';
import {toast} from 'react-hot-toast'

const Login = () => {
  const {login} = useContext(authContext)
  const navigate = useNavigate() 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    const submitHandler = async(e) =>{
      try{
        e.preventDefault()
      const formData = {
        email,
        password
      }      

      await login(formData)
        toast.success("Logged in Successfully")
      navigate("/dashboard")
      }catch(error){
        toast.error(error.response?.data?.message || "Something went wrong")
      }
    }
  
  return (
    <div className=' min-h-[85vh] flex mx-10'>
        <div className='w-[62%] flex p-12'>
            <img src={techsphere} className=' lg:object-fit rounded-2xl' alt="" />
        </div>

        <div className='w-[38%] flex justify-center items-center'>
        <form onSubmit={submitHandler} className='w-full max-w-[90%] flex flex-col gap-4 bg-slate-900/60 p-5 rounded-3xl border border-blue-900 hover:shadow-2xl shadow-blue-800/60'>
        <div className='flex flex-col items-start gap-2'>
        <h2 className='text-2xl font-bold'>Welcome Back!</h2>
        <p className='text-md text-gray-400 flex justify-start'>Login to continue shopping....</p>
        </div>
        <div className='flex flex-col gap-4 items-center mt-3'>
        <div className='w-full flex flex-col gap-2'>
        <label className='text-lg ms-2 text-gray-200'>Email :</label>
        <input value={email} onChange={(e)=>{
        setEmail(e.target.value)
        }} className='border-2 border-slate-800 text-lg text-gray-300  rounded-2xl px-4 py-2 outline-none bg-slate-800 focus:border-blue-900 hover:border-blue-900 w-full' type="text" name="email" id="email" placeholder='Enter your email'/>    
        </div>
        <div className='w-full flex flex-col gap-2'>
        <label className='text-lg ms-2 text-gray-200'>Password :</label>
        <input value={password} onChange={(e)=>{
        setPassword(e.target.value)
        }} className='border-2 border-slate-800 text-lg text-gray-300  rounded-2xl px-4 py-2 outline-none bg-slate-800 focus:border-blue-900 hover:border-blue-900 w-full' type="password" name="password" id="password" placeholder='Enter your password'/> 
        </div>
        <button type='submit' className='text-lg bg-blue-600 w-[70%] rounded-lg p-2 hover:scale-105 mt-3 font-semibold'>Login</button> 
        <p className='text-md text-gray-200 font-medium'>Dont have an account? <Link to={"/registration"} className='text-blue-500 hover:text-blue-700'>Sign Up</Link></p> 

        <div className="flex items-center w-full gap-2 mt-2">
        <div className="h-px flex-1 bg-slate-700"></div>

        <span className="text-slate-400 text-sm whitespace-nowrap">
          or continue with
        </span>

        <div className="h-px flex-1 bg-slate-700"></div>
        </div>

        <div className='hover:scale-110 bg-slate-800 w-[30%] p-2 rounded-xl flex items-center'>
          <h2><FcGoogle size={28} /></h2>
          <h2 className='text-md ms-2 font-medium '>Google</h2>
        </div>
        </div>
        </form>    
        </div>
    </div>
  )
}

export default Login
