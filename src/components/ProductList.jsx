// components/ProductList.jsx
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";
import PropTypes from "prop-types";

function ProductList({ products, addToCart }) {
  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductList;
