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


// 5. Typing Animation
const typingTextElement = document.getElementById('typing-text');
const words = ["Web Developer", "IT Administrator", "Full Stack Developer", "IT Specialist"];
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

// 7. Demo Notification Handler
const handleDemoLinks = () => {
  const demoLinks = document.querySelectorAll('.demo-link');
  
  const showDemoNotification = (e) => {
    e.preventDefault();
    let toast = document.getElementById('demo-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'demo-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--bg-surface);
        color: var(--text-light);
        padding: 15px 25px;
        border-radius: 12px;
        border: 1px solid var(--border-color);
        box-shadow: 0 10px 30px var(--shadow-color);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 10000;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      `;
      toast.innerHTML = `
        <span style="color: var(--primary); font-size: 18px;">💡</span>
        <span style="font-weight: 500; font-size: 15px;">Demo server is offline. Contact me for details!</span>
      `;
      document.body.appendChild(toast);
    }
    
    // Trigger animation
    setTimeout(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    }, 10);
    
    // Hide after 4 seconds
    setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
    }, 4000);
  };
  
  demoLinks.forEach(link => {
    link.addEventListener('click', showDemoNotification);
  });
};

window.addEventListener('DOMContentLoaded', handleDemoLinks);

// 8. Certificate Viewer (Lightbox for Images, Link for PDFs)
const handleCertificates = () => {
  const certLinks = document.querySelectorAll('.cert-viewer-link');
  
  certLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const url = link.getAttribute('href');
      const isPdf = url.toLowerCase().endsWith('.pdf');
      
      if (!isPdf) {
        // It's an image, show in lightbox modal
        e.preventDefault();
        
        let modal = document.getElementById('cert-modal');
        if (!modal) {
          modal = document.createElement('div');
          modal.id = 'cert-modal';
          modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(2, 6, 23, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 11000;
            opacity: 0;
            transition: opacity 0.3s ease;
          `;
          modal.innerHTML = `
            <button id="cert-modal-close" style="
              position: absolute;
              top: 20px;
              right: 20px;
              background: transparent;
              border: none;
              color: white;
              font-size: 35px;
              cursor: pointer;
              transition: color 0.2s;
            ">&times;</button>
            <img id="cert-modal-img" src="" alt="Certificate" style="
              max-width: 90%;
              max-height: 85%;
              border-radius: 12px;
              box-shadow: 0 10px 40px rgba(0,0,0,0.5);
              border: 1px solid var(--border-color);
              transform: scale(0.95);
              transition: transform 0.3s ease;
            " />
          `;
          document.body.appendChild(modal);
          
          const closeBtn = modal.querySelector('#cert-modal-close');
          closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            modal.querySelector('#cert-modal-img').style.transform = 'scale(0.95)';
            setTimeout(() => {
              modal.style.display = 'none';
            }, 300);
          });
          
          modal.addEventListener('click', (event) => {
            if (event.target === modal) {
              closeBtn.click();
            }
          });
        }
        
        const modalImg = modal.querySelector('#cert-modal-img');
        modalImg.src = url;
        modal.style.display = 'flex';
        
        // Trigger animations
        setTimeout(() => {
          modal.style.opacity = '1';
          modalImg.style.transform = 'scale(1)';
        }, 10);
      }
    });
  });
};

window.addEventListener('DOMContentLoaded', handleCertificates);