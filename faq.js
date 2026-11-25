(function () {
  const navbar = document.getElementById("navbar");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("menuToggle");
  const links = Array.from(document.querySelectorAll(".nav__link"));
  const mobileQuery = window.matchMedia("(max-width: 960px)");

  /* Mobile menu */
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });

  links.forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });
  nav.querySelector(".nav__cta-mobile").addEventListener("click", function () { setMenu(false); });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  mobileQuery.addEventListener("change", function (e) {
    if (!e.matches) setMenu(false);
  });

  /* Shadow once the page scrolls */
  function onScroll() {
    navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Highlight the link for the section in view (works once those sections exist) */
  function setActive(id) {
    links.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
    });
  }

  const sections = links
    .map(function (link) { const h = link.getAttribute("href"); return h.charAt(0) === "#" ? document.querySelector(h) : null; })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length > 1) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (section) { observer.observe(section); });
  }
})();

/* mascot drawings */
const MASCOT = '<svg viewBox="0 0 120 110" aria-hidden="true"><g stroke="#2c221e" stroke-width="3" stroke-linejoin="round"><circle cx="60" cy="14" r="11" fill="#e8b068"/><circle cx="60" cy="58" r="42" fill="#efb868"/><circle cx="30" cy="62" r="14" fill="#e8b068"/><circle cx="90" cy="62" r="14" fill="#e8b068"/><ellipse cx="60" cy="70" rx="22" ry="18" fill="#fbe6c2"/></g><circle cx="45" cy="54" r="5" fill="#2c221e"/><circle cx="75" cy="54" r="5" fill="#2c221e"/><circle cx="34" cy="68" r="6" fill="#f5b6a0" opacity=".8"/><circle cx="86" cy="68" r="6" fill="#f5b6a0" opacity=".8"/><ellipse cx="60" cy="64" rx="6" ry="4.5" fill="#2c221e"/><path d="M52 75q8 8 16 0" fill="#e86a6a" stroke="#2c221e" stroke-width="2.5" stroke-linecap="round"/></svg>';
document.querySelectorAll("[data-mascot]").forEach(function (el) { el.innerHTML = MASCOT; });

/* FAQ page: cork board of notes with search */
(function () {
  const list = document.getElementById("notes");
  if (!list) return;
  const search = document.getElementById("faqSearch");
  const count = document.getElementById("faqCount");
  const empty = document.getElementById("faqEmpty");
  const PINS = ["#c9622f", "#2f6aa3", "#d9a02e", "#c4506a", "#c9622f"];
  const NOTES = [
    ["Are your puppies vaccinated and health-checked?", "Yes. Your puppy comes with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family."],
    ["Can I meet a puppy before I decide?", "Absolutely. Visit our Downtown Dubai showroom to meet our locally available puppies before you decide. Message us on WhatsApp and we'll arrange a time."],
    ["Can I take my puppy home the same day?", "Local puppies are available immediately. Visit, fall in love, and go home together."],
    ["Do you import puppies from abroad?", "Yes. We bring in exclusive Korean teacup puppies and other miniature breeds from trusted breeders worldwide, and we handle the import for you."],
    ["How does an imported puppy travel to Dubai?", "We handle all the paperwork and ensure comfortable travel through our trusted international cargo partners, so your puppy arrives happy and stress-free."],
    ["Will I see photos and health details first?", "Yes. Our team shares real photos, videos, and health details directly on WhatsApp before your puppy travels."],
    ["Do you deliver?", "Yes. We deliver to your door within Dubai, safely and comfortably, and we deliver worldwide through trusted international cargo partners."],
    ["Which breeds do you usually have?", "Our range changes often. We usually have Maltipoo, Pomeranian, Poodle, Cavapoo and Shih Tzu, and we can source other miniature breeds on request."],
    ["Is there help after my puppy comes home?", "Yes. Our team is available 24/7, and we offer guidance on training, nutrition, and general care to ensure a smooth transition for you and your new furry friend."]
  ];
  const CHEVRON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  list.innerHTML = NOTES.map(function (n, i) {
    return '<li class="note" style="--pin:' + PINS[i % PINS.length] + '" data-text="' + esc((n[0] + " " + n[1]).toLowerCase()) + '">' +
      '<button class="note__q" type="button" id="note-q' + i + '" aria-expanded="false" aria-controls="note-a' + i + '">' + esc(n[0]) + CHEVRON + "</button>" +
      '<div class="note__a" id="note-a' + i + '" role="region" aria-labelledby="note-q' + i + '"><div><p>' + esc(n[1]) + "</p></div></div>" +
      '<span class="note__fold"></span></li>';
  }).join("");

  const items = Array.from(list.querySelectorAll(".note"));

  list.addEventListener("click", function (e) {
    const btn = e.target.closest(".note__q");
    if (!btn) return;
    const note = btn.parentElement;
    const open = !note.classList.contains("is-open");
    items.forEach(function (n) {
      n.classList.remove("is-open");
      n.querySelector(".note__q").setAttribute("aria-expanded", "false");
    });
    if (open) { note.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); }
  });

  function filter() {
    const term = search.value.trim().toLowerCase();
    let shown = 0;
    items.forEach(function (n) {
      const hit = !term || n.dataset.text.indexOf(term) !== -1;
      n.hidden = !hit;
      if (hit) shown++;
    });
    empty.hidden = shown !== 0;
    count.textContent = !term
      ? shown + " notes on the board"
      : shown === 0 ? "No notes match" : shown + (shown === 1 ? " note matches" : " notes match");
  }
  search.addEventListener("input", filter);
  filter();
})();