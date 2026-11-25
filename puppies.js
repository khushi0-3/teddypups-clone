document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP = "https://wa.me";

  /* 1. Navbar Scroll Shadow & Mobile Menu */
  const navbar = document.getElementById("navbar");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("menuToggle");

  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });
  }

  window.addEventListener(
    "scroll",
    () => {
      if (navbar) navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    },
    { passive: true }
  );

  /* 2. Exact 15 Puppy Listings */
  const RINGS = ["#f5d8b8", "#d7e6ec", "#d5e8ef", "#f5d8b8", "#d7e6ec"];
  const DOODLES = [
    { tl: "🐾", mr: "✦", bl: "♡" },
    { tl: "♡",  mr: "🐾", bl: "✦" },
    { tl: "✦",  mr: "♡",  bl: "🐾" }
  ];

  const puppies = [
    { name: "Max",                      breed: "Maltipoo",   sub: "Maltipoo · boy · 3 months",                 gender: "boy",  where: "Imported",      video: true,  photo: "image/max.jpg" },
    { name: "Korean Teacup Maltipoo",   breed: "Maltipoo",   sub: "girl · 2 months",                            gender: "girl", where: "Korean Teacup", video: true,  photo: "image/coco.jpg" },
    { name: "Korean Teacup Poodle",     breed: "Poodle",     sub: "girl · 2 months",                            gender: "girl", where: "Korean Teacup", video: false, photo: "image/mochi.jpg" },
    { name: "Maltipoo & Cavapoo",       breed: "Maltipoo",   sub: "boy · 3 months Maltipoo & 2 months Cavapoo", gender: "boy",  where: "Imported",      video: true,  photo: "image/Biscuit.jpg" },
    { name: "Toy Poodle",               breed: "Poodle",     sub: "boy & girl · 2 months",                      gender: "both", where: "Imported",      video: false, photo: "image/Teddy.jpg" },
    { name: "Maltipoo",                 breed: "Maltipoo",   sub: "girl · 3 months",                            gender: "girl", where: "Imported",      video: true,  photo: "image/Cleo.jpg" },
    { name: "Pomeranian",               breed: "Pomeranian", sub: "girl · 3 months",                            gender: "girl", where: "Imported",      video: false, photo: "image/Luna.jpg" },
    { name: "Copper",                   breed: "Cavapoo",    sub: "Cavapoo · boy · 2 months",                   gender: "boy",  where: "Imported",      video: false, photo: "image/Daisy.jpg" },
    { name: "Shih Tzu",                 breed: "Shih Tzu",   sub: "girl · 2 months",                            gender: "girl", where: "Imported",      video: false, photo: "image/Bella.jpg" },
    { name: "Shih Tzu",                 breed: "Shih Tzu",   sub: "boy · 2 months",                             gender: "boy",  where: "Imported",      video: false, photo: "image/Oreo.jpg" },
    { name: "Maltipoo",                 breed: "Maltipoo",   sub: "girl · 2.5 months",                          gender: "girl", where: "Imported",      video: false, photo: "image/Ginger.jpg" },
    { name: "Maltipoo",                 breed: "Maltipoo",   sub: "girl · 2 months",                            gender: "girl", where: "Imported",      video: false, photo: "image/Milo.jpg" },
    { name: "Korean Teacup Pomeranian", breed: "Pomeranian", sub: "girl · 2 months",                            gender: "girl", where: "Korean Teacup", video: false, photo: "image/Pearl.jpg" },
    { name: "Korean Teacup Pomeranian", breed: "Pomeranian", sub: "girl · 2 months",                            gender: "girl", where: "Korean Teacup", video: false, photo: "image/Simba.jpg" },
    { name: "Korean Teacup Pomeranian", breed: "Pomeranian", sub: "boy · 2 months",                             gender: "boy",  where: "Korean Teacup", video: false, photo: "image/Peanut.jpg" }
  ];

  const state = {
    where: "all",
    breed: null,
    gender: null
  };

  const grid = document.getElementById("catalogGrid");
  const countEl = document.getElementById("pupCount");

  function renderPuppies() {
    const filtered = puppies.filter((p) => {
      if (state.where !== "all" && p.where !== state.where) return false;
      if (state.breed && p.breed !== state.breed) return false;
      if (state.gender && p.gender !== state.gender && p.gender !== "both") return false;
      return true;
    });

    if (countEl) {
      countEl.textContent =
        filtered.length === 1
          ? "1 puppy looking for a home"
          : `${filtered.length} puppies looking for a home`;
    }

    if (!grid) return;

    if (filtered.length === 0) {
      grid.innerHTML = `<li style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--brown-soft);">No puppies match that exact filter combination right now—try clearing one filter!</li>`;
      return;
    }

    grid.innerHTML = filtered
      .map((p, idx) => {
        const ringColor = RINGS[idx % RINGS.length];
        const doodleSet = DOODLES[idx % DOODLES.length];
        const waUrl = `${WHATSAPP}?text=${encodeURIComponent(
          `Hi TeddyPups! I'd love to see photos & details for ${p.name} (${p.sub}).`
        )}`;

        return `
          <li>
            <a class="pup-circle-card" href="${waUrl}" target="_blank" rel="noopener">
              <div class="pup-ring" style="--ring: ${ringColor}">
                <span class="doodle doodle--tl" aria-hidden="true">${doodleSet.tl}</span>
                <span class="doodle doodle--mr" aria-hidden="true">${doodleSet.mr}</span>
                <span class="doodle doodle--bl" aria-hidden="true">${doodleSet.bl}</span>
                <div class="pup-ring__back"></div>
                <div class="pup-ring__photo">
                  <img src="${p.photo}" alt="${p.name}" loading="lazy" onerror="this.style.display='none'" />
                </div>
                <span class="pup-badge-avail">Available</span>
                ${p.video ? '<span class="pup-badge-video">▶ video</span>' : ""}
              </div>
              <h3 class="pup-circle-card__name">${p.name}</h3>
              <p class="pup-circle-card__meta">${p.sub}</p>
            </a>
          </li>
        `;
      })
      .join("");
  }

  /* 3. Dynamic Pill Filter Buttons */
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const groupName = group.dataset.filterGroup;
    const buttons = group.querySelectorAll(".pill");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = btn.dataset.value;

        if (groupName === "where") {
          buttons.forEach((b) => b.classList.remove("is-active"));
          btn.classList.add("is-active");
          state.where = val;
        } else {
          const alreadyActive = btn.classList.contains("is-active");
          buttons.forEach((b) => b.classList.remove("is-active"));
          if (alreadyActive) {
            state[groupName] = null;
          } else {
            btn.classList.add("is-active");
            state[groupName] = val;
          }
        }

        renderPuppies();
      });
    });
  });

  renderPuppies();
});
