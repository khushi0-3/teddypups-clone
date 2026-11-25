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

/* Contact page: the letter opens WhatsApp with your message ready to send */
(function () {
  const form = document.getElementById("letter");
  const msg = document.getElementById("letterMsg");
  if (!form || !msg) return;
  const WHATSAPP = "https://wa.me/971000000000";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const val = function (name) { return form.elements[name].value.trim(); };
    const parts = ["Hi TeddyPups! My name is " + val("name") + "."];
    parts.push("You can reach me on " + val("phone") + (val("email") ? " or by email at " + val("email") : "") + ".");
    if (val("city")) parts.push("I live in " + val("city") + ".");
    parts.push("I'm curious about " + form.elements["interest"].value + ".");
    if (val("notes")) parts.push(val("notes"));
    const url = WHATSAPP + "?text=" + encodeURIComponent(parts.join(" "));

    window.open(url, "_blank", "noopener");
    msg.textContent = "Your letter is ready! WhatsApp should open with your message. Just press send. ";
    const again = document.createElement("a");
    again.href = url;
    again.target = "_blank";
    again.rel = "noopener";
    again.textContent = "Open WhatsApp again";
    msg.appendChild(again);
    msg.hidden = false;
  });
})();