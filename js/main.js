(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

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
