// components/Cart.jsx
import PropTypes from "prop-types";
import styles from "./Cart.module.css";

function Cart({ cartItems, removeFromCart, updateQuantity }) {
  if (cartItems.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        Your cart is empty.
      </h2>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <div className={styles.itemDetails}>
            <div className={styles.itemTitle}>{item.title}</div>
            <div className={styles.itemPrice}>${item.price}</div>
          </div>

          <div>
            <input
              type="number"
              className={styles.quantityInput}
              value={item.quantity}
              onChange={(e) => {
                const newQty = parseInt(e.target.value, 10);
                if (newQty <= 0) {
                  removeFromCart(item.id);
                } else {
                  updateQuantity(item.id, newQty);
                }
              }}
            />
            <button
              className={styles.removeButton}
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default Cart;
