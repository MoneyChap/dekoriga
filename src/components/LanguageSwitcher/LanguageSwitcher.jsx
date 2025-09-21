// src/components/LanguageSwitcher/LanguageSwitcher.jsx
import { useEffect, useState, memo } from "react";
import i18n from "../../i18n";
import styles from "./LanguageSwitcher.module.css";

const LANGS = [
    { code: "lv", label: "LV" },
    { code: "en", label: "EN" },
    { code: "ru", label: "RU" }
];

/**
 * layout: "inline" (header) | "mobile" (drawer)
 */
function LanguageSwitcher({ layout = "inline", className = "" }) {
    const [lang, setLang] = useState((i18n.language || "en").split("-")[0]);

    useEffect(() => {
        const handler = (lng) => setLang((lng || "en").split("-")[0]);
        i18n.on("languageChanged", handler);
        return () => i18n.off("languageChanged", handler);
    }, []);

    const changeLang = (code) => {
        if (code !== lang) i18n.changeLanguage(code);
    };

    return (
        <div
            className={`${styles.group} ${layout === "mobile" ? styles.groupMobile : styles.groupInline} ${className}`}
            role="group"
            aria-label="Language"
        >
            {LANGS.map(({ code, label }) => (
                <button
                    key={code}
                    type="button"
                    className={`${styles.btn} ${layout === "mobile" ? styles.btnMobile : styles.btnInline}`}
                    aria-pressed={lang === code}
                    onClick={() => changeLang(code)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

export default memo(LanguageSwitcher);
