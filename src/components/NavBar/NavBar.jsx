import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useCart } from "../../cart/CartContext";
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import instagramLogo from "../../assets/socials/instagram.svg";
import tiktokLogo from "../../assets/socials/tiktok.svg";
import telegramLogo from "../../assets/socials/telegram.svg";
import mobileMenu from "../../assets/mobileBurger.svg"


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
                    <div className={styles.hideMobile}>
                        <LanguageSwitcher layout="inline" />
                    </div>
                    <button
                        className={styles.burger}
                        aria-label="Open menu"
                        aria-expanded={open}
                        onClick={() => setOpen(true)}
                    >
                        <img src={mobileMenu} alt="mobile menu" />
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
                    <div className={styles.mobileLang}>
                        <LanguageSwitcher layout="mobile" />
                    </div>

                    <div className={styles.socials} aria-label="Social links">
                        <a href="/" aria-label="Instagram" className={styles.icon}>
                            <img src={instagramLogo} alt="instagram logo" />
                        </a>
                        <a href="/" aria-label="TikTok" className={styles.icon}>
                            <img src={tiktokLogo} alt="tiktok logo" />
                        </a>
                        <a href="/" aria-label="Telegram" className={styles.icon}>
                            <img src={telegramLogo} alt="telegram logo" />
                        </a>
                    </div>
                </div>
            </aside>
        </header>
    );
}
