/* =====================================================
   FAUZAN INTERNATIONAL — Site-wide product catalog & UI
   ===================================================== */

window.FAUZAN_PRODUCTS = [
  {
    id: "rice-1121-steam",
    name: "1121 Steam Basmati Rice",
    category: "basmati",
    price: 1.45, unit: "USD / kg (FOB)",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80&auto=format&fit=crop",
    desc: "Extra-long grain, premium steamed basmati with rich aroma and superior cooking length."
  },
  {
    id: "rice-1121-sella",
    name: "1121 Sella Basmati Rice",
    category: "basmati",
    price: 1.30, unit: "USD / kg (FOB)",
    img: "https://images.unsplash.com/photo-1626078436303-d2ba6f49a3f1?w=800&q=80&auto=format&fit=crop",
    desc: "Parboiled long-grain basmati ideal for biryani and pilaf, retains firm texture after cooking."
  },
  {
    id: "rice-1121-golden",
    name: "1121 Golden Sella Basmati",
    category: "basmati",
    price: 1.55, unit: "USD / kg (FOB)",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80&auto=format&fit=crop",
    desc: "Golden-hued parboiled basmati, naturally rich color with exceptional length on cooking."
  },
  {
    id: "rice-1509",
    name: "1509 Basmati Rice",
    category: "basmati",
    price: 1.20, unit: "USD / kg (FOB)",
    img: "https://images.unsplash.com/photo-1568347877321-f8935c7dc5a8?w=800&q=80&auto=format&fit=crop",
    desc: "Early-maturing basmati variety known for fluffy grains and balanced aroma."
  },
  {
    id: "rice-pusa",
    name: "Pusa Basmati Rice",
    category: "basmati",
    price: 1.25, unit: "USD / kg (FOB)",
    img: "https://images.unsplash.com/photo-1565978771542-29c2f96b29f5?w=800&q=80&auto=format&fit=crop",
    desc: "High-yielding aromatic basmati variety, value-driven option for bulk export buyers."
  },
  {
    id: "rice-traditional",
    name: "Traditional Basmati Rice",
    category: "basmati",
    price: 1.85, unit: "USD / kg (FOB)",
    img: "https://images.unsplash.com/photo-1612257999691-c5e0f8e0e6c4?w=800&q=80&auto=format&fit=crop",
    desc: "Aged traditional basmati — the gold standard. Deep aroma, slender grain, premium pricing."
  },
  {
    id: "rice-non-basmati",
    name: "Non-Basmati Rice",
    category: "non-basmati",
    price: 0.55, unit: "USD / kg (FOB)",
    img: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&q=80&auto=format&fit=crop",
    desc: "Versatile long & medium grain non-basmati rice for wholesale, retail packing and processing."
  },
  {
    id: "onion-fresh",
    name: "Fresh Indian Onion",
    category: "vegetables",
    price: 0.42, unit: "USD / kg (FOB)",
    img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80&auto=format&fit=crop",
    desc: "Hand-graded fresh onions from Nashik & Gujarat, packed for long-distance export integrity."
  },
  {
    id: "maize-yellow",
    name: "Yellow Maize",
    category: "grains",
    price: 0.32, unit: "USD / kg (FOB)",
    img: "https://images.unsplash.com/photo-1601054943020-9adb35a0bdb1?w=800&q=80&auto=format&fit=crop",
    desc: "Premium yellow maize for animal feed, poultry industry, and industrial food processing."
  },
  {
    id: "sorghum-jowar",
    name: "Sorghum (Jowar)",
    category: "grains",
    price: 0.48, unit: "USD / kg (FOB)",
    img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80&auto=format&fit=crop",
    desc: "Export-grade sorghum processed under strict quality protocols for international buyers."
  },
  {
    id: "green-chilli",
    name: "Fresh Green Chilli",
    category: "vegetables",
    price: 1.10, unit: "USD / kg (FOB)",
    img: "https://images.unsplash.com/photo-1583664022265-3f0f6c2bce3f?w=800&q=80&auto=format&fit=crop",
    desc: "Vibrant fresh green chillies, carefully packed under cold chain for export transit."
  },
  {
    id: "wheat",
    name: "Indian Wheat",
    category: "grains",
    price: 0.38, unit: "USD / kg (FOB)",
    img: "https://images.unsplash.com/photo-1631209121750-a9f625f98944?w=800&q=80&auto=format&fit=crop",
    desc: "High-protein milling-grade wheat sourced from Madhya Pradesh and Gujarat farms."
  }
];

