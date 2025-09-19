import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { CartProvider } from "./cart/CartContext";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./components/HomePage/HomePage";
import CatalogSection from "./components/CatalogSection/CatalogSection";
import ItemPage from "./components/ItemPage/ItemPage";
import CartModal from "./components/Cart/CartModal";
import CheckoutPage from "./components/CheckoutPage/CheckoutPage";
import ThankYou from "./components/CheckoutPage/ThankYouPage";

function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><HomePage /></Page>} />
        <Route path="/catalog" element={<Page><CatalogSection /></Page>} />
        <Route path="/item/:id" element={<Page><ItemPage /></Page>} />
        <Route path="/checkout" element={<Page><CheckoutPage /></Page>} />
        <Route path="/thank-you" element={<Page><ThankYou /></Page>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <NavBar onCartClick={() => setCartOpen(true)} />
          <AnimatedRoutes />
          <CartModal open={cartOpen} onClose={() => setCartOpen(false)} />
        </div>
      </Router>
    </CartProvider>
  );
}
