import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productContext } from "../context/ProductProvider";
import toast from "react-hot-toast";
import * as productAPI from "../api/productApi";


const EditProduct = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { getProduct, updateProduct } = useContext(productContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const product = await productAPI.getProduct(id);

      setName(product.data.name);
      setDescription(product.data.description);
      setBrand(product.data.brand);
      setCategory(product.data.category);
      setPrice(product.data.price);
      setStock(product.data.stock);
      setIsFeatured(product.data.isFeatured);
      
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name,
        description,
        brand,
        category,
        price: Number(price),
        stock: Number(stock),
        isFeatured,
      };

      await productAPI.updateProduct(id, formData);

      toast.success("Product Updated Successfully");

      navigate("/adminProducts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10 px-6">

      <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-10">

        <h1 className="text-4xl font-bold text-white mb-8">
          Edit Product
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">

          {/* Name */}

          <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Product Name"
            className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
          />

          {/* Description */}

          <textarea
            rows="5"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder="Description"
            className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
          />

          {/* Brand */}

          <input
            type="text"
            value={brand}
            onChange={(e)=>setBrand(e.target.value)}
            placeholder="Brand"
            className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
          />

          {/* Category */}

          <input
            type="text"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            placeholder="Category"
            className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
          />

          {/* Price */}

          <input
            type="number"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            placeholder="Price"
            className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
          />

          {/* Stock */}

          <input
            type="number"
            value={stock}
            onChange={(e)=>setStock(e.target.value)}
            placeholder="Stock"
            className="w-full px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white"
          />

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e)=>setIsFeatured(e.target.checked)}
            />

            <span className="text-white">
              Featured Product
            </span>

          </div>

          <button
            className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Update Product
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditProduct;