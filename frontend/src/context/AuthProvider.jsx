import React, { createContext, useContext, useEffect, useState } from 'react'
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

const currentUser = async ()=>{
    try{
        const res = await API.get("/auth/me")

    setUser(res.data)
    }catch(error){
        setUser(null)
    }
}


    useEffect(() => {
        currentUser()
    }, [])
    return (
    <authContext.Provider value={{login,register,logout,user}}>
        {children}
    </authContext.Provider>
  )
}

export default AuthProvider
