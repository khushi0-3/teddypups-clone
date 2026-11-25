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
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
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

/* Puppies: featured row + "Meet the pups" grid */
(function () {
  const WHATSAPP = "https://wa.me/971000000000";
  const DOORS = ["#d58a3c", "#b8604a", "#7a4a35", "#a8501f", "#c9985a"];

  // Replace with real puppies. Set `photo` to an image path, e.g. "images/max.jpg".
  const puppies = [
    { name: "Max",     breed: "Maltipoo",                 age: "boy, 3 months",   photo: "image/max.jpg" },
    { name: "Mochi",   breed: "Korean Teacup Poodle",     age: "girl, 2 months",  photo: "image/mochi.jpg" },
    { name: "Coco",    breed: "Korean Teacup Maltipoo",   age: "girl, 2 months",  photo: "image/coco.jpg" },
    { name: "Biscuit", breed: "Cavapoo",                  age: "boy, 3 months",   photo: "image/Biscuit.jpg" },
    { name: "Teddy",   breed: "Toy Poodle",               age: "boy, 2 months",   photo: "image/Teddy.jpg" },
    { name: "Luna",    breed: "Korean Teacup Pomeranian", age: "girl, 3 months",  photo: "image/Luna.jpg" },
    { name: "Bella",   breed: "Shih Tzu",                 age: "girl, 2 months",  photo: "image/Bella.jpg" },
    { name: "Cleo",    breed: "Maltipoo",                 age: "girl, 3 months",  photo: "image/Cleo.jpg" },
    { name: "Simba",   breed: "Pomeranian",               age: "boy, 2 months",   photo: "image/Simba.jpg" },
    { name: "Peanut",  breed: "Toy Poodle",               age: "girl, 2 months",  photo: "image/Peanut.jpg" },
    { name: "Daisy",   breed: "Cavapoo",                  age: "girl, 3 months",  photo: "image/Daisy.jpg" },
    { name: "Oreo",    breed: "Shih Tzu",                 age: "boy, 2 months",   photo: "image/Oreo.jpg" },
    { name: "Ginger",  breed: "Korean Teacup Maltipoo",   age: "boy, 3 months",   photo: "image/Ginger.jpg" },
    { name: "Milo",    breed: "Maltipoo",                 age: "boy, 2 months",   photo: "image/Milo.jpg" },
    { name: "Pearl",   breed: "Korean Teacup Pomeranian", age: "girl, 2 months",  photo: "image/Pearl.jpg" }
  ];

  const PAW = '<svg class="door__paw" viewBox="0 0 24 24" fill="#fbf8f3" aria-hidden="true"><circle cx="5" cy="10" r="2.3"/><circle cx="9.5" cy="5.5" r="2.3"/><circle cx="14.5" cy="5.5" r="2.3"/><circle cx="19" cy="10" r="2.3"/><path d="M12 11c-3.5 0-6 3.2-6 5.7 0 1.9 1.5 2.8 3 2.8 1.2 0 2-.5 3-.5s1.8.5 3 .5c1.5 0 3-.9 3-2.8 0-2.5-2.5-5.7-6-5.7z"/></svg>';

  const MASCOT = '<svg viewBox="0 0 120 110" aria-hidden="true"><g stroke="#2c221e" stroke-width="3" stroke-linejoin="round"><circle cx="60" cy="14" r="11" fill="#e8b068"/><circle cx="60" cy="58" r="42" fill="#efb868"/><circle cx="30" cy="62" r="14" fill="#e8b068"/><circle cx="90" cy="62" r="14" fill="#e8b068"/><ellipse cx="60" cy="70" rx="22" ry="18" fill="#fbe6c2"/></g><circle cx="45" cy="54" r="5" fill="#2c221e"/><circle cx="75" cy="54" r="5" fill="#2c221e"/><circle cx="34" cy="68" r="6" fill="#f5b6a0" opacity=".8"/><circle cx="86" cy="68" r="6" fill="#f5b6a0" opacity=".8"/><ellipse cx="60" cy="64" rx="6" ry="4.5" fill="#2c221e"/><path d="M52 75q8 8 16 0" fill="#e86a6a" stroke="#2c221e" stroke-width="2.5" stroke-linecap="round"/></svg>';

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function enquiry(p) {
    return WHATSAPP + "?text=" + encodeURIComponent("Hi! I'm interested in " + p.name + " the " + p.breed + ".");
  }

  function picture(p) {
    return p.photo
      ? '<img src="' + esc(p.photo) + '" alt="' + esc(p.name) + ', ' + esc(p.breed) + ' puppy" loading="lazy">'
      : PAW;
  }

  /* Featured row: 3 arches, mascot, 3 arches */
  const row = document.getElementById("featuredRow");
  if (row) {
    const items = puppies.slice(0, 6).map(function (p, i) {
      return '<li class="strip__item" style="--door:' + DOORS[i % DOORS.length] + '">' +
        '<a class="strip__link" href="' + enquiry(p) + '" target="_blank" rel="noopener" aria-label="Ask about ' + esc(p.name) + ', ' + esc(p.breed) + '">' +
        '<div class="strip__arch">' + picture(p) + "</div>" +
        '<span class="strip__tag">' + esc(p.name) + "</span>" +
        "</a></li>";
    });
    items.splice(3, 0, '<li class="strip__item strip__item--mascot">' + MASCOT + "</li>");
    row.innerHTML = items.join("");
  }

  /* Meet the pups grid */
  const grid = document.getElementById("pupGrid");
  if (grid) {
    const cards = puppies.map(function (p, i) {
      return '<li class="card" style="--door:' + DOORS[i % DOORS.length] + '">' +
        '<a class="card__link" href="' + enquiry(p) + '" target="_blank" rel="noopener" aria-label="Ask about ' + esc(p.name) + ', ' + esc(p.breed) + '">' +
        '<h3 class="card__name">' + esc(p.name) + "</h3>" +
        '<p class="card__breed">' + esc(p.breed) + "</p>" +
        '<p class="card__age">' + esc(p.age) + "</p>" +
        '<div class="door">' + picture(p) + '<span class="badge">Available</span></div>' +
        "</a></li>";
    });
    cards.push(
      '<li class="card card--all">' +
        '<a class="card__link" href="' + WHATSAPP + '?text=' + encodeURIComponent("Hi! I'd like to see all your available puppies.") + '" target="_blank" rel="noopener">' +
        '<h3 class="card__name">Meet them all</h3>' +
        '<p class="card__breed">More pups join every week</p>' +
        '<p class="card__age">Ask us on WhatsApp</p>' +
        '<div class="door"><span>See the full list</span></div>' +
        "</a></li>"
    );
    grid.innerHTML = cards.join("");
  }

  /* share the data and mascot with the sections below */
  window.teddyPups = { puppies: puppies, mascot: MASCOT };
  document.querySelectorAll("[data-mascot]").forEach(function (el) { el.innerHTML = MASCOT; });
})();

