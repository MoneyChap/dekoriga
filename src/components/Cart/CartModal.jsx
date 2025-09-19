import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../cart/CartContext";
import styles from "./CartModal.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function CartModal({ open, onClose }) {
    const { items, inc, dec, remove, subtotal, clear } = useCart();
    const { t, i18n } = useTranslation(["cart", "products"]);

    const fmt = (amt) =>
        new Intl.NumberFormat(i18n.language, { style: "currency", currency: "EUR" }).format(amt);

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
                        aria-label={t("dialog_aria")}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.25 }}
                    >
                        <header className={styles.header}>
                            <h3 className={styles.title}>{t("title")}</h3>
                            <button className={styles.close} onClick={onClose} aria-label="Close">×</button>
                        </header>

                        {items.length === 0 ? (
                            <p className={styles.empty}>{t("cart:empty")}</p>
                        ) : (
                            <ul className={styles.list}>
                                {items.map((it) => {
                                    const title = t(`products:${it.id}.title`, { defaultValue: it.title || it.id });
                                    return (
                                        <li key={it.id} className={styles.row}>
                                            <img src={it.image} alt="" className={styles.thumb} />
                                            <div className={styles.info}>
                                                <div className={styles.lineTop}>
                                                    <span className={styles.itemTitle}>{title}</span>
                                                    <button className={styles.remove} onClick={() => remove(it.id)}>
                                                        {t("cart:remove")}
                                                    </button>
                                                </div>
                                                <div className={styles.lineBottom}>
                                                    <div className={styles.qty}>
                                                        <button onClick={() => dec(it.id)} className={styles.qtyBtn} aria-label={t("cart:decrease")}>–</button>
                                                        <span className={styles.qtyNum}>{it.qty}</span>
                                                        <button onClick={() => inc(it.id)} className={styles.qtyBtn} aria-label={t("cart:increase")}>+</button>
                                                    </div>
                                                    <span className={styles.price}>{fmt(it.price * it.qty)}</span>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}

                        <footer className={styles.footer}>
                            <div className={styles.subtotal}>
                                <span>{t("subtotal")}</span>
                                <strong>{fmt(subtotal)}</strong>
                            </div>
                            <div className={styles.actions}>
                                <button className={styles.btnGhost} onClick={clear} disabled={!items.length}>
                                    {t("clear")}
                                </button>
                                <Link to="/checkout" className={styles.btnSolid} onClick={onClose}>
                                    {t("checkout")}
                                </Link>
                            </div>
                        </footer>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
