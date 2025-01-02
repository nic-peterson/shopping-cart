import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import PropTypes from "prop-types";
function Navbar({ cartItemsCount }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Buck Clone
        </Link>
      </div>

      <div className={styles.navLinks}>
        <Link className={styles.link} to="/shop">
          Shop
        </Link>
        <Link className={styles.link} to="/cart">
          Cart
          {cartItemsCount > 0 && (
            <span className={styles.cartBadge}>{cartItemsCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  cartItemsCount: PropTypes.number.isRequired,
};

export default Navbar;
