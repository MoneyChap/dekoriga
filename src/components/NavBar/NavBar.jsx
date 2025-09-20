import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useCart } from "../../cart/CartContext";
import LanguageSwitcher from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';

export default function NavBar({ onCartClick }) {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const { count } = useCart();
    const { t } = useTranslation('navbar');

    // close drawer on route change
    useEffect(() => setOpen(false), [location.pathname]);

    // lock scroll when drawer is open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
    }, [open]);

    const NavLinks = ({ onClick }) => (
        <>
            <Link to="/" onClick={onClick}>{t("home")}</Link>
            <Link to="/catalog" onClick={onClick}>{t("catalog")}</Link>
            <Link to="/gallery" onClick={onClick}>{t("gallery")}</Link>
            <Link to="/contact" onClick={onClick}>{t("contact")}</Link>
        </>
    );

    return (
        <header className={styles.wrap}>
            <nav className={styles.nav}>
                <Link to="/" className={styles.brand} aria-label="Deko home">
                    <span className={styles.leaf} aria-hidden="true" />
                    <span className={styles.word}>deko</span>
                </Link>

                <div className={styles.links}>
                    <NavLinks />
                </div>

                <div className={styles.actions}>
                    <div className={styles.lang} role="group" aria-label="Language">
                        <button className={styles.langBtn} aria-pressed="true">LV</button>
                        <button className={styles.langBtn}>EN</button>
                    </div>
                    <LanguageSwitcher />
                    <button
                        className={styles.burger}
                        aria-label="Open menu"
                        aria-expanded={open}
                        onClick={() => setOpen(true)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <button className={styles.cartBtn} onClick={onCartClick} aria-label="Open cart">
                        🛒
                        {count > 0 && <span className={styles.badge}>{count}</span>}
                    </button>
                </div>
            </nav>

            {/* overlay */}
            <button
                className={`${styles.overlay} ${open ? styles.show : ""}`}
                aria-hidden={!open}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
            />

            {/* drawer */}
            <aside className={`${styles.drawer} ${open ? styles.open : ""}`} aria-hidden={!open}>
                <button className={styles.close} onClick={() => setOpen(false)} aria-label="Close menu">
                    ×
                </button>

                <div className={styles.drawerLinks}>
                    <NavLinks onClick={() => setOpen(false)} />
                </div>

                <div className={styles.drawerFooter}>
                    <div className={styles.langMobile}>
                        <button className={styles.langBtn} aria-pressed="true">LV</button>
                        <button className={styles.langBtn}>EN</button>
                    </div>

                    <div className={styles.socials} aria-label="Social links">
                        <a href="/" aria-label="Instagram" className={styles.icon}>
                            <svg viewBox="0 0 24 24"><path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-5C7.03 2 2 7.03 2 12s5.03 10 10 10 10-4.03 10-10S16.97 2 12 2zm6 4a1 1 0 110 2 1 1 0 010-2z" /></svg>
                        </a>
                        <a href="/" aria-label="TikTok" className={styles.icon}>
                            <svg viewBox="0 0 24 24"><path d="M14 3v8.2a4.2 4.2 0 11-3-1V7a7 7 0 004 1.2V3h-1z" /></svg>
                        </a>
                        <a href="/" aria-label="YouTube" className={styles.icon}>
                            <svg viewBox="0 0 24 24"><path d="M22 8.2a3 3 0 00-2.1-2.1C18.2 5.5 12 5.5 12 5.5s-6.2 0-7.9.6A3 3 0 002 8.2 31 31 0 002 12a31 31 0 000 3.8 3 3 0 002.1 2.1c1.7.6 7.9.6 7.9.6s6.2 0 7.9-.6A3 3 0 0022 15.8 31 31 0 0022 12a31 31 0 000-3.8zM10 14.7V9.3l4.5 2.7L10 14.7z" /></svg>
                        </a>
                        <a href="/" aria-label="Telegram" className={styles.icon}>
                            <svg viewBox="0 0 24 24"><path d="M9.5 13.2l6.8-4.4-8 3.5L3 11.4l18-7.4L17.6 20l-6.4-5.1-.7 2.9-2.3-4.6 1.3-.4z" /></svg>
                        </a>
                    </div>
                </div>
            </aside>
        </header>
    );
}