/* ----- Cart utilities (localStorage) ----- */
const CART_KEY = "fauzan_cart_v1";

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function addToCart(productId) {
  const product = window.FAUZAN_PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      img: product.img,
      qty: 1
    });
  }
  saveCart(cart);
  toast(`Added "${product.name}" to inquiry cart`);
}
function removeFromCart(productId) {
  saveCart(getCart().filter(i => i.id !== productId));
}
function changeQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
}
function cartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}
function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function updateCartCount() {
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = cartCount();
  });
}

/* ----- Toast ----- */
function toast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.setAttribute("data-testid", "toast-notification");
  el.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 400);
  }, 2400);
}

/* ----- Header scroll effect + mobile menu ----- */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const header = document.querySelector(".header");
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const icon = hamburger.querySelector("i");
      if (icon) icon.className = navLinks.classList.contains("open") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    });
  }

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }

  // Mark active nav link
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });
});

/* ----- Product rendering ----- */
function renderProducts(targetId, filter = "all", limit = null) {
  const target = document.getElementById(targetId);
  if (!target) return;
  let list = window.FAUZAN_PRODUCTS;
  if (filter !== "all") list = list.filter(p => p.category === filter);
  if (limit) list = list.slice(0, limit);
  target.innerHTML = list.map(p => `
    <article class="product-card reveal" data-testid="product-card-${p.id}">
      <div class="product-img">
        <span class="product-tag">${categoryLabel(p.category)}</span>
        <img src="${p.img}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <div class="price">$${p.price.toFixed(2)} <small>${p.unit}</small></div>
        <p class="desc">${p.desc}</p>
        <div class="product-actions">
          <button class="btn add-cart" data-testid="add-to-cart-${p.id}" onclick="addToCart('${p.id}')">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
          <a class="btn quote" data-testid="quote-${p.id}" href="contact.html?product=${encodeURIComponent(p.name)}">
            <i class="fa-solid fa-envelope"></i> Quote
          </a>
        </div>
      </div>
    </article>
  `).join("");

  // Re-observe reveal
  document.querySelectorAll(".reveal:not(.in)").forEach(el => {
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      io.observe(el);
    } else { el.classList.add("in"); }
  });
}

function categoryLabel(c) {
  return {
    "basmati": "Basmati Rice",
    "non-basmati": "Non-Basmati",
    "vegetables": "Fresh Produce",
    "grains": "Grains & Cereals"
  }[c] || c;
}

/* ----- Contact form (WhatsApp/Email handoff) ----- */
function handleContactForm(e) {
  e.preventDefault();
  const f = e.target;
  const name = f.name.value.trim();
  const email = f.email.value.trim();
  const phone = f.phone.value.trim();
  const country = f.country.value.trim();
  const product = f.product.value.trim();
  const qty = f.quantity.value.trim();
  const message = f.message.value.trim();

  const body =
`New Inquiry — Fauzan International
─────────────────────────────────
Name: ${name}
Email: ${email}
Phone: ${phone}
Country: ${country}
Product: ${product}
Quantity: ${qty}

Message:
${message}`;

  const choice = f.dataset.handoff || "whatsapp";
  if (choice === "email") {
    const subject = encodeURIComponent(`Export Inquiry — ${product || "General"}`);
    window.location.href = `mailto:fauzaninternational@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
  } else {
    const text = encodeURIComponent(body);
    window.open(`https://wa.me/919426312592?text=${text}`, "_blank");
  }
  toast("Opening your messenger… please confirm to send.");
  return false;
}

/* ----- Pre-fill product on contact form ----- */
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productParam = params.get("product");
  const productField = document.getElementById("product");
  if (productParam && productField) productField.value = productParam;
});