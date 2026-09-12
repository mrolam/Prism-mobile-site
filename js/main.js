(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var panels = {
    home: document.getElementById("panel-home"),
    unit: document.getElementById("panel-unit"),
    contact: document.getElementById("panel-contact"),
  };

  function showTab(name) {
    if (!panels[name]) name = "home";
    tabs.forEach(function (tab) {
      var on = tab.getAttribute("data-tab") === name;
      tab.classList.toggle("is-active", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
    });
    Object.keys(panels).forEach(function (key) {
      var panel = panels[key];
      if (!panel) return;
      var on = key === name;
      panel.classList.toggle("is-active", on);
      if (on) panel.removeAttribute("hidden");
      else panel.setAttribute("hidden", "");
    });
    if (history.replaceState) {
      history.replaceState(null, "", "#" + name);
    }
    window.scrollTo(0, 0);
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      showTab(tab.getAttribute("data-tab"));
    });
  });

  document.querySelectorAll("[data-tab]").forEach(function (el) {
    if (el.classList.contains("tab")) return;
    el.addEventListener("click", function (e) {
      var name = el.getAttribute("data-tab");
      if (!name || !panels[name]) return;
      e.preventDefault();
      showTab(name);
    });
  });

  var hash = (location.hash || "").replace(/^#/, "");
  if (hash === "panel-home") hash = "home";
  if (hash === "panel-unit" || hash === "unit") hash = "unit";
  if (hash === "panel-contact" || hash === "contact" || hash === "quote") hash = "contact";
  if (hash === "work") hash = "unit";
  showTab(panels[hash] ? hash : "home");

  var form = document.getElementById("quote-form");
  var statusEl = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    var action = (form.getAttribute("action") || "").trim();
    if (/formspree\.io/i.test(action)) return;

    e.preventDefault();
    var fd = new FormData(form);
    var data = {};
    fd.forEach(function (value, key) {
      data[key] = String(value).trim();
    });

    if (!data.name || !data.phone || !data.email) {
      if (statusEl) {
        statusEl.classList.add("error");
        statusEl.textContent = "Name, email, and phone are required.";
      }
      return;
    }

    var body = encodeURIComponent(
      [
        "Prism Mobile Quote Request",
        "Name: " + data.name,
        "Email: " + data.email,
        "Phone: " + data.phone,
        "Need: " + (data.need_type || ""),
        "",
        data.message || "",
      ].join("\n")
    );

    if (statusEl) {
      statusEl.classList.remove("error");
      statusEl.textContent = "Opening your email app…";
    }

    window.location.href =
      "mailto:mitch@prismmobileusa.com,benjamin@prismmobileusa.com" +
      "?subject=" +
      encodeURIComponent("Prism Mobile Quote Request") +
      "&body=" +
      body;
  });
})();
