import React, { createContext, useState } from 'react'
import API from '../api/axios'

export const authContext = createContext()


const AuthProvider = ({children}) => {

const [user, setUser] = useState(null)

const register = async(formData) =>{
    const res =await API.post("/auth/register",formData)

    setUser(res.data.user)
    return res.data
}
const login = async(formData) =>{
    const res =await API.post("/auth/login",formData)

    setUser(res.data.user)
    return res.data
}
const logout = async(formData) =>{
    await API.post("/auth/logout")

    setUser(null)
}
    return (
    <authContext.Provider value={{login,register,logout}}>
        {children}
    </authContext.Provider>
  )
}

export default AuthProvider
