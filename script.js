// SafeSphere Technologies — basic mobile navigation and demo contact form.

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Open or close the mobile navigation.
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isOpen);
});

// Close the mobile menu after a navigation link is selected.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navLinks.classList.remove("is-open");
  });
});

// Add the current year automatically in the footer.
document.getElementById("year").textContent = new Date().getFullYear();

const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");
const requiredFields = [
  document.getElementById("fullName"),
  document.getElementById("organization"),
  document.getElementById("email"),
  document.getElementById("message")
];

function showFeedback(message, type) {
  formFeedback.textContent = message;
  formFeedback.className = `form-feedback is-visible is-${type}`;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let firstInvalidField = null;

  requiredFields.forEach((field) => {
    const value = field.value.trim();
    let valid = value.length > 0;

    if (field.type === "email" && valid) {
      valid = isValidEmail(value);
    }

    field.setAttribute("aria-invalid", String(!valid));
    if (!valid && !firstInvalidField) {
      firstInvalidField = field;
    }
  });

  if (firstInvalidField) {
    const isEmail = firstInvalidField.type === "email";
    showFeedback(
      isEmail && firstInvalidField.value.trim()
        ? "Please enter a valid email address."
        : "Please complete all required fields.",
      "error"
    );
    firstInvalidField.focus();
    return;
  }

  showFeedback(
    "Thank you! The demo form is valid. No email has been sent and your details have not been stored.",
    "success"
  );
  contactForm.reset();
  requiredFields.forEach((field) => field.removeAttribute("aria-invalid"));
});

// Clear a field's invalid state as the user corrects it.
requiredFields.forEach((field) => {
  field.addEventListener("input", () => {
    field.removeAttribute("aria-invalid");
    if (formFeedback.classList.contains("is-error")) {
      formFeedback.className = "form-feedback";
      formFeedback.textContent = "";
    }
  });
});
