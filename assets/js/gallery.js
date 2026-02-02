/**
 * PHOTOGRAPHE DRONE NORD GIRONDE - Galerie Portfolio
 * Gestion de la galerie photos avec filtres et lightbox
 */

(function() {
  'use strict';

  // ==========================================================================
  // Données Portfolio (Exemple - À remplacer par vos vraies images)
  // ==========================================================================

  const PORTFOLIO_ITEMS = [
    // Drone
    { id: 1, category: 'drone', image: 'assets/images/portfolio/AirBus1.png', title: 'AirBus Vue Aérienne', description: 'Photographie aérienne industrielle' },
    { id: 2, category: 'drone', image: 'assets/images/portfolio/Photo aérienne1.png', title: 'Paysage Aérien', description: 'Vue panoramique depuis le ciel' },
    { id: 3, category: 'drone', image: 'assets/images/portfolio/Drone coucher soleil.jpeg', title: 'Coucher de Soleil', description: 'Golden hour vue du ciel' },
    { id: 4, category: 'drone', image: 'assets/images/portfolio/Brume Antoine.jpg', title: 'Brume Matinale', description: 'Atmosphère brumeuse capturée au drone' },
    { id: 5, category: 'drone', image: 'assets/images/portfolio/Bx by night.png', title: 'Bordeaux By Night', description: 'Vue nocturne de Bordeaux' },

    // Vignobles
    { id: 6, category: 'vignobles', image: 'assets/images/portfolio/Vign1.jpeg', title: 'Vignobles de Gironde', description: 'Rangées de vignes en été' },
    { id: 7, category: 'vignobles', image: 'assets/images/portfolio/Vign2.jpg', title: 'Domaine Viticole', description: 'Vue panoramique du vignoble' },
    { id: 8, category: 'vignobles', image: 'assets/images/portfolio/Vign3.jpg', title: 'Vignes en Automne', description: 'Couleurs automnales des vignes' },
    { id: 9, category: 'vignobles', image: 'assets/images/portfolio/Vign4.jpg', title: 'Rangées de Vignes', description: 'Perspective des rangées de vignes' },
    { id: 10, category: 'vignobles', image: 'assets/images/portfolio/Bout+verre1.jpg', title: 'Dégustation', description: 'Bouteille et verre de vin' },

    // Entreprise / Produit
    { id: 11, category: 'entreprise', image: 'assets/images/portfolio/Bout1.png', title: 'Photographie Produit', description: 'Mise en valeur de bouteille premium' },
    { id: 12, category: 'entreprise', image: 'assets/images/portfolio/Bout2.png', title: 'Packaging Élégant', description: 'Bouteille de vin haut de gamme' },
    { id: 13, category: 'entreprise', image: 'assets/images/portfolio/Bout3.png', title: 'Collection Premium', description: 'Série de bouteilles d\'exception' },
    { id: 14, category: 'entreprise', image: 'assets/images/portfolio/Bout4.png', title: 'Création Artisanale', description: 'Produit viticole artisanal' },
    { id: 15, category: 'entreprise', image: 'assets/images/portfolio/Bouchon1.png', title: 'Détail Bouchon', description: 'Macro photographie bouchon de vin' },
    { id: 16, category: 'entreprise', image: 'assets/images/portfolio/Verre1.png', title: 'Verre de Vin', description: 'Photographie de vin en verre' },
    { id: 17, category: 'entreprise', image: 'assets/images/portfolio/Verre2.png', title: 'Vin Rouge', description: 'Élégance du vin rouge' },
    { id: 18, category: 'entreprise', image: 'assets/images/portfolio/Verre3.png', title: 'Vin Blanc', description: 'Fraîcheur du vin blanc' },
    { id: 19, category: 'entreprise', image: 'assets/images/portfolio/Verre4.png', title: 'Dégustation Pro', description: 'Verre de dégustation professionnel' },

    // Portrait / Artistique
    { id: 20, category: 'portrait', image: 'assets/images/portfolio/Image abstraites joli.jpeg', title: 'Création Artistique', description: 'Photographie abstraite et créative' },
    { id: 21, category: 'portrait', image: 'assets/images/portfolio/Planetes.jpeg', title: 'Univers Cosmique', description: 'Photo artistique inspirée de l\'espace' }
  ];

  // ==========================================================================
  // Classe Gallery
  // ==========================================================================

  class Gallery {
    constructor(containerSelector, items) {
      this.container = document.querySelector(containerSelector);
      this.allItems = items;
      this.filteredItems = items;
      this.currentFilter = 'tous';
      this.lightbox = null;
      this.currentIndex = 0;

      if (this.container) {
        this.init();
      }
    }

    init() {
      this.createFilters();
      this.createLightbox();
      this.render();
    }

    // Créer les filtres
    createFilters() {
      const categories = ['tous', ...new Set(this.allItems.map(item => item.category))];

      const categoryLabels = {
        'tous': 'Tous',
        'drone': 'Drone',
        'vignobles': 'Vignobles',
        'entreprise': 'Entreprise & Produit',
        'portrait': 'Portrait & Artistique'
      };

      const filtersContainer = document.querySelector('.portfolio-filters');
      if (!filtersContainer) return;

      filtersContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === 'tous' ? 'active' : ''}"
                data-filter="${cat}">
          ${categoryLabels[cat] || cat}
        </button>
      `).join('');

      // Ajouter les événements
      filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const filter = e.target.dataset.filter;
          this.applyFilter(filter);

          // Mettre à jour l'état actif
          filtersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
        });
      });
    }

    // Appliquer un filtre
    applyFilter(filter) {
      this.currentFilter = filter;

      if (filter === 'tous') {
        this.filteredItems = this.allItems;
      } else {
        this.filteredItems = this.allItems.filter(item => item.category === filter);
      }

      this.render();
      window.trackEvent('Portfolio', 'filter', filter);
    }

    // Afficher la galerie
    render() {
      if (!this.container) return;

      // Animation de sortie
      this.container.style.opacity = '0';

      setTimeout(() => {
        this.container.innerHTML = this.filteredItems.map((item, index) => `
          <div class="portfolio-item" data-index="${index}">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="portfolio-overlay">
              <h3 class="portfolio-title">${item.title}</h3>
              <p class="portfolio-category">${item.category}</p>
            </div>
          </div>
        `).join('');

        // Animation d'entrée
        this.container.style.opacity = '1';

        // Ajouter les événements de clic
        this.container.querySelectorAll('.portfolio-item').forEach(item => {
          item.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            this.openLightbox(index);
          });
        });
      }, 300);
    }

    // Créer la lightbox
    createLightbox() {
      this.lightbox = document.createElement('div');
      this.lightbox.className = 'lightbox';
      this.lightbox.innerHTML = `
        <div class="lightbox-content">
          <div class="lightbox-counter"></div>
          <img src="" alt="" class="lightbox-image">
          <div class="lightbox-info">
            <h3 class="lightbox-title"></h3>
            <p class="lightbox-description"></p>
          </div>
          <button class="lightbox-close">×</button>
          <button class="lightbox-nav lightbox-prev">‹</button>
          <button class="lightbox-nav lightbox-next">›</button>
        </div>
      `;

      document.body.appendChild(this.lightbox);

      // Événements
      this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
      this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prevImage());
      this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());

      // Fermer au clic sur le fond
      this.lightbox.addEventListener('click', (e) => {
        if (e.target === this.lightbox) {
          this.closeLightbox();
        }
      });

      // Navigation clavier
      document.addEventListener('keydown', (e) => {
        if (!this.lightbox.classList.contains('active')) return;

        switch(e.key) {
          case 'Escape':
            this.closeLightbox();
            break;
          case 'ArrowLeft':
            this.prevImage();
            break;
          case 'ArrowRight':
            this.nextImage();
            break;
        }
      });
    }

    // Ouvrir la lightbox
    openLightbox(index) {
      this.currentIndex = index;
      this.updateLightboxImage();
      this.lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      window.trackEvent('Portfolio', 'lightbox_open', this.filteredItems[index].title);
    }

    // Fermer la lightbox
    closeLightbox() {
      this.lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Image suivante
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.filteredItems.length;
      this.updateLightboxImage();
    }

    // Image précédente
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.filteredItems.length) % this.filteredItems.length;
      this.updateLightboxImage();
    }

    // Mettre à jour l'image de la lightbox
    updateLightboxImage() {
      const item = this.filteredItems[this.currentIndex];
      const img = this.lightbox.querySelector('.lightbox-image');
      const counter = this.lightbox.querySelector('.lightbox-counter');
      const title = this.lightbox.querySelector('.lightbox-title');
      const description = this.lightbox.querySelector('.lightbox-description');

      img.src = item.image;
      img.alt = item.title;
      counter.textContent = `${this.currentIndex + 1} / ${this.filteredItems.length}`;
      title.textContent = item.title;
      description.textContent = item.description;
    }
  }

  // ==========================================================================
  // Initialisation
  // ==========================================================================

  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Initialiser la galerie si la grille existe
    if (document.querySelector('.portfolio-grid')) {
      window.portfolioGallery = new Gallery('.portfolio-grid', PORTFOLIO_ITEMS);
      console.log('✓ Portfolio Gallery initialized');
    }
  };

  init();

  // Exposer globalement
  window.PORTFOLIO_ITEMS = PORTFOLIO_ITEMS;
  window.Gallery = Gallery;

})();
