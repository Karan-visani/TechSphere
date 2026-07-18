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
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const navigate = useNavigate()

  const {createProduct} = useContext(productContext)

  const submitHandler =async (e) =>{
    try{
      e.preventDefault()
    
        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("brand", brand);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("isFeatured", isFeatured);

        if (image) {
            formData.append("image", image);
        }

        await createProduct(formData);
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


<div className="space-y-3">

  <label className="block text-slate-300 font-medium">
    Product Image
  </label>

  <label
    htmlFor="productImage"
    className="flex flex-col items-center justify-center w-full h-64 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-800/60 cursor-pointer hover:border-blue-500 hover:bg-slate-800 transition-all duration-300"
  >
    {preview ? (
      <img
        src={preview}
        alt="Preview"
        className="w-full h-full object-cover rounded-2xl"
      />
    ) : (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14 text-slate-500 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 15l4-4a2 2 0 012.828 0L14 15m-2-2l1-1a2 2 0 012.828 0L21 17M7 7h.01M4 5h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z"
          />
        </svg>

        <p className="text-white font-medium">
          Click to upload product image
        </p>

        <p className="text-sm text-slate-400 mt-1">
          PNG, JPG, JPEG (Max 5MB)
        </p>
      </>
    )}
  </label>

  <input
    id="productImage"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files[0];

      if (!file) return;

      setImage(file);
      setPreview(URL.createObjectURL(file));
    }}
  />

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