# Architecture du Site - Photographe Drone Nord Gironde

## 1. Structure des Fichiers

```
photographe-drone-gironde/
│
├── index.html                      # Page d'accueil
├── services.html                   # Page Services
├── drone.html                      # Page Drone (différenciation)
├── portfolio.html                  # Page Portfolio
├── boutique.html                   # Page Boutique
├── contact.html                    # Page Contact/Devis
├── blog.html                       # Page Blog (liste)
├── blog-article.html               # Template article de blog
│
├── seo/                            # Pages SEO local
│   ├── photographe-blaye.html
│   ├── photographe-saint-ciers-sur-gironde.html
│   ├── photographe-bourg-sur-gironde.html
│   ├── photographe-libourne.html
│   └── photographe-nord-gironde.html
│
├── assets/
│   ├── css/
│   │   ├── main.css               # Styles principaux
│   │   ├── components.css         # Composants réutilisables
│   │   └── responsive.css         # Media queries
│   │
│   ├── js/
│   │   ├── main.js                # Fonctionnalités principales
│   │   ├── boutique.js            # Logique boutique/panier
│   │   ├── stripe.js              # Intégration Stripe
│   │   ├── gallery.js             # Galerie portfolio
│   │   └── seo.js                 # Schema.org dynamique
│   │
│   └── images/
│       ├── hero/                  # Images hero
│       ├── services/              # Images services
│       ├── portfolio/             # Images portfolio
│       ├── drone/                 # Images drone
│       └── optimized/             # Images optimisées WebP
│
├── .htaccess                       # Configuration Apache
├── robots.txt                      # Indexation robots
├── sitemap.xml                     # Plan du site
└── manifest.json                   # PWA manifest

```

## 2. Stack Technique

### Frontend
- **HTML5** : Sémantique, balises modernes
- **CSS3** : CSS Grid, Flexbox, Variables CSS, Animations
- **Vanilla JavaScript** : ES6+, modules, async/await
- **Pas de framework** : Performance maximale

### Librairies Essentielles
- **Stripe.js** : Paiement en ligne
- **Lightbox/PhotoSwipe** : Galerie portfolio
- **Intersection Observer API** : Lazy loading images
- **LocalStorage API** : Panier persistant

### Performance
- **Images WebP** + fallback JPEG
- **Lazy loading** natif + polyfill
- **Critical CSS** inline
- **Defer/Async** pour JS non-critique
- **Minification** HTML/CSS/JS
- **Compression Gzip** via .htaccess

## 3. Design System

### Palette de Couleurs
```css
:root {
  /* Couleurs principales */
  --primary: #1a1a1a;           /* Noir élégant */
  --secondary: #d4af37;         /* Or premium */
  --accent: #2c5f7f;            /* Bleu drone */

  /* Neutres */
  --white: #ffffff;
  --gray-light: #f5f5f5;
  --gray-medium: #cccccc;
  --gray-dark: #666666;

  /* Feedback */
  --success: #4caf50;
  --error: #f44336;
  --warning: #ff9800;
}
```

### Typographie
```css
/* Titres : Playfair Display ou Cormorant Garamond (serif élégant) */
--font-heading: 'Playfair Display', serif;

/* Corps : Inter ou Roboto (sans-serif moderne) */
--font-body: 'Inter', sans-serif;

/* Tailles */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 2rem;      /* 32px */
--text-4xl: 2.5rem;    /* 40px */
--text-5xl: 3rem;      /* 48px */
```

### Spacing System
```css
--space-xs: 0.5rem;    /* 8px */
--space-sm: 1rem;      /* 16px */
--space-md: 1.5rem;    /* 24px */
--space-lg: 2rem;      /* 32px */
--space-xl: 3rem;      /* 48px */
--space-2xl: 4rem;     /* 64px */
--space-3xl: 6rem;     /* 96px */
```

### Breakpoints
```css
--mobile: 320px;
--tablet: 768px;
--desktop: 1024px;
--wide: 1440px;
```

## 4. Architecture des Pages

### Page d'Accueil (index.html)
```
├── Header + Navigation
├── Hero Section
│   ├── Image/Vidéo drone full-width
│   ├── Titre principal H1 "Photographe Drone Nord Gironde"
│   └── CTA "Découvrir mes services"
├── Section Services (aperçu)
├── Section Drone (différenciation)
├── Portfolio (sélection)
├── Zone Géographique (carte/liste)
├── Témoignages
├── Blog (derniers articles)
├── CTA Final
└── Footer
```

