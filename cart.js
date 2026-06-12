document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});

function renderCart() {
  const wrap = document.getElementById("cart-wrap");
  if (!wrap) return;
  const cart = getCart();

  if (!cart.length) {
    wrap.innerHTML = `
      <div class="empty-cart" data-testid="empty-cart">
        <i class="fa-solid fa-cart-shopping"></i>
        <h3>Your inquiry cart is empty</h3>
        <p>Browse our premium agricultural products and add items to request an export quote.</p>
        <a class="btn btn-primary" href="products.html" data-testid="empty-cart-browse">
          Explore Products <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>`;
    return;
  }

  const rows = cart.map(item => `
    <tr data-testid="cart-row-${item.id}">
      <td>
        <div class="cart-item-cell">
          <img src="${item.img}" alt="${item.name}" />
          <div>
            <strong>${item.name}</strong>
            <small>${item.unit}</small>
          </div>
        </div>
      </td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <div class="qty-control">
          <button data-testid="qty-decr-${item.id}" onclick="changeQty('${item.id}', -1); renderCart();">−</button>
          <span>${item.qty}</span>
          <button data-testid="qty-incr-${item.id}" onclick="changeQty('${item.id}', 1); renderCart();">+</button>
        </div>
      </td>
      <td><strong>$${(item.price * item.qty).toFixed(2)}</strong></td>
      <td>
        <button class="remove-btn" data-testid="remove-${item.id}" onclick="removeFromCart('${item.id}'); renderCart();">
          <i class="fa-solid fa-trash"></i> Remove
        </button>
      </td>
    </tr>
  `).join("");

  const subtotal = cartTotal();
  // Export business: shipping handled separately, but we show indicative
  const handling = subtotal * 0.03;
  const total = subtotal + handling;

  wrap.innerHTML = `
    <div style="overflow-x:auto">
      <table class="cart-table" data-testid="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>

    <div class="cart-summary" data-testid="cart-summary">
      <div class="summary-row"><span>Indicative subtotal (per kg basis)</span><strong>$${subtotal.toFixed(2)}</strong></div>
      <div class="summary-row"><span>Handling & documentation (3%)</span><strong>$${handling.toFixed(2)}</strong></div>
      <div class="summary-row total"><span>Estimated total</span><span>$${total.toFixed(2)}</span></div>
      <p style="font-size:13px;color:var(--muted);margin-top:10px;line-height:1.5">
        <i class="fa-solid fa-circle-info" style="color:var(--saffron-dark)"></i>
        Final quotation depends on volume (MT), Incoterms (FOB/CIF), packaging and destination port.
        Submit your inquiry below to receive a formal quote within 24 hours.
      </p>
      <div class="checkout-actions">
        <button class="btn btn-green" data-testid="checkout-whatsapp" onclick="checkout('whatsapp')">
          <i class="fa-brands fa-whatsapp"></i> Send Inquiry on WhatsApp
        </button>
        <button class="btn btn-dark" data-testid="checkout-email" onclick="checkout('email')">
          <i class="fa-solid fa-envelope"></i> Send Inquiry by Email
        </button>
        <a class="btn btn-outline" href="products.html" data-testid="continue-shopping">
          <i class="fa-solid fa-arrow-left"></i> Add More Products
        </a>
      </div>
    </div>`;
}

function checkout(channel) {
  const cart = getCart();
  if (!cart.length) return;
  const lines = cart.map((i, idx) =>
    `${idx + 1}. ${i.name} — ${i.qty} unit(s) @ $${i.price.toFixed(2)} = $${(i.qty * i.price).toFixed(2)}`
  ).join("n");

  const body =
`Export Inquiry — Fauzan International
─────────────────────────────────────
Hello, I would like a formal quotation for the following:

${lines}

Indicative subtotal: $${cartTotal().toFixed(2)}

Please share:
• Final pricing (FOB / CIF)
• MOQ & lead time
• Packaging options
• Required documentation

Thank you.`;

  if (channel === "email") {
    const subject = encodeURIComponent("Export Quotation Request — Fauzan International");
    window.location.href = `mailto:fauzaninternational@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
  } else {
    window.open(`https://wa.me/919426312592?text=${encodeURIComponent(body)}`, "_blank");
  }
}