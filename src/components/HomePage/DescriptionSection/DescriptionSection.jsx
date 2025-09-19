import styles from "./DescriptionSection.module.css";
import gendereveal from "../../../assets/genderreveal.jpg"
import birthday from "../../../assets/birthday.png"

export default function DescriptionSection({
    eyebrow = "Mica Decorations",
    title = "Woonaccessoires",
    text = `Van moderne vaasjes en stijlvolle kandelaars tot sfeervolle kussens en unieke wanddecoraties: onze woonaccessoires zijn er in verschillende stijlen, kleuren en materialen. Zo vind je altijd iets dat perfect past bij jouw interieur, of je nu houdt van een strak, Scandinavisch design of juist van een warme, bohemian sfeer.`,
    // primaryLabel = "Inspiratie",
    // secondaryLabel = "Storefinder",
    // onPrimary,
    // onSecondary,
    // imageSrc = "/images/sample-right.jpg",
    imageAlt = "Decorative vase and sofa"
}) {
    return (
        <section className={styles.wrap}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <h2 className={styles.title}>Geneder Reveals</h2>
                    <p className={styles.body}>{text}</p>

                    {/* <div className={styles.ctas}>
                        <button className={`${styles.btn} ${styles.btnSolid}`} onClick={onPrimary}>
                            {primaryLabel}
                        </button>
                        <button className={`${styles.btn} ${styles.btnGhost}`} onClick={onSecondary}>
                            {secondaryLabel}
                        </button>
                    </div> */}
                </div>

                <div className={styles.right}>
                    <img src={gendereveal} alt={imageAlt} />
                </div>
            </div>
            <div className={styles.inner}>
                <div className={styles.right}>
                    <img src={birthday} alt={imageAlt} />
                </div>
                <div className={styles.left}>
                    <h2 className={styles.title}>Birthday Parties</h2>
                    <p className={styles.body}>{text}</p>

                    {/* <div className={styles.ctas}>
                        <button className={`${styles.btn} ${styles.btnSolid}`} onClick={onPrimary}>
                            {primaryLabel}
                        </button>
                        <button className={`${styles.btn} ${styles.btnGhost}`} onClick={onSecondary}>
                            {secondaryLabel}
                        </button>
                    </div> */}
                </div>
            </div>
        </section>
    );
}
