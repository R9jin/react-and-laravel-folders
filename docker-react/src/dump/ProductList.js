import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductList.css"; 

function ProductList() {
  const [products, setProducts] = useState([]);
  const apiUrl = "http://127.0.0.1:8000/api/products";

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
    fetch(`${apiUrl}/${id}`, { method: "DELETE" }).then(() =>
      setProducts(products.filter((p) => p.id !== id))
    );
  };

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="product-list">
          {products.map((p) => (
            <li key={p.id} className="product-item">
              <div className="product-info">
                <strong>{p.name}</strong>
                <span>{p.description}</span>
                <span>${p.price}</span>
                <span>Stock: {p.stock}</span>
              </div>
              <div className="product-actions">
                <Link className="btn view" to={`/view/${p.id}`}>View</Link>
                <Link className="btn edit" to={`/edit/${p.id}`}>Edit</Link>
                <button className="btn delete" onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
