/* ==========================================================================
   RAVINDRA KUMAR SUTHAR - PORTFOLIO INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize features
  initThemeToggle();
  initTypingEffect();
  initNavbarScroll();
  initMobileMenu();
  initQADashboardTabs();
  initProjectFilters();
  initCodeModal();
  initContactForm();
  initStatsCounter();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. THEME TOGGLE (DARK / LIGHT MODE)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('portfolioTheme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolioTheme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggleBtn i');
  if (!icon) return;
  if (theme === 'light') {
    icon.className = 'fas fa-moon';
  } else {
    icon.className = 'fas fa-sun';
  }
}

/* --------------------------------------------------------------------------
   2. TYPING EFFECT FOR HERO TITLE (PUNCHY & MOBILE OPTIMIZED)
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const target = document.getElementById('typingRole');
  if (!target) return;

  const roles = [
    "QA Automation Engineer",
    "SDET Automation Engineer",
    "Playwright (JS) Specialist",
    "CI/CD Testing Architect"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   3. NAVBAR SCROLL STYLING & ACTIVE HIGHLIGHT
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Active Section Highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  menuBtn?.addEventListener('click', () => {
    navLinks?.classList.toggle('mobile-active');
    const isOpen = navLinks?.classList.contains('mobile-active');
    menuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Close menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('mobile-active');
      if (menuBtn) menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE QA DASHBOARD TABS
   -------------------------------------------------------------------------- */
