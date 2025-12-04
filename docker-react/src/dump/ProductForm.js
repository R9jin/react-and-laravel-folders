import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "" });
  const apiUrl = "http://127.0.0.1:8000/api/products";

  useEffect(() => {
    if (id) {
      fetch(`${apiUrl}/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data))
        .catch(console.error);
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
      }),
    })
      .then(() => navigate("/"))
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        step="0.01"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        name="stock"
        placeholder="Stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        required
      />
      <button type="submit">{id ? "Update" : "Add"} Product</button>
    </form>
  );
}

export default ProductForm;
