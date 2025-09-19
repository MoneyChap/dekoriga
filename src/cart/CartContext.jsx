import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const raw = localStorage.getItem("cart:v1");
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cart:v1", JSON.stringify(items));
    }, [items]);

    const add = (item) => {
        setItems((curr) => {
            const i = curr.findIndex((x) => x.id === item.id);
            if (i !== -1) {
                const copy = curr.slice();
                copy[i] = { ...copy[i], qty: copy[i].qty + 1 };
                return copy;
            }
            return [...curr, { id: item.id, title: item.title, price: item.price, image: item.image, qty: 1 }];
        });
    };

    const remove = (id) => setItems((curr) => curr.filter((x) => x.id !== id));
    const inc = (id) =>
        setItems((curr) => curr.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)));
    const dec = (id) =>
        setItems((curr) =>
            curr
                .map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x))
        );
    const clear = () => setItems([]);

    const count = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);
    const subtotal = useMemo(() => items.reduce((a, b) => a + b.price * b.qty, 0), [items]);

    const value = { items, add, remove, inc, dec, clear, count, subtotal };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}
