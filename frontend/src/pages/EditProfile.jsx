import React from "react";
import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

const EditProfile = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [avatar, setAvatar] = useState(null)
const [preview, setPreview] = useState("")

    const getUser = async () =>{
        const res = await API.get("user/profile")
        setEmail(res.data.email)
        setName(res.data.name)
        setEmail(res.data.email)
        setPhone(res.data.phone || "")
        setAddress(res.data.address || "")
        setPreview(res.data.avatar || "")
    }

    useEffect(() => {
      getUser()
    },[])
    

    const submitHandler =async (e) =>{
        try{
            e.preventDefault()

        const formData = {
            name,
            phone,
            address
        }

        await API.put("user/profile",formData)

        if (avatar) {
            await uploadAvatar()
        }

        toast.success("Profile Edited")
        navigate("/profile")
        
        setName("")
        setPhone("")
        setAddress("")
        }catch(error){
        toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    const handleAvatarChange = (e) => {

    const file = e.target.files[0]

    if (!file) return

    setAvatar(file)

    setPreview(URL.createObjectURL(file))
}

const uploadAvatar = async () => {

    if (!avatar) return

    const formData = new FormData()

    formData.append("avatar", avatar)

    const res = await API.put(
        "/user/avatar",
        formData
    )

    setPreview(res.data.avatar)
toast.success("Avatar Updated")
}
  return (
    <div  className="min-h-screen bg-slate-950 flex justify-center items-center p-8 overflow-y-auto">
      <div className="w-full max-w-3xl bg-slate-900 rounded-2xl shadow-2xl p-10 border border-slate-800">
        
        <h1 className="text-3xl font-bold text-white mb-8">
          Edit Profile
        </h1>

        <div className="flex items-center gap-6 mb-10">
          <img
          src={preview || "/default-avatar.png"}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
          />
          <input
              type="file"
              accept="image/*"
              hidden
              id="avatar"
              onChange={handleAvatarChange}
              />

          <label
    htmlFor="avatar"
    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer"
>
    Change Avatar
</label>
        </div>

        <form onSubmit={(e)=>{
            submitHandler(e)
        }} className="space-y-6">

          <div>
            <label className="block text-slate-300 mb-2">Full Name</label>
            <input
            value={name}
            onChange={(e)=>{
                setName(e.target.value)
            }}
              type="text"
              placeholder="Enter full name"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Email</label>
            <input
            value={email}
              type="email"
              disabled
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-gray-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Phone</label>
            <input
            value={phone}
            onChange={(e)=>{
                setPhone(e.target.value)
            }}
              type="text"
              placeholder="Enter phone number"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Address</label>
            <textarea
            value={address}
            onChange={(e)=>{
                setAddress(e.target.value)
            }}
              rows="3"
              placeholder="Enter address"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-slate-700 text-white hover:bg-slate-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProfile;