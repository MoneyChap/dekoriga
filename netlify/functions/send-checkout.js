const { Resend } = require("resend");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  try {
    const { form, items, subtotal } = JSON.parse(event.body || "{}");

    if (
      !form?.email ||
      !form?.name ||
      !form?.phone ||
      !form?.eventDate ||
      !form?.location ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return { statusCode: 400, body: "Missing required fields" };
    }

    // const resend = new Resend(process.env.RESEND_API_KEY);
    // const ownerEmail = process.env.SITE_OWNER_EMAIL;
    // const fromEmail = process.env.FROM_EMAIL || "Dekoriga <no-reply@yourdomain.com>";

    // --- SANDBOX TEST VALUES (hard-coded for now) ---
    const resend = new Resend("re_8a5wi7oi_8mmXfmi6DDj6gPLQ7yo4zK3Q");
    const ownerEmail = "osiseriks2@gmail.com";
    const fromEmail = "delivered@resend.dev";
    // ------------------------------------------------

    const itemsHtml = items
      .map(
        (i) => `
        <tr>
          <td style="padding:6px 8px;border-bottom:1px solid #eee">${escapeHtml(i.title)}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #eee">${Number(i.qty || 1)}</td>
          <td style="padding:6px 8px;border-bottom:1px solid #eee">€${Number(i.price * (i.qty || 1)).toFixed(2)}</td>
        </tr>`
      )
      .join("");

    const detailsHtml = `
      <p><strong>Name:</strong> ${escapeHtml(form.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(form.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(form.phone)}</p>
      <p><strong>Event type:</strong> ${escapeHtml(form.eventType || "-")}</p>
      <p><strong>Date:</strong> ${escapeHtml(form.eventDate)} ${form.startTime ? `from ${escapeHtml(form.startTime)}` : ""} ${form.endTime ? `to ${escapeHtml(form.endTime)}` : ""}</p>
      <p><strong>Location:</strong> ${escapeHtml(form.location)}</p>
      ${form.notes ? `<p><strong>Notes:</strong> ${escapeHtml(form.notes)}</p>` : ""}
    `;

    const tableHtml = `
      <table cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;margin-top:8px">
        <thead>
          <tr>
            <th style="text-align:left;padding:6px 8px;border-bottom:1px solid #ccc">Item</th>
            <th style="text-align:left;padding:6px 8px;border-bottom:1px solid #ccc">Qty</th>
            <th style="text-align:left;padding:6px 8px;border-bottom:1px solid #ccc">Total</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
        <tfoot>
          <tr>
            <td></td>
            <td style="padding:8px 8px;text-align:right;font-weight:bold">Subtotal</td>
            <td style="padding:8px 8px;font-weight:bold">€${Number(subtotal || 0).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    `;

    // Email to customer (use their email in production; in sandbox, deliverability is limited to verified recipients)
    const toCustomer = await resend.emails.send({
      from: fromEmail,
      to: form.email,
      subject: "We received your decoration rental request",
      html: `
        <div style="font-family:system-ui,Segoe UI,Arial,sans-serif">
          <h2 style="color:#bd8383;margin:0 0 10px 0">Thank you, ${escapeHtml(form.name)}!</h2>
          <p>We’ve received your request. Below is a copy of your details.</p>
          ${detailsHtml}
          ${tableHtml}
          <p style="margin-top:16px">We’ll contact you shortly to confirm availability and delivery.</p>
        </div>
      `,
    });

    // Email to site owner
    const toOwner = await resend.emails.send({
      from: fromEmail,
      to: ownerEmail,
      subject: "New decoration rental request",
      html: `
        <div style="font-family:system-ui,Segoe UI,Arial,sans-serif">
          <h2 style="color:#111;margin:0 0 10px 0">New rental request</h2>
          ${detailsHtml}
          ${tableHtml}
        </div>
      `,
    });

    if (toCustomer.error || toOwner.error) {
      console.error("Resend error:", toCustomer.error || toOwner.error);
      return { statusCode: 500, body: "Email service error" };
    }

    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (e) {
    console.error("Function error:", e);
    return { statusCode: 500, body: e?.message || "Server error" };
  }
};

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[m]));
}
