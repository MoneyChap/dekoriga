import React from "react";
import styles from "./HomePage.module.css";
import logo from "../../assets/dekologo.png"
import logowhite from "../../assets/dekologowhite.png"
import DescriptionSection from "./DescriptionSection/DescriptionSection";


const HomePage = (props) => {
    return (
        <section className={styles.container}>
            <div className={styles.heroSection}>
                {/* <h1 className={styles.heroTitle}>DEKO.RIGA</h1> */}
                <img src={logowhite} alt="logo" />
                <p>Making most beautiful moments more beautiful</p>
                <h1 className={styles.heroTitle}> - Birthday Events - </h1>
            </div>
            <DescriptionSection />
        </section>
    )
};

export default HomePage;
