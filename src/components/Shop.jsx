import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import PropTypes from "prop-types";

function Shop({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return <ProductList products={products} addToCart={addToCart} />;
}

Shop.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default Shop;
