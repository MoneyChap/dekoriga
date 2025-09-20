import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./CatalogSection.module.css";
import genderImg from "../../assets/catalog/genderreveal.jpg";
import birthdayImg from "../../assets/catalog/birthday.png";
import searchIcon from "../../assets/catalog/lookingglass.svg";
import { motion } from "framer-motion";
import { useCart } from "../../cart/CartContext";
import { useTranslation } from "react-i18next";


const ITEMS = [
    {
        id: "gr-arch-01",
        title: "Pastel balloon arch",
        category: "gr",
        price: 95,
        description: "Soft pink/blue arch with optional foil letters.",
        image: genderImg,
        available: true,
        tags: ["pastel", "arch", "balloons"],
    },
    {
        id: "bd-neon-01",
        title: "Happy Birthday neon sign",
        category: "bd",
        price: 45,
        description: "Warm white LED neon on clear acrylic backing.",
        image: birthdayImg,
        available: true,
        tags: ["neon", "sign"],
    },
    {
        id: "wd-backdrop-01",
        title: "Ivory flower wall 2.4m",
        category: "wd",
        price: 180,
        description: "Dense silk florals in ivory/cream with greenery.",
        image: genderImg,
        available: false,
        tags: ["flowers", "backdrop"],
    },
    {
        id: "bd-nums-01",
        title: "Giant number 1 (1.2m)",
        category: "bd",
        price: 25,
        description: "Freestanding wooden frame for balloon stuffing.",
        image: birthdayImg,
        available: true,
        tags: ["numbers", "props"],
    },
    {
        id: "gr-arch-02",
        title: "Pastel balloon arch",
        category: "gr",
        price: 95,
        description: "Soft pink/blue arch with optional foil letters.",
        image: genderImg,
        available: true,
        tags: ["pastel", "arch", "balloons"],
    },
    {
        id: "bd-neon-02",
        title: "Happy Birthday neon sign",
        category: "bd",
        price: 45,
        description: "Warm white LED neon on clear acrylic backing.",
        image: birthdayImg,
        available: true,
        tags: ["neon", "sign"],
    },
    {
        id: "wd-backdrop-02",
        title: "Ivory flower wall 2.4m",
        category: "wd",
        price: 180,
        description: "Dense silk florals in ivory/cream with greenery.",
        image: genderImg,
        available: false,
        tags: ["flowers", "backdrop"],
    },
    {
        id: "bd-nums-02",
        title: "Giant number 1 (1.2m)",
        category: "bd",
        price: 25,
        description: "Freestanding wooden frame for balloon stuffing.",
        image: birthdayImg,
        available: true,
        tags: ["numbers", "props"],
    },
    {
        id: "gr-arch-03",
        title: "Pastel balloon arch",
        category: "gr",
        price: 95,
        description: "Soft pink/blue arch with optional foil letters.",
        image: genderImg,
        available: true,
        tags: ["pastel", "arch", "balloons"],
    },
    {
        id: "bd-neon-03",
        title: "Happy Birthday neon sign",
        category: "bd",
        price: 45,
        description: "Warm white LED neon on clear acrylic backing.",
        image: birthdayImg,
        available: true,
        tags: ["neon", "sign"],
    },
    {
        id: "wd-backdrop-03",
        title: "Ivory flower wall 2.4m",
        category: "wd",
        price: 180,
        description: "Dense silk florals in ivory/cream with greenery.",
        image: genderImg,
        available: false,
        tags: ["flowers", "backdrop"],
    },
    {
        id: "bd-nums-03",
        title: "Giant number 1 (1.2m)",
        category: "bd",
        price: 25,
        description: "Freestanding wooden frame for balloon stuffing.",
        image: birthdayImg,
        available: true,
        tags: ["numbers", "props"],
    },
];

const CATEGORY_LABELS = {
    all: "All",
    bd: "Birthdays",
    wd: "Weddings",
    gr: "Gender reveals",
};

