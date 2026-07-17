import React, { useContext, useEffect, useState } from "react";
import { FaStar, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";
import { productContext } from "../context/ProductProvider";
import * as productAPI from "../api/productApi";
import { Link, useParams } from "react-router-dom";


const ProductDetails = () => {
  const [product, setProduct] = useState([])
  const { id } = useParams();

  const getProduct = async() =>{
    const res = await productAPI.getProduct(id);
    setProduct(res.data)
  }

  useEffect(() => {
    getProduct()

  }, [])
  

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10">
      <div className="max-w-7xl mx-auto">


        <p className="text-slate-400 mb-8">
          <Link to={'/home'}>Home</Link> / <Link to={'/products'}>Products</Link> / <span className="text-white">iPhone 16 Pro</span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">


          <div>

            <div className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800">

              <img
                src="https://placehold.co/700x700"
                alt=""
                className="w-full h-[550px] object-cover"
              />

            </div>


            <div className="flex gap-4 mt-5">

              {[1, 2, 3, 4].map((item) => (
                <img
                  key={item}
                  src="https://placehold.co/120"
                  alt=""
                  className="w-24 h-24 rounded-xl border border-slate-700 cursor-pointer hover:border-blue-500 object-cover"
                />
              ))}

            </div>

          </div>


          <div>

            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
              {product.brand}
            </span>

            <h1 className="text-5xl font-bold text-white mt-5">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-6">

              <div className="flex items-center gap-1 text-yellow-400">

                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

              </div>

              <span className="text-slate-400">
                (4.9 Ratings)
              </span>

            </div>

            <h2 className="text-5xl text-green-400 font-bold mt-8">
              ₹{product.price}
            </h2>

            <div className="mt-8">

              <p className="text-slate-300 leading-8">
                {product.description}
              </p>

            </div>


            <div className="grid grid-cols-2 gap-5 mt-10">

              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">

                <p className="text-slate-400">
                  Category
                </p>

                <h3 className="text-white font-semibold mt-2">
                  {product.category}
                </h3>

              </div>

              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">

                <p className="text-slate-400">
                  Stock
                </p>

                <h3 className="text-green-400 font-semibold mt-2">
                  <h3>{product.stock > 0 ? `In Stock (${product.stock})` : <span className="text-red-600">Out of Stock</span>}</h3>
                </h3>

              </div>

            </div>


            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-4 text-slate-300">

                <FaTruck className="text-blue-500 text-xl" />

                <span>
                  Free Shipping Across India
                </span>

              </div>

              <div className="flex items-center gap-4 text-slate-300">

                <FaShieldAlt className="text-green-500 text-xl" />

                <span>
                  1 Year Official Warranty
                </span>

              </div>

              <div className="flex items-center gap-4 text-slate-300">

                <FaUndo className="text-yellow-500 text-xl" />

                <span>
                  7 Days Easy Return
                </span>

              </div>

            </div>


            <div className="flex gap-5 mt-12">

              <button className="flex-1 bg-blue-600 hover:bg-blue-700 transition rounded-2xl py-4 text-white font-semibold text-lg">
                Add to Cart
              </button>

              <button className="flex-1 bg-slate-800 hover:bg-slate-700 transition rounded-2xl py-4 text-white font-semibold text-lg">
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;