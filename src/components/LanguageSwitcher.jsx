import { useEffect, useState } from 'react';
import i18n from '../i18n';

const LanguageSwitcher = () => {
    const [lang, setLang] = useState(i18n.language || 'en');

    useEffect(() => {
        const handler = (lng) => setLang(lng);
        i18n.on('languageChanged', handler);
        return () => i18n.off('languageChanged', handler);
    }, []);

    const changeLang = (e) => {
        const next = e.target.value;
        i18n.changeLanguage(next);
        // i18next-browser-languagedetector will cache in localStorage automatically
    };

    return (
        <select value={lang} onChange={changeLang} aria-label="Language">
            <option value="lv">LV</option>
            <option value="en">EN</option>
            <option value="ru">RU</option>
        </select>
    );
};

export default LanguageSwitcher;
