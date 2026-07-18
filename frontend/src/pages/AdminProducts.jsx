import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../context/ProductProvider";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as productAPI from "../api/productApi";
import toast from "react-hot-toast";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([])

  const getProduct = async ()=>{
    const res = await productAPI.getProducts();    
    setProducts(res.data)
  }

  const {
    deleteProduct,
  } = useContext(productContext);

  useEffect(() => {
    getProduct();
  }, []);

  const handleDelete = async (id) => {

    await productAPI.deleteProduct(id);
    await getProduct()
    toast.success("Product Deleted Successfully")
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Products
          </h1>

          <p className="text-slate-400 mt-2">
            Manage all products
          </p>
        </div>

        <button
          onClick={() => navigate("/add")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-white"
        >
          <FaPlus />
          Add Product
        </button>

      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search products..."
        className="w-full md:w-80 mb-6 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none"
      />

      {/* Table */}

      <div className="overflow-x-auto bg-slate-950 rounded-2xl border border-slate-800">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="text-left p-4 text-slate-300">
                Image
              </th>

              <th className="text-left p-4 text-slate-300">
                Product
              </th>

              <th className="text-left p-4 text-slate-300">
                Brand
              </th>

              <th className="text-left p-4 text-slate-300">
                Category
              </th>

              <th className="text-left p-4 text-slate-300">
                Price
              </th>

              <th className="text-left p-4 text-slate-300">
                Stock
              </th>

              <th className="text-center p-4 text-slate-300">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product._id}
                className="border-t border-slate-800 hover:bg-slate-800 transition"
              >

                <td className="p-4">

                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />        

                </td>

                <td className="p-4 text-white font-medium">
                  {product.name}
                </td>

                <td className="p-4 text-slate-300">
                  {product.brand}
                </td>

                <td className="p-4 text-slate-300">
                  {product.category}
                </td>

                <td className="p-4 text-green-400 font-semibold">
                  ₹{product.price}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      product.stock > 0
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {product.stock}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-4">

                    <button
                      onClick={() =>
                        navigate(`/edit/${product._id}`)
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 p-3 rounded-lg text-white"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 hover:bg-red-700 p-3 rounded-lg text-white"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminProducts;