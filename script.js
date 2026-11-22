const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");

navToggle.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
}

let savedDark = false;
try {
  savedDark = localStorage.getItem("theme") === "dark";
} catch (error) {
  savedDark = false;
}
applyTheme(savedDark);

themeToggle.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark");
  applyTheme(isDark);
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (error) {
    return;
  }
});

const filterButtons = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");
const noResults = document.getElementById("noResults");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach(function (other) {
      const active = other === button;
      other.classList.toggle("active", active);
      other.setAttribute("aria-pressed", String(active));
    });

    cards.forEach(function (card) {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !show);
      if (show) {
        visibleCount++;
      }
    });

    noResults.hidden = visibleCount !== 0;
  });
});

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

function setError(id, message) {
  const input = document.getElementById(id);
  const error = document.getElementById(id + "Error");
  error.textContent = message;
  input.parentElement.classList.toggle("invalid", message !== "");
  input.setAttribute("aria-invalid", message !== "" ? "true" : "false");
}

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;

  if (name === "") {
    setError("name", "Please enter your name.");
    valid = false;
  } else {
    setError("name", "");
  }

  if (!emailPattern.test(email)) {
    setError("email", "Please enter a valid email address.");
    valid = false;
  } else {
    setError("email", "");
  }

  if (message.length < 10) {
    setError("message", "Your message should be at least 10 characters.");
    valid = false;
  } else {
    setError("message", "");
  }

  return valid;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  status.textContent = "";

  if (validateForm()) {
    status.textContent = "Thank you! Your message is ready to send.";
    form.reset();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
