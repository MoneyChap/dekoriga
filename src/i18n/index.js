import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// import bundled JSON resources
import en_navbar from './locales/en/navbar.json';
import en_cart from './locales/en/cart.json';
import en_home from './locales/en/home.json';
import en_catalog from './locales/en/catalog.json';
import en_item from './locales/en/item.json';
import en_checkout from './locales/en/checkout.json';
import en_validation from './locales/en/validation.json';
import en_common from './locales/en/common.json';
import en_thankyou from './locales/en/thankyou.json';
import en_products from './locales/en/products.json';

import lv_navbar from './locales/lv/navbar.json';
import lv_cart from './locales/lv/cart.json';
import lv_home from './locales/lv/home.json';
import lv_catalog from './locales/lv/catalog.json';
import lv_item from './locales/lv/item.json';
import lv_checkout from './locales/lv/checkout.json';
import lv_validation from './locales/lv/validation.json';
import lv_common from './locales/lv/common.json';
import lv_thankyou from './locales/lv/thankyou.json';
import lv_products from './locales/lv/products.json';

import ru_navbar from './locales/ru/navbar.json';
import ru_cart from './locales/ru/cart.json';
import ru_home from './locales/ru/home.json';
import ru_catalog from './locales/ru/catalog.json';
import ru_item from './locales/ru/item.json';
import ru_checkout from './locales/ru/checkout.json';
import ru_validation from './locales/ru/validation.json';
import ru_common from './locales/ru/common.json';
import ru_thankyou from './locales/ru/thankyou.json';
import ru_products from './locales/ru/products.json';

const resources = {
    en: {
        navbar: en_navbar, cart: en_cart, home: en_home, catalog: en_catalog, thankyou: en_thankyou,
        item: en_item, checkout: en_checkout, validation: en_validation, common: en_common, products: en_products
    },
    lv: {
        navbar: lv_navbar, cart: lv_cart, home: lv_home, catalog: lv_catalog, thankyou: lv_thankyou,
        item: lv_item, checkout: lv_checkout, validation: lv_validation, common: lv_common, products: lv_products
    },
    ru: {
        navbar: ru_navbar, cart: ru_cart, home: ru_home, catalog: ru_catalog, thankyou: ru_thankyou,
        item: ru_item, checkout: ru_checkout, validation: ru_validation, common: ru_common, products: ru_products
    }
};

i18n
    .use(LanguageDetector)           // reads from navigator, localStorage, etc.
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        supportedLngs: ['en', 'lv', 'ru'],
        ns: ['common', 'navbar', 'home', 'catalog', 'item', 'cart', 'checkout', 'validation', 'thankyou', 'products'],
        defaultNS: 'common',
        interpolation: {
            escapeValue: false // react already escapes
        },
        detection: {
            // prefer saved choice; else browser; else fallback
            order: ['localStorage', 'navigator', 'htmlTag', 'path', 'querystring'],
            caches: ['localStorage']
        }
    });

export default i18n;
