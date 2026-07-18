import API from "../api/axios";

export const getProducts = () => API.get("/products");

export const getProduct = (id) => API.get(`/products/${id}`);

export const createProduct = (data) =>
    API.post("/products", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const updateProduct = (id, data) =>
    API.put(`/products/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const deleteProduct = (id) =>
    API.delete(`/products/${id}`);