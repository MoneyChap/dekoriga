// src/components/CheckoutPage/CheckoutPage.jsx
import React, { useState } from "react";
import { useCart } from "../../cart/CartContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function CheckoutPage() {
    const { items, subtotal, clear } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const { t } = useTranslation('checkout');


    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        startTime: "",
        endTime: "",
        location: "",
        notes: "",
    });

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr("");

        if (!items.length) {
            setErr(t("your_cart_is_empty"));
            return;
        }
        if (!form.name || !form.email || !form.phone || !form.eventDate || !form.location) {
            setErr(t("please_fill_in_the_required_fields"));
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/.netlify/functions/send-checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ form, items, subtotal }),
            });
            if (!res.ok) {
                const t = await res.text();
                throw new Error(t || t('send_failed'));
            }
            clear();
            navigate("/thank-you", { replace: true, state: { email: form.email, name: form.name } });
        } catch (e2) {
            setErr(e2.message || t('generic_error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section style={{ padding: "120px 16px 64px", maxWidth: 960, margin: "0 auto" }}>
            <h1 style={{ margin: 0, fontFamily: "Georgia, serif", color: "#bd8383" }}>{t('page_title')}</h1>

            {!items.length ? (
                <p style={{ color: "#4b4747" }}>{t('empty_cart')}</p>
            ) : (
                <>
                    <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24 }}>
                        <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
                            <h2 style={{ margin: "6px 0", fontFamily: "Georgia, serif", fontSize: 22, color: "#111" }}>
                                {t('contact_details')}
                            </h2>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                <input name="name" placeholder={t('name_placeholder')} value={form.name} onChange={onChange}
                                    required style={inputStyle} />
                                <input name="email" type="email" placeholder={t('email_placeholder')} value={form.email} onChange={onChange}
                                    required style={inputStyle} />
                            </div>

                            <input name="phone" placeholder={t('phone_placeholder')} value={form.phone} onChange={onChange}
                                required style={inputStyle} />

                            <h2 style={{ margin: "12px 0 0", fontFamily: "Georgia, serif", fontSize: 22, color: "#111" }}>
                                {t('event_details')}
                            </h2>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                <input name="eventType" placeholder={t('event_type_placeholder')} value={form.eventType}
                                    onChange={onChange} style={inputStyle} />
                                <input name="eventDate" type="date" placeholder={t('event_date_placeholder')} value={form.eventDate}
                                    onChange={onChange} required style={inputStyle} />
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                <input name="startTime" type="time" placeholder={t('start_time_placeholder')} value={form.startTime}
                                    onChange={onChange} style={inputStyle} />
                                <input name="endTime" type="time" placeholder={t('end_time_placeholder')} value={form.endTime}
                                    onChange={onChange} style={inputStyle} />
                            </div>

                            <input name="location" placeholder={t('location_placeholder')} value={form.location}
                                onChange={onChange} required style={inputStyle} />

                            <textarea name="notes" placeholder={t('notes_placeholder')}
                                value={form.notes} onChange={onChange} rows={4} style={{ ...inputStyle, resize: "vertical" }} />

                            {err ? <p style={{ color: "#a33", margin: "8px 0 0" }}>{err}</p> : null}

                            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                                <button type="submit" disabled={loading} style={btnSolid}>
                                    {loading ? t('sending') : t('send_invoice')}
                                </button>
                            </div>
                        </form>

                        <aside style={{ border: "1px solid #c9bcbc", background: "#fff", borderRadius: 16, padding: 14 }}>
                            <h3 style={{ margin: "0 0 10px 0", fontFamily: "Georgia, serif", color: "#111" }}>
                                {t('sidebar_title')}
                            </h3>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {items.map((it) => (
                                    <li key={it.id} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid #eee" }}>
                                        <img src={it.image} alt="" style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover" }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 600 }}>{it.title}</div>
                                            <div style={{ color: "#4b4747", fontSize: 14 }}>{t('qty')}: {it.qty}</div>
                                        </div>
                                        <div style={{ fontWeight: 700 }}>€{(it.price * it.qty).toFixed(2)}</div>
                                    </li>
                                ))}
                            </ul>
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontWeight: 700 }}>
                                <span>{t('total')}</span>
                                <span>€{subtotal.toFixed(2)}</span>
                            </div>
                        </aside>
                    </div>
                </>
            )}
        </section>
    );
}

const inputStyle = {
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #c9bcbc",
    background: "#fff",
    fontSize: 16,
};

const btnSolid = {
    appearance: "none",
    border: "1px solid #151515",
    background: "#151515",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
};
