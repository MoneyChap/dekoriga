import React from "react";
import styles from "./HomePage.module.css";
import logowhite from "../../assets/dekologowhite.png"
import DescriptionSection from "./DescriptionSection/DescriptionSection";
import { useTranslation } from 'react-i18next';


const HomePage = (props) => {
    const { t } = useTranslation('home');

    return (
        <section className={styles.container}>
            <div className={styles.heroSection}>
                <img src={logowhite} alt="logo" />
                <p>{t("making_most_beautiful_moments_more_beautiful")}</p>
                <h1 className={styles.heroTitle}> - {t("birthday_events")} - </h1>
            </div>
            <DescriptionSection />
        </section>
    )
};

export default HomePage;
