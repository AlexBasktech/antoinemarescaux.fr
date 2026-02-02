/**
 * PHOTOGRAPHE DRONE NORD GIRONDE - SEO & Schema.org
 * Génération dynamique des données structurées JSON-LD
 */

(function() {
  'use strict';

  // ==========================================================================
  // Configuration SEO
  // ==========================================================================

  const SEO_CONFIG = {
    businessName: 'Antoine Marescaux Photographie',
    description: 'Antoine Marescaux - Photographe professionnel spécialisé en photographie aérienne par drone à Saint-Ciers-sur-Gironde. Services : Mariage, Immobilier, Entreprise, Événementiel. Couverture Gironde & Charente-Maritime.',
    phone: '+33 5 57 32 92 28',
    email: 'antoine.marescaux@gmail.com',
    address: {
      streetAddress: '',
      addressLocality: 'Saint-Ciers-sur-Gironde',
      addressRegion: 'Nouvelle-Aquitaine',
      postalCode: '33820',
      addressCountry: 'FR'
    },
    geo: {
      latitude: 45.2897,
      longitude: -0.6019
    },
    areasServed: [
      'Saint-Ciers-sur-Gironde',
      'Blaye',
      'Bourg-sur-Gironde',
      'Royan',
      'Saintes',
      'Jonzac',
      'La Rochelle',
      'Rochefort',
      'Nord Gironde',
      'Gironde',
      'Charente-Maritime',
      'Nouvelle-Aquitaine'
    ],
    socialMedia: {
      facebook: 'https://facebook.com/votreprofil',
      instagram: 'https://instagram.com/votreprofil',
      // À personnaliser
    }
  };

  // ==========================================================================
  // Schema.org Local Business
  // ==========================================================================

  const generateLocalBusinessSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': window.location.origin + '/#business',
      'name': SEO_CONFIG.businessName,
      'description': SEO_CONFIG.description,
      'image': window.location.origin + '/assets/images/hero/main-hero.jpg',
      'priceRange': '€€',
      'telephone': SEO_CONFIG.phone,
      'email': SEO_CONFIG.email,
      'url': window.location.origin,
      'address': {
        '@type': 'PostalAddress',
        ...SEO_CONFIG.address
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': SEO_CONFIG.geo.latitude,
        'longitude': SEO_CONFIG.geo.longitude
      },
      'areaServed': SEO_CONFIG.areasServed.map(area => ({
        '@type': 'City',
        'name': area
      })),
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          'opens': '09:00',
          'closes': '19:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': 'Saturday',
          'opens': '10:00',
          'closes': '18:00'
        }
      ],
      'sameAs': Object.values(SEO_CONFIG.socialMedia)
    };
  };

  // ==========================================================================
  // Schema.org Offer Catalog (Services)
  // ==========================================================================

  const generateOfferCatalogSchema = () => {
    const services = [
      {
        name: 'Photographie de Mariage',
        description: 'Couverture photo et vidéo complète de votre mariage',
        price: 1200,
        category: 'Mariage'
      },
      {
        name: 'Photographie Immobilière',
        description: 'Photos et vidéo drone pour valoriser vos biens immobiliers',
        price: 350,
        category: 'Immobilier'
      },
      {
        name: 'Photographie Entreprise',
        description: 'Reportage photo professionnel pour entreprises',
        price: 800,
        category: 'Entreprise'
      },
      {
        name: 'Prestation Drone',
        description: 'Prise de vue aérienne professionnelle par drone',
        price: 250,
        category: 'Drone'
      },
      {
        name: 'Séance Photo Portrait',
        description: 'Séance photo portrait professionnelle',
        price: 200,
        category: 'Portrait'
      }
    ];

    return {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      'name': 'Services Photographe Drone Nord Gironde',
      'itemListElement': services.map((service, index) => ({
        '@type': 'Offer',
        'position': index + 1,
        'itemOffered': {
          '@type': 'Service',
          'name': service.name,
          'description': service.description,
          'category': service.category
        },
        'price': service.price,
        'priceCurrency': 'EUR',
        'availability': 'https://schema.org/InStock',
        'seller': {
          '@type': 'LocalBusiness',
          'name': SEO_CONFIG.businessName
        }
      }))
    };
  };

  // ==========================================================================
  // Schema.org Product (Boutique)
  // ==========================================================================

  const generateProductSchema = (product) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': product.name,
      'description': product.description,
      'image': window.location.origin + '/' + product.image,
      'sku': product.id,
      'offers': {
        '@type': 'Offer',
        'price': product.price,
        'priceCurrency': 'EUR',
        'availability': 'https://schema.org/InStock',
        'url': window.location.origin + '/boutique.html',
        'seller': {
          '@type': 'Organization',
          'name': SEO_CONFIG.businessName
        }
      }
    };
  };

  // ==========================================================================
  // Schema.org Article (Blog)
  // ==========================================================================

  const generateArticleSchema = (article) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': article.title,
      'description': article.excerpt,
      'image': window.location.origin + '/' + article.image,
      'datePublished': article.datePublished,
      'dateModified': article.dateModified || article.datePublished,
      'author': {
        '@type': 'Person',
        'name': SEO_CONFIG.businessName
      },
      'publisher': {
        '@type': 'Organization',
        'name': SEO_CONFIG.businessName,
        'logo': {
          '@type': 'ImageObject',
          'url': window.location.origin + '/assets/images/logo.png'
        }
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': window.location.href
      }
    };
  };

  // ==========================================================================
  // Schema.org Breadcrumb
  // ==========================================================================

  const generateBreadcrumbSchema = () => {
    const path = window.location.pathname;
    const segments = path.split('/').filter(s => s);

    const items = [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Accueil',
        'item': window.location.origin
      }
    ];

    segments.forEach((segment, index) => {
      const name = segment.replace('.html', '').replace(/-/g, ' ');
      const url = window.location.origin + '/' + segments.slice(0, index + 1).join('/');

      items.push({
        '@type': 'ListItem',
        'position': index + 2,
        'name': name.charAt(0).toUpperCase() + name.slice(1),
        'item': url
      });
    });

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items
    };
  };

  // ==========================================================================
  // Injecter le Schema dans le DOM
  // ==========================================================================

  const injectSchema = (schema) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema, null, 2);
    document.head.appendChild(script);
  };

  // ==========================================================================
  // Initialiser les Schemas selon la page
  // ==========================================================================

  const initSchemas = () => {
    const path = window.location.pathname;

    // LocalBusiness sur toutes les pages
    injectSchema(generateLocalBusinessSchema());

    // Breadcrumb sur toutes les pages
    injectSchema(generateBreadcrumbSchema());

    // Page d'accueil ou services
    if (path === '/' || path.includes('index.html') || path.includes('services.html')) {
      injectSchema(generateOfferCatalogSchema());
    }

    // Page boutique
    if (path.includes('boutique.html') && typeof window.PRODUCTS !== 'undefined') {
      window.PRODUCTS.forEach(product => {
        injectSchema(generateProductSchema(product));
      });
    }

    // Page blog article
    if (path.includes('blog-article.html')) {
      // Article schema sera injecté dynamiquement selon l'article
      const articleData = window.currentArticle; // À définir dans la page
      if (articleData) {
        injectSchema(generateArticleSchema(articleData));
      }
    }
  };

  // ==========================================================================
  // Open Graph & Twitter Cards (Meta Tags dynamiques)
  // ==========================================================================

  const setMetaTags = (data) => {
    const defaults = {
      title: SEO_CONFIG.businessName,
      description: SEO_CONFIG.description,
      image: window.location.origin + '/assets/images/hero/main-hero.jpg',
      url: window.location.href
    };

    const meta = { ...defaults, ...data };

    // Title
    document.title = meta.title;

    // Meta description
    setMeta('description', meta.description);

    // Open Graph
    setMeta('og:title', meta.title, 'property');
    setMeta('og:description', meta.description, 'property');
    setMeta('og:image', meta.image, 'property');
    setMeta('og:url', meta.url, 'property');
    setMeta('og:type', 'website', 'property');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);
    setMeta('twitter:image', meta.image);
  };

  const setMeta = (name, content, attr = 'name') => {
    let element = document.querySelector(`meta[${attr}="${name}"]`);

    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attr, name);
      document.head.appendChild(element);
    }

    element.setAttribute('content', content);
  };

  // ==========================================================================
  // Générer le sitemap dynamiquement (pour développement)
  // ==========================================================================

  const generateSitemapData = () => {
    const pages = [
      { url: '/', priority: 1.0, changefreq: 'weekly' },
      { url: '/services.html', priority: 0.9, changefreq: 'monthly' },
      { url: '/drone.html', priority: 0.9, changefreq: 'monthly' },
      { url: '/vignobles.html', priority: 0.9, changefreq: 'monthly' },
      { url: '/portfolio.html', priority: 0.8, changefreq: 'weekly' },
      { url: '/boutique.html', priority: 0.8, changefreq: 'weekly' },
      { url: '/blog.html', priority: 0.7, changefreq: 'weekly' },
      { url: '/contact.html', priority: 0.7, changefreq: 'monthly' },
      // Pages SEO locales
      { url: '/seo/photographe-royan.html', priority: 0.8, changefreq: 'monthly' },
      { url: '/seo/photographe-saintes.html', priority: 0.8, changefreq: 'monthly' },
      { url: '/seo/photographe-jonzac.html', priority: 0.8, changefreq: 'monthly' }
    ];

    return pages;
  };

  // ==========================================================================
  // Initialisation
  // ==========================================================================

  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    initSchemas();

    console.log('✓ SEO & Schema.org initialized');
  };

  init();

  // Exposer globalement
  window.SEO = {
    setMetaTags,
    generateProductSchema,
    generateArticleSchema,
    config: SEO_CONFIG
  };

})();
