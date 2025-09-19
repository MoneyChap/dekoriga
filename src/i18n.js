import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en/common.json";
import lv from "./locales/lv/common.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { common: en },
            lv: { common: lv }
        },
        fallbackLng: "en",
        supportedLngs: ["en", "lv"],
        ns: ["common"],
        defaultNS: "common",
        detection: {
            order: ["path", "querystring", "localStorage", "navigator"],
            caches: ["localStorage"]
        },
        interpolation: {
            escapeValue: false,
            format: (value, format, lng) => {
                if (format === "currency") {
                    const currency = "EUR"; // change if needed
                    return new Intl.NumberFormat(lng, { style: "currency", currency }).format(value);
                }
                return value;
            }
        }
    });

export default i18n;
