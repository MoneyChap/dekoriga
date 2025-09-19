import React, { useMemo } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { ITEMS, CATEGORY_LABELS } from "../../data/catalog";
import styles from "./ItemPage.module.css";
import { useCart } from "../../cart/CartContext";
import { useTranslation } from 'react-i18next';


export default function ItemPage() {
    const { id } = useParams();
    const location = useLocation();
    const stateItem = location.state?.item;
    const item = stateItem || ITEMS.find((i) => i.id === id);
    const { add } = useCart();
    const { t } = useTranslation('item');

    const related = useMemo(() => {
        if (!item) return [];
        const baseTags = new Set(item.tags || []);
        return ITEMS
            .filter((i) => i.id !== item.id)
            .map((i) => {
                const sameCategory = i.category === item.category ? 1 : 0;
                const tagOverlap =
                    i.tags?.reduce((acc, t) => acc + (baseTags.has(t) ? 1 : 0), 0) || 0;
                const score = sameCategory * 2 + tagOverlap; // category weighs more
                return { ...i, score };
            })
            .filter((i) => i.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
    }, [item]);

    if (!item) {
        return (
            <section className={styles.wrap}>
                <div className={styles.inner}>
                    <p className={styles.empty}>{t("item_not_found")}</p>
                    <Link to="/catalog" className={styles.btnBack}>{t("back_to_catalog")}</Link>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.wrap}>
            <div className={styles.inner}>
                <div className={styles.grid}>
                    <div className={styles.media}>
                        <img src={item.image} alt={item.title} />
                        {!item.available && <span className={styles.badge}>{t("booked")}</span>}
                    </div>

                    <div className={styles.info}>
                        <h1 className={styles.title}>{item.title}</h1>
                        {item.tags?.length ? (
                            <ul className={styles.tags}>
                                {item.tags.map((t) => (
                                    <li key={t} className={styles.tag}>#{t}</li>
                                ))}
                            </ul>
                        ) : null}
                        <p className={styles.meta}>
                            <span>{CATEGORY_LABELS[item.category]}</span>
                            <span className={styles.dot}>•</span>
                            <span className={styles.price}>€{item.price}</span>
                        </p>

                        <p className={styles.desc}>{item.description}</p>

                        <div className={styles.actions}>
                            <Link to="/catalog" className={styles.btnGhost}>{t("back")}</Link>
                            <button
                                className={styles.btnSolid}
                                disabled={!item.available}
                                onClick={() => add(item)}
                            >
                                {item.available ? t("rent") : t("unavailable")}
                            </button>
                        </div>


                    </div>
                </div>

                {related.length > 0 && (
                    <div className={styles.related}>
                        <h2 className={styles.relatedTitle}>Related decorations</h2>
                        <ul className={styles.relatedGrid}>
                            {related.map((r) => (
                                <li key={r.id} className={styles.relCard}>
                                    <Link to={`/item/${r.id}`} state={{ item: r }} className={styles.relLink}>
                                        <div className={styles.relImage}>
                                            <img src={r.image} alt={r.title} />
                                            {!r.available && <span className={styles.badge}>Booked</span>}
                                        </div>
                                        <div className={styles.relBody}>
                                            <h3 className={styles.relTitle}>{r.title}</h3>
                                            <div className={styles.relMeta}>
                                                <span>{CATEGORY_LABELS[r.category]}</span>
                                                <span className={styles.dot}>•</span>
                                                <span className={styles.price}>€{r.price}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}
