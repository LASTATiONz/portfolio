const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const themeToggle = document.getElementById('theme-toggle');

// Toggle mobile menu
const toggleMobileMenu = () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
  document.body.classList.toggle('menu-open');
};

// Close mobile menu
const closeMobileMenu = () => {
  hamburger.classList.remove('active');
  navLinks.classList.remove('active');
  document.body.classList.remove('menu-open');
};

// 1. Toggle mobile navigation menu window open or closed
hamburger.addEventListener('click', toggleMobileMenu);

// 2. Auto-close the drawer panel interface once an anchor option is selected
navItems.forEach(item => {
  item.addEventListener('click', closeMobileMenu);
});

// 3. Dark/Light theme toggle logic
const getTheme = () => document.documentElement.getAttribute('data-theme') || 'dark';

themeToggle.addEventListener('click', () => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update meta theme-color tag dynamically
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', newTheme === 'light' ? '#f8fafc' : '#0f172a');
  }
});

// 4. Contact Form validation and submission simulation
const contactForm = document.getElementById('contact-form');
const formSubmitBtn = document.getElementById('form-submit');
const formToast = document.getElementById('form-toast');

if (contactForm && formSubmitBtn) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitText = formSubmitBtn.querySelector('span');
    const spinner = formSubmitBtn.querySelector('.spinner');
    
    // Disable button and show spinner
    formSubmitBtn.disabled = true;
    if (submitText) submitText.textContent = 'Sending...';
    if (spinner) spinner.style.display = 'inline-block';
    
    // Simulate server request
    setTimeout(() => {
      // Restore button state
      formSubmitBtn.disabled = false;
      if (submitText) submitText.textContent = 'Send Message';
      if (spinner) spinner.style.display = 'none';
      
      // Reset form input values
      contactForm.reset();
      
      // Show success toast
      if (formToast) {
        formToast.classList.add('show');
        
        // Hide after 4 seconds
        setTimeout(() => {
          formToast.classList.remove('show');
        }, 4000);
      }
    }, 1500);
  });
}

// 5. Typing Animation
const typingTextElement = document.getElementById('typing-text');
const words = ["Junior Full Stack Developer", "Frontend Developer", "Computer Engineer", "Fast Learner"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

const typeEffect = () => {
  if (!typingTextElement) return;
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = 50; // Erasing is faster
  } else {
    typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100; // Standard typing speed
  }
  
  if (!isDeleting && charIndex === currentWord.length) {
    typingDelay = 1800; // Pause at the end of the word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingDelay = 500; // Short break before starting next word
  }
  
  setTimeout(typeEffect, typingDelay);
};

// Start typing animation on window load
window.addEventListener('DOMContentLoaded', typeEffect);

// 6. Scroll Reveal Observer
const initScrollReveal = () => {
  const reveals = document.querySelectorAll('.reveal');
  
  if (!('IntersectionObserver' in window)) {
    // Fallback if IntersectionObserver is not supported by legacy browsers
    reveals.forEach(el => el.classList.add('active'));
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Animates only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });
  
  reveals.forEach(reveal => observer.observe(reveal));
};

window.addEventListener('DOMContentLoaded', initScrollReveal);