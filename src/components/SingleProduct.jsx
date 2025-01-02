import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./SingleProduct.module.css";

function SingleProduct({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingle = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSingle();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productInfo}>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.description}>{product.description}</p>
        <button
          className={styles.addToCartButton}
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

SingleProduct.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default SingleProduct;