### Page Services (services.html)
```
├── Header + Navigation
├── Hero Services
├── Grid Services
│   ├── Mariage
│   ├── Immobilier
│   ├── Entreprise
│   ├── Portrait Pro
│   ├── Événementiel
│   └── Drone (mise en avant)
├── Process de travail
├── Tarifs indicatifs
├── CTA Devis
└── Footer
```

### Page Drone (drone.html)
```
├── Header + Navigation
├── Hero Drone (vidéo)
├── Pourquoi le drone ?
├── Équipement
├── Réglementation + Certifications
├── Galerie drone
├── Applications
│   ├── Immobilier
│   ├── Événementiel
│   ├── Entreprise
│   └── Patrimoine
├── Tarifs drone
├── CTA Devis
└── Footer
```

### Page Portfolio (portfolio.html)
```
├── Header + Navigation
├── Filtres (Mariage, Immobilier, Drone, etc.)
├── Galerie masonry responsive
│   └── Lightbox optimisée
├── Pagination / Infinite scroll
└── Footer
```

### Page Boutique (boutique.html)
```
├── Header + Navigation (avec badge panier)
├── Grille produits
│   ├── Pack Mariage
│   ├── Pack Immobilier
│   ├── Pack Entreprise
│   ├── Séance photo
│   ├── Prestation drone
│   ├── Tirages photo
│   └── Cartes cadeaux
├── Sidebar panier (sticky)
├── Modal paiement Stripe
├── Mention SumUp
└── Footer
```

### Pages SEO Local
```
├── Header + Navigation
├── Hero avec nom de ville
├── Section "Photographe à [Ville]"
├── Services dans cette zone
├── Portfolio local
├── Zones couvertes autour
├── Informations pratiques
├── Schema.org LocalBusiness
├── CTA Contact
└── Footer
```

### Page Blog (blog.html)
```
├── Header + Navigation
├── Hero Blog
├── Grid articles (3 colonnes)
│   ├── Image
│   ├── Catégorie
│   ├── Titre
│   ├── Extrait
│   └── Lire la suite
├── Sidebar
│   ├── Recherche
│   ├── Catégories
│   └── Articles populaires
└── Footer
```

### Page Contact/Devis (contact.html)
```
├── Header + Navigation
├── Formulaire devis
│   ├── Service souhaité
│   ├── Date
│   ├── Localisation
│   ├── Budget
│   ├── Description
│   └── Coordonnées
├── Coordonnées
│   ├── Téléphone
│   ├── Email
│   └── Zone d'intervention
├── Carte interactive
└── Footer
```

## 5. Composants Réutilisables

### Navigation
- Menu desktop + mobile (hamburger)
- Sticky header avec effet scroll
- Badge panier

### Cartes
- Carte service
- Carte produit
- Carte article blog
- Carte témoignage

### Boutons
- Primary (CTA principal)
- Secondary (CTA secondaire)
- Ghost (transparent)
- Icon button

### Formulaires
- Input text
- Textarea
- Select
- Checkbox/Radio
- File upload
- Validation temps réel

### Galerie
- Grid responsive
- Lightbox
- Lazy loading
- Filtres

### Panier
- Badge compteur
- Sidebar slide-in
- Item panier
- Total + checkout

## 6. Fonctionnalités Boutique

### Gestion Panier
```javascript
// LocalStorage persistant
const cart = {
  items: [],
  total: 0,
  addItem(product, quantity),
  removeItem(productId),
  updateQuantity(productId, quantity),
  clear(),
  getTotal()
}
```

### Intégration Stripe
```javascript
// Checkout Stripe Elements
- Carte bancaire
- Apple Pay / Google Pay
- Confirmation email auto
- Webhook pour validation
```

### Produits
```javascript
const products = [
  {
    id: 'pack-mariage',
    name: 'Pack Mariage Complet',
    price: 1200,
    description: '...',
    image: '...',
    features: [...]
  },
  // ... autres produits
]
```

## 7. SEO Technique

### Balises Meta (toutes les pages)
```html
<title>Photographe Drone Nord Gironde | [Service] - Nom</title>
<meta name="description" content="[Description unique 150-160 caractères]">
<meta name="keywords" content="photographe drone gironde, [mots-clés]">

<!-- Open Graph -->
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:url" content="...">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
```

