import i18n from "../i18n";
import { useEffect } from "react";

export default function LanguageSwitcher() {
    const langs = [
        { code: "lv", label: "LV" },
        { code: "en", label: "EN" }
    ];

    useEffect(() => {
        document.documentElement.lang = i18n.resolvedLanguage || "en";
    }, [i18n.resolvedLanguage]);

    const setLang = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem("i18nextLng", lng);
    };

    const current = i18n.resolvedLanguage;

    return (
        <div role="group" aria-label="Language">
            {langs.map(l => (
                <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    aria-pressed={current === l.code}
                    style={{ marginRight: 8 }}
                >
                    {l.label}
                </button>
            ))}
        </div>
    );
}