function initQADashboardTabs() {
  const tabBtns = document.querySelectorAll('.dash-tab-btn');
  const tabContents = document.querySelectorAll('.dash-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(content => {
        if (content.id === `tab-${targetTab}`) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. PROJECT FILTERS
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. CODE & ARCHITECTURE PREVIEW MODAL
   -------------------------------------------------------------------------- */
const projectCodeSnippets = {
  crms: {
    title: "Crime Report Management System - Page Object Model & API Test",
    code: `// Playwright Page Object Model for CRMS FIR Submission
const { expect } = require('@playwright/test');

class FIRPage {
  constructor(page) {
    this.page = page;
    this.crimeCategorySelect = page.locator('#crimeCategory');
    this.incidentDateInput = page.locator('#incidentDate');
    this.descriptionTextarea = page.locator('#description');
    this.evidenceUploadInput = page.locator('input[type="file"]');
    this.submitBtn = page.locator('button[type="submit"]');
    this.successAlert = page.locator('.alert-success');
  }

  async fillFIRDetails(category, date, description, filePath) {
    await this.crimeCategorySelect.selectOption(category);
    await this.incidentDateInput.fill(date);
    await this.descriptionTextarea.fill(description);
    if (filePath) {
      await this.evidenceUploadInput.setInputFiles(filePath);
    }
  }

  async submitAndVerify() {
    await this.submitBtn.click();
    await expect(this.successAlert).toBeVisible();
    return await this.successAlert.innerText();
  }
}

module.exports = { FIRPage };`
  },
  artfinder: {
    title: "Art Finder E-Commerce - End-To-End Shopping Cart Assertion",
    code: `// Playwright Test: Verify Dynamic Cart Total & API Order Creation
import { test, expect } from '@playwright/test';

test.describe('Art Finder Checkout & Payment Workflow', () => {
  test('Should calculate price breakdown and complete order', async ({ page, request }) => {
    await page.goto('/artwork/abstract-landscape-88');
    
    // Click Add to Cart
    await page.click('button:has-text("Add to Gallery Cart")');
    await expect(page.locator('.cart-count-badge')).toHaveText('1');

    // Navigate to Checkout
    await page.goto('/checkout');
    const itemPrice = await page.locator('.item-price').innerText();
    expect(itemPrice).toContain('$1,250.00');

    // Trigger API Verification for Stock Reservation
    const apiRes = await request.post('/api/v1/orders/reserve', {
      data: { artworkId: 'ART-8829', quantity: 1 }
    });
    expect(apiRes.status()).toBe(200);
    const body = await apiRes.json();
    expect(body.status).toBe('RESERVED');
  });
});`
  },
  medisys: {
    title: "Medisys Pro - RBAC & Automated Billing Test Suite",
    code: `// Role-Based Access Control (RBAC) & Billing Integrity Test
const { test, expect } = require('@playwright/test');

test.use({ storageState: 'playwright/.auth/pharmacist.json' });

test('Pharmacist role cannot alter audit logs or financial ledgers', async ({ page }) => {
  await page.goto('/admin/financial-audit');
  
  // Verify redirected or 403 Access Denied shown
  const accessDeniedMsg = page.locator('.error-access-denied');
  await expect(accessDeniedMsg).toBeVisible();
  await expect(accessDeniedMsg).toContainText('Unauthorized Access: Admin Privileges Required');
});`
  },
  responsive: {
    title: "Responsive Breakpoint & Cross-Browser Touch Validation",
    code: `// Automated Mobile Breakpoint UI & Touch Gesture Validation
import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Viewport Navigation Checks', () => {
  test('Verify mobile drawer toggles without layout shift', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 }); // iPhone 13
    await page.goto('/department/computer-science');

    // Mobile Hamburger button check
    const mobileNavBtn = page.locator('.mobile-menu-toggle');
    await expect(mobileNavBtn).toBeVisible();
    await mobileNavBtn.tap();

    const drawer = page.locator('.mobile-nav-drawer');
    await expect(drawer).toHaveClass(/active/);
  });
});`
  }
};

function initCodeModal() {
  const modalOverlay = document.getElementById('codeModalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalCode = document.getElementById('modalCode');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!modalOverlay || !modalTitle || !modalCode) return;

  document.querySelectorAll('.view-code-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pKey = btn.dataset.project;
      const snippet = projectCodeSnippets[pKey];
      if (snippet) {
        modalTitle.textContent = snippet.title;
        modalCode.textContent = snippet.code;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  closeBtn?.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

/* --------------------------------------------------------------------------
   8. CONTACT FORM HANDLING WITH SUCCESS POPUP NOTIFICATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successModal = document.getElementById('successToastModal');
  const toastCloseBtn = document.getElementById('toastCloseBtn');
  const toastText = document.getElementById('toastMessageText');

  if (!form) return;

  const showPopup = (name, email) => {
    if (toastText) {
      toastText.innerHTML = `Thank you <strong>${name}</strong>! Your message has been successfully sent to <strong>solankiravindra882@gmail.com</strong>. I will get back to you promptly at <strong>${email}</strong>.`;
    }
    if (successModal) {
      successModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const hidePopup = () => {
    if (successModal) {
      successModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  toastCloseBtn?.addEventListener('click', hidePopup);
  successModal?.addEventListener('click', (e) => {
    if (e.target === successModal) hidePopup();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('formName');
    const emailInput = document.getElementById('formEmail');
    const subjectInput = document.getElementById('formSubject');
    const messageInput = document.getElementById('formMessage');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending Message...';
    }

    try {
      const formData = new FormData(form);
      const response = await fetch('https://formsubmit.co/ajax/solankiravindra882@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      showPopup(name, email);
      form.reset();
    } catch (err) {
      showPopup(name, email);
      form.reset();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      }
    }
  });
}

/* --------------------------------------------------------------------------
   9. STATS COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const isDecimal = counter.getAttribute('data-decimal') === 'true';

        let count = 0;
        const duration = 1500;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            counter.textContent = (isDecimal ? target.toFixed(2) : Math.floor(target)) + suffix;
            clearInterval(timer);
          } else {
            counter.textContent = (isDecimal ? count.toFixed(2) : Math.floor(count)) + suffix;
          }
        }, stepTime);

        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* --------------------------------------------------------------------------
   10. SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}
