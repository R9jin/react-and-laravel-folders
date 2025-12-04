import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const apiUrl = "http://127.0.0.1:8000/api/products";

  useEffect(() => {
    fetch(`${apiUrl}/${id}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <Link to={`/edit/${product.id}`}>Edit</Link> | <Link to="/">Back to list</Link>
    </div>
  );
}

export default ProductView;
