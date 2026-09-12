(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    nav.classList.remove("open");
  }

  function openNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    nav.classList.add("open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeNav();
      else openNav();
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var form = document.getElementById("quote-form");
  var statusEl = document.getElementById("form-status");

  function buildBody(data) {
    return [
      "Prism Mobile Quote Request",
      "-------------------------",
      "Name: " + (data.name || ""),
      "Company: " + (data.company || ""),
      "Phone: " + (data.phone || ""),
      "Email: " + (data.email || ""),
      "Need type: " + (data.need_type || ""),
      "Dates: " + (data.dates || ""),
      "Location: " + (data.location || ""),
      "",
      "Message:",
      data.message || "(none)",
    ].join("\n");
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      var action = (form.getAttribute("action") || "").trim();
      var isMailto = action.toLowerCase().indexOf("mailto:") === 0;
      var isFormspree = /formspree\.io/i.test(action);

      // Formspree (or other remote endpoint): allow native POST
      if (isFormspree || (!isMailto && action && action !== "#")) {
        if (statusEl) {
          statusEl.classList.remove("error");
          statusEl.textContent = "Sending…";
        }
        return;
      }

      // Default: mailto fallback with a composed body
      e.preventDefault();

      var fd = new FormData(form);
      var data = {};
      fd.forEach(function (value, key) {
        data[key] = String(value).trim();
      });

      if (!data.name || !data.phone || !data.email || !data.need_type) {
        if (statusEl) {
          statusEl.classList.add("error");
          statusEl.textContent = "Please fill in all required fields.";
        }
        return;
      }

      var subject = encodeURIComponent("Prism Mobile Quote Request");
      var body = encodeURIComponent(buildBody(data));
      var mailto =
        "mailto:mitch@prismmobileusa.com,benjamin@prismmobileusa.com" +
        "?subject=" +
        subject +
        "&body=" +
        body;

      if (statusEl) {
        statusEl.classList.remove("error");
        statusEl.textContent = "Opening your email app…";
      }

      window.location.href = mailto;
    });
  }
})();
