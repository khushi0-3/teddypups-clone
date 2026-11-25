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

/* How it works page: "Two ways home" toggle */
(function () {
  const seg = document.getElementById("modeSeg");
  if (!seg) return;
  const I = {
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/><path d="M10.5 13.2s-2.8-1.7-2.8-3.5a1.6 1.6 0 0 1 2.8-1 1.6 1.6 0 0 1 2.8 1c0 1.8-2.8 3.5-2.8 3.5z"/>',
    heart: '<path d="M12 20s-8-4.8-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.2 12 20 12 20z"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
    bear: '<circle cx="12" cy="13" r="7"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="6.5" r="2.5"/><path d="M9.5 12h.01M14.5 12h.01M10.5 15.5q1.5 1.3 3 0"/>',
    truck: '<path d="M2 7h12v9H2zM14 10h4l3 3v3h-7z"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>'
  };
  const TINTS = ["#fbe0a8", "#fde3df", "#dfeafb", "#e4f1e2"];
  const MODES = {
    dubai: {
      label: "Downtown Dubai",
      title: "Meet your puppy in person",
      text: "Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they're raised with care, proper nutrition, and veterinary checks.",
      steps: [
        ["Explore our puppies", "Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.", "search"],
        ["Choose your puppy", "Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.", "heart"],
        ["Meet before you choose", "Spend time bonding before making your decision.", "bear"],
        ["Pick-up or delivery", "Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.", "truck"]
      ]
    },
    import: {
      label: "Korea \u2192 Dubai",
      title: "Imported for you",
      text: "Exclusive Korean teacup puppies, delivered. Order from the world's most reputable breeders and let us handle the import.",
      steps: [
        ["Tell us your breed", "Tell us the breed you love and we'll guide you based on availability and your lifestyle.", "search"],
        ["Get photos &amp; details", "Our team shares real photos, health details, and all necessary information directly on WhatsApp.", "heart"],
        ["Confirm your puppy", "Once you're happy, confirm your choice and we take care of the rest.", "bear"],
        ["Safe delivery", "We handle everything professionally and ensure your puppy reaches you safely and stress-free.", "truck"]
      ]
    }
  };
  const btns = Array.from(seg.querySelectorAll(".seg__btn"));
  const el = function (id) { return document.getElementById(id); };

  function render(mode) {
    const m = MODES[mode];
    el("modeTitle").textContent = m.title;
    el("modeText").textContent = m.text;
    el("sceneLabel").textContent = m.label;
    el("sceneDubai").hidden = mode !== "dubai";
    el("sceneSun").hidden = mode !== "dubai";
    el("sceneImport").hidden = mode !== "import";
    el("modeSteps").innerHTML = m.steps.map(function (s, i) {
      return '<li class="sc" style="--tint:' + TINTS[i] + '"><span class="sc__icon"><svg viewBox="0 0 24 24" aria-hidden="true">' + I[s[2]] + '</svg></span>' +
        '<p class="sc__n">Step ' + (i + 1) + '</p><h4>' + s[0] + '</h4><p>' + s[1] + "</p></li>";
    }).join("");
    btns.forEach(function (b) {
      const on = b.dataset.mode === mode;
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
    });
  }

  btns.forEach(function (b, i) {
    b.addEventListener("click", function () { render(b.dataset.mode); });
    b.addEventListener("keydown", function (e) {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const next = btns[(i + 1) % btns.length];
      render(next.dataset.mode);
      next.focus();
    });
  });
  render("dubai");
})();