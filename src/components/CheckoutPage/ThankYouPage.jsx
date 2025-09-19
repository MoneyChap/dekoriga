// src/components/CheckoutPage/ThankYou.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ThankYouPage() {
    const { state } = useLocation();
    const { t } = useTranslation("thankyou");

    const name = state?.name;
    const email = state?.email;

    let bodyText;
    if (name && email) {
        bodyText = t("message.name_email", { name, email });
    } else if (name) {
        bodyText = t("message.name_only", { name });
    } else if (email) {
        bodyText = t("message.email_only", { email });
    } else {
        bodyText = t("message.plain");
    }

    return (
        <section style={{ padding: "120px 16px 64px", maxWidth: 720, margin: "0 auto" }}>
            <h1 style={{ margin: 0, fontFamily: "Georgia, serif", color: "#bd8383" }}>
                {t("title")}
            </h1>

            <p style={{ color: "#4b4747" }}>{bodyText}</p>

            <Link
                to="/catalog"
                style={{
                    textDecoration: "none",
                    padding: "10px 16px",
                    borderRadius: 10,
                    border: "1px solid #c9bcbc",
                    background: "#fff",
                    color: "#111"
                }}
            >
                {t("back_to_catalog")}
            </Link>
        </section>
    );
}
