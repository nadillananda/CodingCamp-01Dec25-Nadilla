const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
const navAnchors = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section');

function closeNav() {
  navLinks.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navAnchors.forEach(link => {
  link.addEventListener('click', evt => {
    evt.preventDefault();
    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;
    targetEl.scrollIntoView({ behavior: 'smooth' });
    closeNav();
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`.nav__link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('is-active', entry.isIntersecting && entry.intersectionRatio > 0.4);
      }
    });
  },
  { threshold: [0.4, 0.6] }
);

sections.forEach(section => observer.observe(section));

// Contact Form Validation and Display
const contactForm = document.getElementById('contactForm');
const formErrors = document.getElementById('formErrors');
const formResult = document.getElementById('formResult');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const resultName = document.getElementById('resultName');
const resultEmail = document.getElementById('resultEmail');
const resultMessage = document.getElementById('resultMessage');
const resetFormBtn = document.getElementById('resetForm');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Clear error messages
function clearErrors() {
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';
  formErrors.textContent = '';
  formErrors.style.display = 'none';
  nameInput.classList.remove('error');
  emailInput.classList.remove('error');
  messageInput.classList.remove('error');
}

// Show error for a specific field
function showError(field, message) {
  const errorElement = document.getElementById(`${field}Error`);
  const inputElement = document.getElementById(field);
  errorElement.textContent = message;
  inputElement.classList.add('error');
}

// Validate form
function validateForm() {
  clearErrors();
  let isValid = true;
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Validate name
  if (name === '') {
    showError('name', 'Name is required');
    isValid = false;
  } else if (name.length < 2) {
    showError('name', 'Name must be at least 2 characters');
    isValid = false;
  }

  // Validate email
  if (email === '') {
    showError('email', 'Email is required');
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  }

  // Validate message
  if (message === '') {
    showError('message', 'Message is required');
    isValid = false;
  } else if (message.length < 10) {
    showError('message', 'Message must be at least 10 characters');
    isValid = false;
  }

  return isValid;
}

// Handle form submission
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (validateForm()) {
    // Get form values
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    // Display results
    resultName.textContent = name;
    resultEmail.textContent = email;
    resultMessage.textContent = message;

    // Hide form and show results
    contactForm.style.display = 'none';
    formResult.style.display = 'block';

    // Scroll to result
    formResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } else {
    // Show general error message
    formErrors.textContent = 'Please fix the errors above before submitting.';
    formErrors.style.display = 'block';
    formErrors.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

// Reset form
resetFormBtn?.addEventListener('click', () => {
  contactForm.reset();
  clearErrors();
  contactForm.style.display = 'block';
  formResult.style.display = 'none';
  nameInput.focus();
});

// Real-time validation on blur
nameInput?.addEventListener('blur', () => {
  const name = nameInput.value.trim();
  if (name !== '' && name.length < 2) {
    showError('name', 'Name must be at least 2 characters');
  } else if (name !== '') {
    nameError.textContent = '';
    nameInput.classList.remove('error');
  }
});

emailInput?.addEventListener('blur', () => {
  const email = emailInput.value.trim();
  if (email !== '' && !emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address');
  } else if (email !== '') {
    emailError.textContent = '';
    emailInput.classList.remove('error');
  }
});

messageInput?.addEventListener('blur', () => {
  const message = messageInput.value.trim();
  if (message !== '' && message.length < 10) {
    showError('message', 'Message must be at least 10 characters');
  } else if (message !== '') {
    messageError.textContent = '';
    messageInput.classList.remove('error');
  }
});