### Schema.org
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Photographe Drone Nord Gironde",
  "image": "...",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Nouvelle-Aquitaine",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "45.12",
    "longitude": "-0.56"
  },
  "areaServed": [
    "Blaye", "Saint-Ciers-sur-Gironde", "Bourg-sur-Gironde",
    "Libourne", "Nord Gironde"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Photographie Drone"
      }
    ]
  }
}
```

### Sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[domaine]/</loc>
    <priority>1.0</priority>
    <changefreq>weekly</changefreq>
  </url>
  <!-- ... toutes les pages -->
</urlset>
```

### Robots.txt
```
User-agent: *
Allow: /
Sitemap: https://[domaine]/sitemap.xml
```

## 8. Configuration .htaccess

### Optimisations Apache
```apache
# Compression Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
</IfModule>

# Cache navigateur
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# URLs propres
RewriteRule ^services$ services.html [L]
RewriteRule ^drone$ drone.html [L]
# etc.
```

## 9. Mots-clés SEO Ciblés

### Mots-clés Principaux
- photographe Nord Gironde
- photographe drone Nord Gironde
- photographe immobilier Nord Gironde
- photographe mariage Nord Gironde
- photographe entreprise Gironde

### Longue Traîne
- photographe drone Blaye
- photo aérienne immobilier Gironde
- photographe mariage Libourne
- photo entreprise Saint-Ciers-sur-Gironde
- prestation drone Bourg-sur-Gironde

### Intentions de Recherche
- "photographe drone près de moi"
- "tarif photographe mariage Gironde"
- "photo immobilière drone"
- "photographe professionnel Nord Gironde"

## 10. Objectifs de Performance

### Core Web Vitals
- **LCP** (Largest Contentful Paint) : < 2.5s
- **FID** (First Input Delay) : < 100ms
- **CLS** (Cumulative Layout Shift) : < 0.1

### Metrics Cibles
- **PageSpeed Score** : > 90/100
- **GTmetrix Grade** : A
- **Poids page** : < 2MB
- **Temps chargement** : < 3s

### Techniques d'Optimisation
- Images WebP + lazy loading
- Critical CSS inline
- JavaScript différé
- Minification
- CDN pour assets statiques
- Preload fonts
- Prefetch pages critiques

## 11. Maillage Interne

### Stratégie de Liens
```
Accueil
  → Services (toutes catégories)
  → Drone (page phare)
  → Portfolio
  → Boutique
  → Pages SEO local
  → Blog

Services
  → Détail chaque service
  → Drone (cross-link)
  → Boutique (packs)
  → Portfolio (exemples)

Pages SEO Local
  → Services disponibles
  → Autres villes proches
  → Portfolio local
  → Contact/Devis

Blog
  → Services liés
  → Pages SEO
  → Boutique (packs)
```

## 12. Contenu Éditorial

### Pages à Rédiger
- 8 pages principales : 800-1200 mots chacune
- 5 pages SEO local : 600-800 mots chacune
- 10 articles de blog : 1000-1500 mots chacun

### Tonalité
- Professionnel mais accessible
- Expertise technique sans jargon
- Focus bénéfices client
- Valorisation territoire (Nord Gironde)
- Storytelling (passion photographie/drone)

## 13. Déploiement Hostinger

### Checklist Avant Mise en Ligne
- [ ] Tests tous navigateurs (Chrome, Firefox, Safari, Edge)
- [ ] Tests responsive (mobile, tablet, desktop)
- [ ] Validation W3C HTML/CSS
- [ ] Tests performance PageSpeed
- [ ] Vérification SEO (balises, schema.org)
- [ ] Configuration Stripe mode production
- [ ] Tests formulaires + emails
- [ ] Création sitemap.xml
- [ ] Configuration robots.txt
- [ ] SSL/HTTPS actif
- [ ] .htaccess configuré
- [ ] Google Search Console
- [ ] Google Analytics
- [ ] Google My Business

---

## Prochaines Étapes

1. **Validation architecture** ✓ (ce document)
2. **Création design system** (CSS variables, composants)
3. **Développement page par page**
4. **Intégration boutique + Stripe**
5. **Rédaction contenu SEO**
6. **Tests + optimisations**
7. **Déploiement Hostinger**

---

**Questions / Ajustements ?**
Si tu valides cette architecture, on peut démarrer le développement !
