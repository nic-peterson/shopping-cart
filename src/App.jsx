import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  // 1) Define cart sate in App
  const [cartItems, setCartItems] = useState([]);

  // 2) Handler: add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if product already in cart
      const itemInCart = prevItems.find((item) => item.id === product.id);
      if (itemInCart) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // otherwise, add new item to cart
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // 3) Handler: remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 4) Handler: update item quantity
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  return (
    <Router>
      <Navbar
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Passing addToCart to Shop so ProductCards can call it */}
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        {/* Optional Single Product Route */}
        <Route
          path="/shop/:id"
          element={<SingleProduct addToCart={addToCart} />}
        />
        {/* Pass cartItems + handlers to Cart */}
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
