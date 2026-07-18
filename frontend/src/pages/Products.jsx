import React, { useEffect, useState } from "react";
import * as productAPI from "../api/productApi";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const getProducts = async()=>{
    const res = await productAPI.getProducts()
    setProducts(res.data)
  }

  useEffect(() => {
    getProducts()
  }, [])
  
  return (
    <div className="min-h-screen bg-slate-950 px-8 py-10">


      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Explore Products
          </h1>

          <p className="text-slate-400 mt-2">
            Discover the latest gadgets at TechSphere.
          </p>
        </div>

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search products..."
            className="bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 text-white outline-none focus:border-blue-600"
          />

          <select className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white">

            <option>All Categories</option>
            <option>Smartphone</option>
            <option>Laptop</option>
            <option>Tablet</option>
            <option>Headphones</option>
            <option>Gaming</option>
            <option>Accessories</option>

          </select>

        </div>

      </div>


      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

  {products.map((product) => (
    <div
      key={product._id}
      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-600 hover:-translate-y-2 transition duration-300 shadow-xl"
    >
    <img
      src={product.images?.[0]?.url}
      alt={product.name}
      className="w-full h-64 object-cover rounded-xl"
    />

      <div className="p-5">
        <span className="text-sm text-blue-400">
          {product.brand}
        </span>

        <h2 className="text-2xl font-semibold text-white mt-2">
          {product.name}
        </h2>

        <p className="text-slate-400 text-sm mt-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-5">
          <h3 className="text-2xl font-bold text-green-400">
            ₹{product.price}
          </h3>

          <span className="text-yellow-400">
            ⭐ 4.8
          </span>
        </div>

        <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 rounded-xl py-3 text-white font-semibold transition"
        onClick={()=>navigate(`/products/${product._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  ))}

</div>

    </div>
  );
};

export default Products;