// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
  if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const isActive = item.classList.contains('active');

    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(faq => {
      faq.classList.remove('active');
    });

    // Toggle current item
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Show success message
  const wrapper = contactForm.parentElement;
  wrapper.innerHTML = `
    <div class="form-success">
      <div class="success-icon">\u2705</div>
      <h3>Message Sent!</h3>
      <p>Thank you, ${data.name}! Hussain will get back to you within 24 hours to schedule your lesson.</p>
    </div>
  `;
});

// ===== Intersection Observer for Scroll Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply to animatable elements
document.querySelectorAll(
  '.level-card, .resource-card, .testimonial-card, .pricing-card, .step, .about-feature'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
