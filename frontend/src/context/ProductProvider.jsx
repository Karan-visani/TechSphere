import React, { useState } from 'react'
import { createContext } from 'react'
import * as productAPI from "../api/productApi";


export const productContext = createContext()
const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    const getProduct = async () =>{
        try{
            setLoading(true);

            const res = await productAPI.getProducts();
            setProducts(res.data)
        }catch(error){
          console.log(error);
        }
    }

    const createProduct = async (formData) =>{
            const res = await productAPI.createProduct(formData);
            await productAPI.getProducts()
            return res.data
    }

    const updateProduct = async (id,formData) =>{
      const res = await productAPI.updateProducts(id,formData);
            await productAPI.getProducts()
            return res.data
    }

    const deleteProduct = async(id) =>{
      await productAPI.deleteProducts(id)
      await productAPI.getProducts()
    }
  return (
    <productContext.Provider value={{getProduct,createProduct,updateProduct,deleteProduct,products,loading}}>
      {children}
    </productContext.Provider>
  )
}

export default ProductProvider
