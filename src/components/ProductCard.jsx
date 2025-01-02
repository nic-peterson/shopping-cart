// components/ProductCard.jsx
import PropTypes from "prop-types";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
function ProductCard({ product, addToCart }) {
  return (
    <div className={styles.card}>
      {/* Clicking on the image takes you to /shop/:id */}
      <Link to={`/shop/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className={styles.cardImage}
        />
      </Link>
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{product.title}</h3>
        <p className={styles.cardPrice}>${product.price}</p>
      </div>
      <button className={styles.cardButton} onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;
