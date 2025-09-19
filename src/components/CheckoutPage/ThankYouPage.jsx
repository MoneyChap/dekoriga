// src/components/CheckoutPage/ThankYou.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function ThankYouPage() {
    const { state } = useLocation();
    return (
        <section style={{ padding: "120px 16px 64px", maxWidth: 720, margin: "0 auto" }}>
            <h1 style={{ margin: 0, fontFamily: "Georgia, serif", color: "#bd8383" }}>Thank you!</h1>
            <p style={{ color: "#4b4747" }}>
                {state?.name ? `${state.name}, ` : ""}we’ve received your request.
                A confirmation email {state?.email ? `was sent to ${state.email}.` : "has been sent."}
            </p>
            <Link to="/catalog" style={{ textDecoration: "none", padding: "10px 16px", borderRadius: 10, border: "1px solid #c9bcbc", background: "#fff", color: "#111" }}>
                Back to catalog
            </Link>
        </section>
    );
}
