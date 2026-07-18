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
  const [image, setImage] = useState(null);
const [preview, setPreview] = useState("");

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
      setPreview(product.data.images?.[0]?.url || "");
      
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
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