/* "Train" effect: on desktop, scrolling down moves the puppy row sideways */
(function () {
  const section = document.getElementById("puppies");
  const wrap = document.getElementById("pupScroll");
  const track = document.getElementById("pupGrid");
  const navbar = document.getElementById("navbar");
  if (!section || !wrap || !track) return;

  const sticky = wrap.querySelector(".pups__sticky");
  const mq = window.matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)");
  let dist = 0;
  let queued = false;

  function update() {
    queued = false;
    if (!section.classList.contains("is-pinned")) return;
    const scrolled = navbar.offsetHeight - wrap.getBoundingClientRect().top;
    const progress = dist ? Math.min(1, Math.max(0, scrolled / dist)) : 0;
    track.style.transform = "translate3d(" + (-progress * dist) + "px,0,0)";
  }

  function measure() {
    if (!mq.matches) {
      section.classList.remove("is-pinned");
      wrap.style.height = "";
      track.style.transform = "";
      return;
    }
    section.classList.add("is-pinned");
    wrap.style.height = "";
    dist = Math.max(0, track.scrollWidth - track.parentElement.clientWidth);
    wrap.style.height = sticky.offsetHeight + dist + "px";
    update();
  }

  window.addEventListener("scroll", function () {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);
  mq.addEventListener("change", measure);
  measure();
})();

