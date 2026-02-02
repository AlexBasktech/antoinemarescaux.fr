/**
 * PHOTOGRAPHE DRONE NORD GIRONDE - Main JavaScript
 * Fonctionnalités principales : Navigation, Animations, Utilities
 */

(function() {
  'use strict';

  // ==========================================================================
  // Navigation Mobile
  // ==========================================================================

  const initMobileMenu = () => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Fermer le menu au clic en dehors
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        toggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  };

  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================

  const initHeaderScroll = () => {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  };

  // ==========================================================================
  // Active Navigation Link
  // ==========================================================================

  const setActiveNavLink = () => {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (currentPath.includes(href) || (currentPath === '/' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // ==========================================================================
  // Smooth Scroll pour les ancres
  // ==========================================================================

  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // ==========================================================================
  // Lazy Loading Images
  // ==========================================================================

  const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  };

  // ==========================================================================
  // Scroll Animations
  // ==========================================================================

  const initScrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, {
      threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
  };

  // ==========================================================================
  // Toast Notifications
  // ==========================================================================

  window.showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠'
    };

    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.success}</div>
      <div class="toast-message">${message}</div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // ==========================================================================
  // Modal Utilities
  // ==========================================================================

  window.openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Fermer modal au clic en dehors
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ==========================================================================
  // Form Validation
  // ==========================================================================

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[\d\s\+\-\(\)]{10,}$/;
    return re.test(phone);
  };

  window.validateForm = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return false;

    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      const errorElement = field.parentElement.querySelector('.form-error');

      // Reset error
      if (errorElement) {
        errorElement.textContent = '';
      }
      field.style.borderColor = '';

      // Validation
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = 'var(--error)';
        if (errorElement) {
          errorElement.textContent = 'Ce champ est requis';
        }
      } else if (field.type === 'email' && !validateEmail(field.value)) {
        isValid = false;
        field.style.borderColor = 'var(--error)';
        if (errorElement) {
          errorElement.textContent = 'Email invalide';
        }
      } else if (field.type === 'tel' && !validatePhone(field.value)) {
        isValid = false;
        field.style.borderColor = 'var(--error)';
        if (errorElement) {
          errorElement.textContent = 'Téléphone invalide';
        }
      }
    });

    return isValid;
  };

  // ==========================================================================
  // Loading Overlay
  // ==========================================================================

  window.showLoading = () => {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.id = 'loading-overlay';
    overlay.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(overlay);
  };

  window.hideLoading = () => {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.remove();
    }
  };

  // ==========================================================================
  // Format Price
  // ==========================================================================

  window.formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  // ==========================================================================
  // Debounce Function
  // ==========================================================================

  window.debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // ==========================================================================
  // Local Storage Utilities
  // ==========================================================================

  window.storage = {
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.error('LocalStorage error:', e);
        return false;
      }
    },

    get: (key) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.error('LocalStorage error:', e);
        return null;
      }
    },

    remove: (key) => {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.error('LocalStorage error:', e);
        return false;
      }
    },

    clear: () => {
      try {
        localStorage.clear();
        return true;
      } catch (e) {
        console.error('LocalStorage error:', e);
        return false;
      }
    }
  };

  // ==========================================================================
  // Analytics Event Tracking
  // ==========================================================================

  window.trackEvent = (category, action, label = '', value = 0) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  };

  // ==========================================================================
  // Copy to Clipboard
  // ==========================================================================

  window.copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copié dans le presse-papiers', 'success');
      }).catch(() => {
        showToast('Erreur de copie', 'error');
      });
    } else {
      // Fallback pour anciens navigateurs
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('Copié dans le presse-papiers', 'success');
    }
  };

  // ==========================================================================
  // Share API
  // ==========================================================================

  window.share = async (title, text, url) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        trackEvent('Engagement', 'share', url);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      copyToClipboard(url);
      showToast('Lien copié !', 'success');
    }
  };

  // ==========================================================================
  // Initialize All
  // ==========================================================================

  const init = () => {
    // DOM Ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    initMobileMenu();
    initHeaderScroll();
    setActiveNavLink();
    initSmoothScroll();
    initLazyLoading();
    initScrollAnimations();

    console.log('✓ Photographe Drone Nord Gironde - Initialized');
  };

  // Start
  init();

})();
