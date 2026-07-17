import React, { useContext, useState } from "react";
import {useNavigate} from "react-router-dom"
import {productContext} from "../context/ProductProvider"
import toast from "react-hot-toast";


const AddProduct = () => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [ratings, setRatings] = useState("")
  const [isFeatured, setIsFeatured] = useState(false)
  const navigate = useNavigate()

  const {createProduct} = useContext(productContext)

  const submitHandler =async (e) =>{
    try{
      e.preventDefault()
    
        const formData = {
          name,
          description,
          brand,
          category,
          price,
          stock,
          isFeatured
        }
        await createProduct(formData)
        toast.success("Product Added Successfully")
        navigate("/adminProducts")
  }catch(error){
    console.log(error);
    
  }
  }


  return (
    <div className="min-h-screen bg-slate-950 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-10">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white">
            Add New Product
          </h1>

          <p className="text-slate-400 mt-2">
            Create a new product for your TechSphere store.
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-7">


          <div>
            <label className="block mb-2 text-slate-300 font-medium">
              Product Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e)=>{
                setName(e.target.value)
              }}
              placeholder="Enter product name"
              className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-600"
            />
          </div>


          <div>
            <label className="block mb-2 text-slate-300 font-medium">
              Description
            </label>

            <textarea
              rows="5"
              value={description}
              onChange={(e)=>{
                setDescription(e.target.value)
              }}
              placeholder="Write product description..."
              className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none resize-none focus:border-blue-600"
            />
          </div>


          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 text-slate-300 font-medium">
                Brand
              </label>

              <input
                type="text"
                value={brand}
              onChange={(e)=>{
                setBrand(e.target.value)
              }}
                placeholder="Apple"
                className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300 font-medium">
                Category
              </label>

              <select className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-600"
              value={category}
              onChange={(e)=>{
                setCategory(e.target.value)
              }}>

                <option>Select Category</option>

                <option>Smartphone</option>

                <option>Laptop</option>

                <option>Tablet</option>

                <option>Headphones</option>

                <option>Smart Watch</option>

                <option>Gaming</option>

                <option>Accessories</option>

              </select>

            </div>

          </div>


          <div className="grid grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 text-slate-300 font-medium">
                Price (₹)
              </label>

              <input
                type="number"
                value={price}
              onChange={(e)=>{
                setPrice(e.target.value)
              }}
                placeholder="99999"
                className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block mb-2 text-slate-300 font-medium">
                Stock
              </label>

              <input
                type="number"
                value={stock}
              onChange={(e)=>{
                setStock(e.target.value)
              }}
                placeholder="20"
                className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-600"
              />
            </div>

          </div>


          <div className="flex items-center justify-between bg-slate-800 rounded-xl p-5 border border-slate-700">

            <div>

              <h2 className="text-lg text-white font-semibold">
                Featured Product
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                Featured products appear on the homepage.
              </p>

            </div>

            <input
              type="checkbox"
              checked={isFeatured}
              onChange={() => setIsFeatured(!isFeatured)}
              className="w-6 h-6 accent-blue-600 cursor-pointer"
            />

          </div>


          <div>

            <label className="block mb-2 text-slate-300 font-medium">
              Product Images
            </label>

            <div className="border-2 border-dashed border-slate-700 rounded-2xl p-10 flex flex-col justify-center items-center text-slate-400 hover:border-blue-600 transition">

              <p className="text-lg">
                Drag & Drop Images Here
              </p>

              <p className="text-sm mt-2">
                or
              </p>

              <button
                type="button"
                className="mt-4 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
              >
                Browse Files
              </button>

            </div>

          </div>


          <div className="flex justify-end gap-5 pt-5">

            <button
              type="button"
              className="px-8 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition"
              onClick={()=>navigate("/products")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Add Product
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default AddProduct;