/* Your puppy journey: clickable steps + WhatsApp preview with breed pills */
(function () {
  const chat = document.getElementById("chat");
  const send = document.getElementById("phoneSend");
  const steps = Array.from(document.querySelectorAll(".step"));
  const items = Array.from(document.querySelectorAll(".step-item"));
  if (!chat || !send || !steps.length) return;

  const WHATSAPP = "https://wa.me/971000000000";
  const BREEDS = ["Maltipoo", "Pomeranian", "Poodle", "Cavapoo", "Shih Tzu"];
  const COLORS = ["#d58a3c", "#b8604a", "#7a4a35"];
  const PAW = '<circle cx="5" cy="10" r="2.3"/><circle cx="9.5" cy="5.5" r="2.3"/><circle cx="14.5" cy="5.5" r="2.3"/><circle cx="19" cy="10" r="2.3"/><path d="M12 11c-3.5 0-6 3.2-6 5.7 0 1.9 1.5 2.8 3 2.8 1.2 0 2-.5 3-.5s1.8.5 3 .5c1.5 0 3-.9 3-2.8 0-2.5-2.5-5.7-6-5.7z"/>';
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pups = (window.teddyPups && window.teddyPups.puppies) || [];
  let breed = "";
  let shown = -1;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function bubble(text, me, extra) {
    return '<p class="msg' + (me ? " msg--me" : "") + (extra ? " " + extra : "") + '">' + esc(text) + "</p>";
  }
  function shot(i, video) {
    const p = pups[i];
    return '<span class="shot' + (video ? " shot--video" : "") + '" style="--door:' + COLORS[i % COLORS.length] + '">' +
      (p && p.photo ? '<img src="' + esc(p.photo) + '" alt="' + esc(p.name) + '">' : "") + "</span>";
  }

  function answer() {
    if (!breed) return "";
    const names = pups
      .filter(function (p) { return p.breed.toLowerCase().indexOf(breed.toLowerCase()) !== -1; })
      .map(function (p) { return p.name; });
    const reply = names.length
      ? "We have " + names.length + " " + breed + (names.length === 1 ? " puppy" : " puppies") + " available right now: " + names.join(", ") + "."
      : "We don't have a " + breed + " in the showroom right now, but we can import one for you.";
    return bubble("I'm interested in a " + breed + ".", true, "js-answer") + bubble(reply, false, "js-answer");
  }

  function updateLink() {
    const text = "Hi TeddyPups! I'd love to know more about your puppies." + (breed ? " I'm interested in a " + breed + "." : "");
    send.href = WHATSAPP + "?text=" + encodeURIComponent(text);
  }

  const route = '<svg class="deliver" viewBox="0 0 240 80" aria-hidden="true">' +
    '<path d="M12 58C60 20 100 20 132 44S176 56 200 46" fill="none" stroke="#a8501f" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="1 7"/>' +
    '<circle cx="12" cy="58" r="5" fill="#a8501f"/>' +
    '<g fill="#d58a3c" transform="translate(70 12) scale(.9)">' + PAW + "</g>" +
    '<g fill="#d58a3c" transform="translate(142 46) scale(.9)">' + PAW + "</g>" +
    '<path d="M200 46l17-15 17 15v26h-34z" fill="#f2c46d" stroke="#2c221e" stroke-width="2.5" stroke-linejoin="round"/>' +
    '<path d="M217 66c-6-4-8-7-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 3-2 6-8 10z" fill="#a8501f"/></svg>';

  function group(n) {
    let html;
    if (n === 0) {
      const pills = BREEDS.map(function (b) {
        return '<button type="button" class="pill" data-breed="' + b + '" aria-pressed="' + (b === breed) + '">' + b + "</button>";
      }).join("");
      html = bubble("Hi TeddyPups! I'd love to know more about your puppies.", true) +
        '<div class="msg"><p>Select your preferred breed or tell us what you\'re looking for. We\'ll guide you based on availability and your lifestyle.</p><div class="pills">' + pills + "</div></div>" +
        answer();
    } else if (n === 1) {
      html = '<div class="msg msg--me shots">' + shot(0) + shot(1) + "</div>" +
        '<div class="msg msg--me shots">' + shot(2, true) + "</div>" +
        bubble("Our team will share real photos, health details, and all necessary information directly on WhatsApp.");
    } else {
      html = '<div class="msg"><p>Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.</p>' + route + "</div>";
    }
    return '<div class="grp" data-grp="' + n + '">' + html + "</div>";
  }

  /* show messages up to step n (adds new ones, removes later ones) */
  function show(n) {
    if (n === shown) return;
    while (shown < n) { shown++; chat.insertAdjacentHTML("beforeend", group(shown)); }
    while (shown > n) { const g = chat.querySelector('[data-grp="' + shown + '"]'); if (g) g.remove(); shown--; }
    steps.forEach(function (s, i) {
      s.classList.toggle("is-active", i === n);
      if (i === n) s.setAttribute("aria-current", "step"); else s.removeAttribute("aria-current");
    });
    chat.scrollTo({ top: chat.scrollHeight, behavior: calm ? "auto" : "smooth" });
    updateLink();
  }

  /* clicking a step */
  steps.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      show(i);
      if (items[i] && window.matchMedia("(min-width: 901px)").matches) {
        items[i].scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "center" });
      }
    });
  });

  /* scrolling: the step crossing the middle of the screen becomes active */
  if ("IntersectionObserver" in window && items.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) show(items.indexOf(e.target));
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    items.forEach(function (it) { io.observe(it); });
  }

  /* breed pills */
  chat.addEventListener("click", function (e) {
    const pill = e.target.closest(".pill");
    if (!pill) return;
    breed = breed === pill.dataset.breed ? "" : pill.dataset.breed;
    chat.querySelectorAll(".pill").forEach(function (p) { p.setAttribute("aria-pressed", String(p.dataset.breed === breed)); });
    chat.querySelectorAll(".js-answer").forEach(function (n) { n.remove(); });
    chat.querySelector('[data-grp="0"]').insertAdjacentHTML("beforeend", answer());
    chat.scrollTo({ top: chat.scrollHeight, behavior: calm ? "auto" : "smooth" });
    updateLink();
  });

  show(0);
})();
