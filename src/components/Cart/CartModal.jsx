import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../cart/CartContext";
import styles from "./CartModal.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function CartModal({ open, onClose }) {
    const { items, inc, dec, remove, subtotal, clear } = useCart();

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className={styles.overlay}
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                    <motion.div
                        className={styles.modal}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Shopping cart"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.25 }}
                    >
                        <header className={styles.header}>
                            <h3 className={styles.title}>Your cart</h3>
                            <button className={styles.close} onClick={onClose} aria-label="Close">×</button>
                        </header>

                        {items.length === 0 ? (
                            <p className={styles.empty}>Your cart is empty.</p>
                        ) : (
                            <ul className={styles.list}>
                                {items.map((it) => (
                                    <li key={it.id} className={styles.row}>
                                        <img src={it.image} alt="" className={styles.thumb} />
                                        <div className={styles.info}>
                                            <div className={styles.lineTop}>
                                                <span className={styles.itemTitle}>{it.title}</span>
                                                <button className={styles.remove} onClick={() => remove(it.id)}>Remove</button>
                                            </div>
                                            <div className={styles.lineBottom}>
                                                <div className={styles.qty}>
                                                    <button onClick={() => dec(it.id)} className={styles.qtyBtn} aria-label="Decrease">–</button>
                                                    <span className={styles.qtyNum}>{it.qty}</span>
                                                    <button onClick={() => inc(it.id)} className={styles.qtyBtn} aria-label="Increase">+</button>
                                                </div>
                                                <span className={styles.price}>€{(it.price * it.qty).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <footer className={styles.footer}>
                            <div className={styles.subtotal}>
                                <span>Subtotal</span>
                                <strong>€{subtotal.toFixed(2)}</strong>
                            </div>
                            <div className={styles.actions}>
                                <button className={styles.btnGhost} onClick={clear} disabled={!items.length}>Clear</button>
                                <Link to="/checkout" className={styles.btnSolid} onClick={onClose}>
                                    Checkout
                                </Link>
                            </div>
                        </footer>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