export default function CatalogSection() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const [sort, setSort] = useState("relevance");
    const { add } = useCart();
    const { t } = useTranslation(["catalog", "products"]);

    const gridKey = `${category}|${query}|${sort}|${onlyAvailable}`;

    const filtered = useMemo(() => {
        let list = ITEMS.slice();
        if (category !== "all") list = list.filter((i) => i.category === category);
        if (onlyAvailable) list = list.filter((i) => i.available);
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(
                (i) =>
                    i.title.toLowerCase().includes(q) ||
                    i.description.toLowerCase().includes(q) ||
                    i.tags?.some((t) => t.toLowerCase().includes(q))
            );
        }
        if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
        if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
        if (sort === "title-asc") list.sort((a, b) => a.title.localeCompare(b.title));
        return list;
    }, [category, onlyAvailable, query, sort]);

    return (
        <section className={styles.wrap}>
            <div className={styles.inner}>
                <header className={styles.header}>
                    <h2 className={styles.title}>{t("catalog:title")}</h2>
                    <p className={styles.subtitle}>{t("catalog:subtitle")}</p>
                </header>

                <div className={styles.controls}>
                    <div className={styles.searchWrap}>
                        <input
                            type="search"
                            placeholder={t("catalog:search_placeholder")}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className={styles.search}
                        />
                        <img src={searchIcon} alt={t("catalog:search_alt")} className={styles.searchIcon} />
                    </div>

                    <div className={styles.categories}>
                        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                            <button
                                key={key}
                                className={key === category ? `${styles.chip} ${styles.active}` : styles.chip}
                                onClick={() => setCategory(key)}
                            >
                                {t(`catalog:categories.${key}`)}
                            </button>
                        ))}
                    </div>

                    <label className={styles.check}>
                        <input
                            type="checkbox"
                            checked={onlyAvailable}
                            onChange={(e) => setOnlyAvailable(e.target.checked)}
                            className={styles.checkInput}
                        />
                        <span className={styles.checkBox}></span>
                        <span className={styles.checkLabel}>{t("catalog:only_available")}</span>
                    </label>

                    <div className={styles.selectWrap}>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className={styles.select}
                            aria-label={t("catalog:sort_aria")}
                        >
                            <option value="relevance">{t("catalog:sort_relevance")}</option>
                            <option value="price-asc">{t("catalog:sort_price_low")}</option>
                            <option value="price-desc">{t("catalog:sort_price_high")}</option>
                            <option value="title-asc">{t("catalog:sort_title_asc")}</option>
                        </select>
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <p className={styles.empty}>{t("catalog:empty")}</p>
                ) : (
                    <motion.div
                        key={gridKey}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <ul className={styles.grid}>
                            {filtered.map((item) => (

                                <li key={item.id} className={styles.card}>
                                    <Link to={`/item/${item.id}`} state={{ item }} className={styles.linkReset}>
                                        <div className={styles.imageWrap}>
                                            <img src={item.image} alt={t(`products:${item.id}.title`, { defaultValue: item.title })} />
                                            {!item.available && <span className={styles.badge}>{t("catalog:booked")}</span>}
                                        </div>

                                        <div className={styles.content}>
                                            <h3 className={styles.cardTitle}>
                                                {t(`products:${item.id}.title`, { defaultValue: item.title })}
                                            </h3>
                                            <div className={styles.meta}>
                                                <span className={styles.cat}>
                                                    {t(`catalog:categories.${item.category}`, { defaultValue: item.category })}
                                                </span>
                                                <span className={styles.dot}>•</span>
                                                <span className={styles.price}>€{item.price}</span>
                                            </div>
                                            <p className={styles.desc}>
                                                {t(`products:${item.id}.description`, { defaultValue: item.description })}
                                            </p>

                                            <div className={styles.ctas}>
                                                <button
                                                    className={`${styles.btn} ${styles.btnSolid}`}
                                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); add(item); }}
                                                    disabled={!item.available}
                                                >
                                                    {item.available ? t("catalog:rent") : t("catalog:unavailable")}
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </li>

                            ))}
                        </ul>
                    </motion.div>
                )}
            </div>
        </section >
    );
}
