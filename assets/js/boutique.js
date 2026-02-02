/**
 * PHOTOGRAPHE DRONE NORD GIRONDE - Boutique & Panier
 * Gestion du panier, produits, et checkout
 */

(function() {
  'use strict';

  // ==========================================================================
  // Données Produits
  // ==========================================================================

  const PRODUCTS = [
    {
      id: 'pack-mariage',
      name: 'Pack Mariage Complet',
      category: 'Mariage',
      price: 1200,
      image: 'assets/images/services/mariage.jpg',
      description: 'Couverture complète de votre mariage avec photos et vidéos drone',
      features: [
        'Préparatifs + Cérémonie + Réception',
        'Photos haute résolution (500+)',
        'Vidéo drone 4K du lieu',
        'Album photo premium 30x30cm',
        'Galerie en ligne privée',
        'Retouches professionnelles'
      ],
      badge: 'Populaire'
    },
    {
      id: 'pack-immobilier',
      name: 'Pack Immobilier Premium',
      category: 'Immobilier',
      price: 350,
      image: 'assets/images/services/immobilier.jpg',
      description: 'Photos et vidéo drone pour valoriser votre bien immobilier',
      features: [
        'Photos intérieures HDR (20+)',
        'Photos extérieures (10+)',
        'Vidéo drone 4K (2-3 min)',
        'Plan de masse aérien',
        'Visite virtuelle 360°',
        'Livraison sous 48h'
      ],
      badge: 'Best-seller'
    },
    {
      id: 'pack-entreprise',
      name: 'Pack Entreprise',
      category: 'Entreprise',
      price: 800,
      image: 'assets/images/services/entreprise.jpg',
      description: 'Valorisez votre entreprise avec des visuels professionnels',
      features: [
        'Reportage photo complet',
        'Portraits équipe (jusqu\'à 20 pers.)',
        'Photos locaux et installations',
        'Vidéo drone site industriel',
        'Photos produits/services',
        'Droits commerciaux inclus'
      ]
    },
    {
      id: 'seance-photo',
      name: 'Séance Photo',
      category: 'Portrait',
      price: 200,
      image: 'assets/images/services/portrait.jpg',
      description: 'Séance photo professionnelle personnalisée',
      features: [
        'Durée : 1h30',
        'Lieu au choix (studio ou extérieur)',
        '30+ photos retouchées',
        'Galerie en ligne privée',
        'Conseils pose et tenue',
        'Changements de tenue possibles'
      ]
    },
    {
      id: 'prestation-drone',
      name: 'Prestation Drone',
      category: 'Drone',
      price: 250,
      image: 'assets/images/drone/drone-shot.jpg',
      description: 'Prise de vue aérienne professionnelle',
      features: [
        'Photos aériennes 4K (20+)',
        'Vidéo 4K stabilisée (3-5 min)',
        'Pilote certifié DGAC',
        'Montage vidéo inclus',
        'Assurance professionnelle',
        'Respect réglementation'
      ],
      badge: 'Spécialité'
    },
    {
      id: 'tirages-photo',
      name: 'Tirages Photo',
      category: 'Produits',
      price: 15,
      image: 'assets/images/portfolio/sample1.jpg',
      description: 'Tirages professionnels haute qualité',
      features: [
        'Papier photo premium',
        'Formats : 10x15 à 50x75 cm',
        'Finition mate ou brillante',
        'Encadrement disponible',
        'Livraison sécurisée',
        'Garantie qualité'
      ]
    },
    {
      id: 'carte-cadeau',
      name: 'Carte Cadeau',
      category: 'Cadeau',
      price: 100,
      image: 'assets/images/services/gift-card.jpg',
      description: 'Offrez une expérience photo unique',
      features: [
        'Valable 1 an',
        'Montant personnalisable',
        'Utilisable sur tous services',
        'Carte digitale immédiate',
        'Transférable',
        'Aucune date d\'expiration'
      ]
    }
  ];

  // ==========================================================================
  // Classe Cart (Panier)
  // ==========================================================================

  class Cart {
    constructor() {
      this.items = this.loadFromStorage();
      this.listeners = [];
    }

    // Charger le panier depuis localStorage
    loadFromStorage() {
      return window.storage.get('cart') || [];
    }

    // Sauvegarder dans localStorage
    saveToStorage() {
      window.storage.set('cart', this.items);
      this.notifyListeners();
    }

    // Ajouter un produit
    addItem(productId, quantity = 1) {
      const product = PRODUCTS.find(p => p.id === productId);
      if (!product) return false;

      const existingItem = this.items.find(item => item.id === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          ...product,
          quantity
        });
      }

      this.saveToStorage();
      window.showToast(`${product.name} ajouté au panier`, 'success');
      window.trackEvent('Ecommerce', 'add_to_cart', product.name, product.price);

      return true;
    }

    // Retirer un produit
    removeItem(productId) {
      const index = this.items.findIndex(item => item.id === productId);
      if (index !== -1) {
        const product = this.items[index];
        this.items.splice(index, 1);
        this.saveToStorage();
        window.showToast(`${product.name} retiré du panier`, 'success');
        return true;
      }
      return false;
    }

    // Mettre à jour la quantité
    updateQuantity(productId, quantity) {
      const item = this.items.find(i => i.id === productId);
      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId);
        } else {
          item.quantity = quantity;
          this.saveToStorage();
        }
        return true;
      }
      return false;
    }

    // Vider le panier
    clear() {
      this.items = [];
      this.saveToStorage();
      window.showToast('Panier vidé', 'success');
    }

    // Obtenir le total
    getTotal() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Obtenir le nombre d'articles
    getItemCount() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Écouter les changements
    onChange(callback) {
      this.listeners.push(callback);
    }

    notifyListeners() {
      this.listeners.forEach(callback => callback(this.items));
    }
  }

  // Instance globale du panier
  window.cart = new Cart();

  // ==========================================================================
  // UI du Panier
  // ==========================================================================

  const CartUI = {
    sidebar: null,
    overlay: null,
    badge: null,

    init() {
      this.sidebar = document.querySelector('.cart-sidebar');
      this.overlay = document.querySelector('.cart-overlay');
      this.badge = document.querySelector('.cart-badge .badge');

      this.setupEventListeners();
      this.render();

      // Écouter les changements du panier
      window.cart.onChange(() => {
        this.render();
      });
    },

    setupEventListeners() {
      // Ouvrir le panier
      const cartIcon = document.querySelector('.cart-icon');
      if (cartIcon) {
        cartIcon.addEventListener('click', () => this.open());
      }

      // Fermer le panier
      const closeBtn = document.querySelector('.cart-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close());
      }

      if (this.overlay) {
        this.overlay.addEventListener('click', () => this.close());
      }

      // Bouton vider le panier
      const clearBtn = document.querySelector('.clear-cart-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          if (confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
            window.cart.clear();
          }
        });
      }
    },

    open() {
      if (this.sidebar) this.sidebar.classList.add('active');
      if (this.overlay) this.overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    },

    close() {
      if (this.sidebar) this.sidebar.classList.remove('active');
      if (this.overlay) this.overlay.classList.remove('active');
      document.body.style.overflow = '';
    },

    render() {
      this.updateBadge();
      this.updateCartItems();
      this.updateCartTotal();
    },

    updateBadge() {
      if (this.badge) {
        const count = window.cart.getItemCount();
        this.badge.textContent = count;
        this.badge.style.display = count > 0 ? 'flex' : 'none';
      }
    },

    updateCartItems() {
      const container = document.querySelector('.cart-items');
      if (!container) return;

      if (window.cart.items.length === 0) {
        container.innerHTML = `
          <div class="cart-empty">
            <div class="cart-empty-icon">🛒</div>
            <p>Votre panier est vide</p>
          </div>
        `;
        return;
      }

      container.innerHTML = window.cart.items.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">${window.formatPrice(item.price)}</div>
            <div class="cart-item-quantity">
              <button class="quantity-btn" onclick="window.cart.updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
              <input type="number" class="quantity-input" value="${item.quantity}" min="1"
                     onchange="window.cart.updateQuantity('${item.id}', parseInt(this.value))">
              <button class="quantity-btn" onclick="window.cart.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="window.cart.removeItem('${item.id}')" title="Retirer">×</button>
        </div>
      `).join('');
    },

    updateCartTotal() {
      const totalElement = document.querySelector('.cart-total-amount');
      if (totalElement) {
        totalElement.textContent = window.formatPrice(window.cart.getTotal());
      }

      // Désactiver le bouton de paiement si panier vide
      const checkoutBtn = document.querySelector('.checkout-btn');
      if (checkoutBtn) {
        checkoutBtn.disabled = window.cart.items.length === 0;
      }
    }
  };

  // ==========================================================================
  // Affichage des Produits
  // ==========================================================================

  const ProductsUI = {
    init() {
      this.renderProducts();
      this.setupAddToCartButtons();
    },

    renderProducts() {
      const container = document.querySelector('.products-grid');
      if (!container) return;

      container.innerHTML = PRODUCTS.map(product => `
        <div class="product-card" data-id="${product.id}">
          <div class="product-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
          </div>
          <div class="product-body">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <ul class="product-features">
              ${product.features.slice(0, 4).map(f => `<li>${f}</li>`).join('')}
            </ul>
            <div class="product-footer">
              <div class="product-price">${window.formatPrice(product.price)}</div>
              <button class="add-to-cart-btn" data-product-id="${product.id}">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      `).join('');
    },

    setupAddToCartButtons() {
      document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const productId = e.target.dataset.productId;
          window.cart.addItem(productId);

          // Animation du bouton
          btn.textContent = '✓ Ajouté';
          btn.style.background = 'var(--success)';
          setTimeout(() => {
            btn.textContent = 'Ajouter';
            btn.style.background = '';
          }, 2000);
        });
      });
    }
  };

  // ==========================================================================
  // Initialisation
  // ==========================================================================

  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    CartUI.init();
    ProductsUI.init();

    console.log('✓ Boutique initialized');
  };

  init();

  // Exposer les produits globalement
  window.PRODUCTS = PRODUCTS;

})();
