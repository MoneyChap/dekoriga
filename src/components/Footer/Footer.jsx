import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

import instagramLogo from "../../assets/socials/instagram.svg";
import tiktokLogo from "../../assets/socials/tiktok.svg";
import telegramLogo from "../../assets/socials/telegram.svg";

export default function Footer() {
    return (
        <footer className={styles.wrap}>
            <div className={styles.footer}>
                <div className={styles.grid}>
                    <div className={styles.brand}>
                        <div className={styles.logoWord}>dekoriga</div>
                        <p className={styles.tagline}>
                            Party & event decor rentals. Soft pastels, clean shapes, easy setup.
                        </p>
                        <ul className={styles.contacts}>
                            <li>
                                <a href="mailto:hello@dekoriga.com" className={styles.linkMuted}>
                                    hello@dekoriga.com
                                </a>
                            </li>
                            <li>
                                <span className={styles.linkMuted}>Riga, Latvia</span>
                            </li>
                        </ul>
                    </div>

                    <nav className={styles.col}>
                        <div className={styles.heading}>Shop</div>
                        <ul className={styles.list}>
                            <li><Link to="/catalog?type=balloons">Balloon sets</Link></li>
                            <li><Link to="/catalog?type=arches">Arches & backdrops</Link></li>
                            <li><Link to="/catalog?type=letters">Neon & letters</Link></li>
                            <li><Link to="/catalog?type=packages">Event packages</Link></li>
                        </ul>
                    </nav>

                    <nav className={styles.col}>
                        <div className={styles.heading}>Quick links</div>
                        <ul className={styles.list}>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/delivery">Delivery & setup</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </nav>

                    <div className={styles.socialCol}>
                        <div className={styles.heading}>Stay in touch</div>
                        <div className={styles.socials}>
                            <a
                                href="https://instagram.com"
                                aria-label="Instagram"
                                target="_blank"
                                rel="noreferrer"
                                className={styles.socialBtn}
                            >
                                <img src={instagramLogo} alt="Instagram" />
                                <span>Instagram</span>
                            </a>
                            <a
                                href="https://tiktok.com"
                                aria-label="TikTok"
                                target="_blank"
                                rel="noreferrer"
                                className={styles.socialBtn}
                            >
                                <img src={tiktokLogo} alt="TikTok" />
                                <span>TikTok</span>
                            </a>
                            <a
                                href="https://t.me"
                                aria-label="Telegram"
                                target="_blank"
                                rel="noreferrer"
                                className={styles.socialBtn}
                            >
                                <img src={telegramLogo} alt="Telegram" />
                                <span>Telegram</span>
                            </a>
                        </div>
                    </div>
                </div>

                <hr className={styles.rule} />

                <div className={styles.bottomRow}>
                    <p className={styles.copy}>
                        © {new Date().getFullYear()} Dekoriga. All rights reserved.
                    </p>
                    <nav className={styles.legal}>
                        <Link to="/privacy">Privacy</Link>
                        <span aria-hidden="true">•</span>
                        <Link to="/terms">Terms</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
