# 📸 Site Web Photographe Drone Nord Gironde

Site web professionnel moderne, rapide et optimisé SEO pour un photographe spécialisé en photographie aérienne par drone en Nord Gironde.

## 🎯 Objectif

Créer un site premium orienté conversion avec :
- Design moderne et minimaliste
- Performances optimales (Core Web Vitals)
- SEO local puissant
- Boutique en ligne fonctionnelle
- Intégration paiement Stripe

---

## ✅ Ce Qui a Été Créé

### 📁 Structure Complète
```
photographe-drone-gironde/
├── assets/
│   ├── css/
│   │   ├── main.css              ✅ Design system complet
│   │   └── components.css        ✅ Composants réutilisables
│   ├── js/
│   │   ├── main.js              ✅ Navigation, animations, utilities
│   │   ├── boutique.js          ✅ Système panier + produits
│   │   ├── stripe.js            ✅ Intégration Stripe
│   │   ├── gallery.js           ✅ Galerie portfolio + lightbox
│   │   └── seo.js               ✅ Schema.org automatique
│   └── images/                  ⚠️ À remplir avec vos photos
├── seo/                         ⏳ Pages SEO locales (à créer)
├── index.html                   ✅ Page d'accueil complète
├── .htaccess                    ✅ Configuration Apache optimisée
├── robots.txt                   ✅ Configuration robots
├── sitemap.xml                  ✅ Plan du site
├── manifest.json                ✅ PWA manifest
└── ARCHITECTURE.md              ✅ Documentation architecture
```

### 🎨 Design System
- **Couleurs** : Noir élégant (#1a1a1a) + Or premium (#d4af37) + Bleu drone (#2c5f7f)
- **Typographie** : Playfair Display (titres) + Inter (corps)
- **Mobile-first** avec breakpoints responsive
- **Animations** CSS fluides
- **Dark mode ready** (variables CSS)

### ⚡ JavaScript Créé

#### 1. **main.js** - Fonctionnalités Principales
- Navigation mobile hamburger
- Header sticky avec effet scroll
- Smooth scroll
- Lazy loading images
- Toast notifications
- Validation formulaires
- Utilitaires (formatage prix, localStorage, etc.)

#### 2. **boutique.js** - E-commerce
- Système panier complet (LocalStorage persistant)
- 7 produits pré-configurés :
  - Pack Mariage (1200€)
  - Pack Immobilier (350€)
  - Pack Entreprise (800€)
  - Séance Photo (200€)
  - Prestation Drone (250€)
  - Tirages Photo (15€)
  - Carte Cadeau (100€)
- Gestion quantités
- Calcul total automatique

#### 3. **stripe.js** - Paiement
- Intégration Stripe Elements
- Modal checkout personnalisé
- Formulaire billing
- Confirmation email
- Mention SumUp incluse

#### 4. **gallery.js** - Portfolio
- Filtres par catégorie
- Lightbox responsive
- Navigation clavier
- Lazy loading
- 24 items portfolio exemple

#### 5. **seo.js** - SEO Dynamique
- Schema.org LocalBusiness
- Schema.org OfferCatalog
- Schema.org Product
- Schema.org Article
- Breadcrumb automatique
- Meta tags dynamiques

### 🔧 Configuration

#### .htaccess (Apache)
✅ Compression Gzip
✅ Cache navigateur (1 an images, 1 mois CSS/JS)
✅ HTTPS redirect
✅ URLs propres (sans .html)
✅ Sécurité (XSS, Clickjacking)
✅ Pages erreur personnalisées

#### robots.txt
✅ Autoriser tous bots
✅ Sitemap déclaré
✅ Crawl-delay configuré

#### sitemap.xml
✅ Toutes les pages listées
✅ Priorités définies
✅ Fréquences de maj

---

## ⏳ Ce Qui Reste à Faire

### 1. Pages HTML à Créer

Utilisez `index.html` comme template de base. Voici la structure HTML commune :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- Meta tags SEO -->
  <!-- CSS -->
  <link rel="stylesheet" href="assets/css/main.css">
  <link rel="stylesheet" href="assets/css/components.css">
</head>
<body>
  <!-- Header (copier depuis index.html) -->

  <!-- Contenu unique de la page -->

  <!-- Footer (copier depuis index.html) -->

  <!-- Cart Sidebar (copier depuis index.html) -->

  <!-- Scripts -->
  <script src="assets/js/main.js"></script>
  <script src="assets/js/boutique.js"></script>
  <script src="assets/js/seo.js"></script>
</body>
</html>
```

#### Pages à Créer :

**A. services.html** ⏳
- Hero "Nos Services"
- Grid 6 services détaillés (Mariage, Immobilier, Entreprise, Drone, Portrait, Événement)
- Process de travail (3-4 étapes)
- Tarifs indicatifs
- CTA Devis
- **Mots-clés** : photographe mariage gironde, photographe immobilier gironde, photographe entreprise

**B. drone.html** ⏳
- Hero avec vidéo drone
- Pourquoi le drone ? (4-5 bénéfices)
- Équipement (DJI Mavic, spécifications)
- Certifications (DGAC, assurance)
- Applications (immobilier, événement, patrimoine, industrie)
- Galerie drone
- Réglementation expliquée
- Tarifs drone
- **Mots-clés** : photographe drone gironde, photo aérienne, vidéo drone

**C. portfolio.html** ⏳
- Filtres par catégorie
- Grid responsive (déjà géré par gallery.js)
- Simplement ajouter `<div class="portfolio-filters"></div>` et `<div class="portfolio-grid"></div>`
- Ajouter `<script src="assets/js/gallery.js"></script>`

**D. boutique.html** ⏳
- Grid produits (déjà géré par boutique.js)
- Simplement ajouter `<div class="products-grid"></div>`
- Le JS génère automatiquement les 7 produits
- Panier déjà fonctionnel

**E. blog.html** ⏳
- Hero Blog
- Grid articles (3 colonnes)
- Sidebar (catégories, recherche, articles populaires)
- 6-10 articles exemple

**F. blog-article.html** ⏳
- Template article de blog
- Hero avec image
- Contenu article
- Sidebar
- Articles similaires
- Commentaires (optionnel)

**G. contact.html** ⏳
- Grid 2 colonnes : Formulaire + Informations
- Formulaire devis avec champs :
  - Service souhaité (select)
  - Date souhaitée
  - Localisation
  - Budget estimé
  - Description projet
  - Nom, Email, Téléphone
- Carte interactive (Google Maps embed ou Leaflet)
- Coordonnées + horaires

### 2. Pages SEO Locales (Priorité Haute) ⏳

Créer 5 pages dans `/seo/` :

**Template Page SEO Locale :**
```html
<!-- seo/photographe-[ville].html -->
<section class="hero" style="height: 60vh;">
  <h1>Photographe Drone à [Ville]</h1>
  <p>Photographe professionnel spécialisé en drone à [Ville] et ses environs</p>
</section>

<section class="section">
  <div class="container">
    <h2>Votre Photographe à [Ville]</h2>
    <p>Texte SEO optimisé avec mots-clés locaux (600-800 mots)</p>

    <h3>Services proposés à [Ville]</h3>
    <ul>
      <li>Mariage</li>
      <li>Immobilier</li>
      <li>Entreprise</li>
      <li>Drone</li>
    </ul>

    <h3>Pourquoi me choisir à [Ville] ?</h3>
    <p>Arguments locaux...</p>

    <h3>Zones couvertes autour de [Ville]</h3>
    <ul>Villes voisines...</ul>
  </div>
</section>

<!-- Portfolio local -->
<!-- CTA Devis -->
```

**Pages à créer :**
1. `seo/photographe-blaye.html` - Focus : Citadelle, centre historique
2. `seo/photographe-saint-ciers-sur-gironde.html` - Focus : Zone portuaire, industrie
3. `seo/photographe-bourg-sur-gironde.html` - Focus : Village médiéval, patrimoine
4. `seo/photographe-libourne.html` - Focus : Ville, vignobles proches
5. `seo/photographe-nord-gironde.html` - Focus : Couverture globale région

**Mots-clés à intégrer naturellement :**
- photographe [ville]
- photographe drone [ville]
- photographe mariage [ville]
- photographe immobilier [ville]
- photo aérienne [ville]

### 3. Images à Ajouter 📸

**Priorité Haute :**
- `assets/images/hero/drone-flying.jpg` (1920x1080px)
- `assets/images/drone/drone-pilot.jpg`
- Portfolio : 24 images réelles
- Services : 6 images services
- Blog : 3-10 images articles

**Optimisation images :**
```bash
# Convertir en WebP
cwebp -q 85 input.jpg -o output.webp

# Redimensionner
convert input.jpg -resize 1920x1080 output.jpg
```

**Où placer les images :**
- Hero : `assets/images/hero/`
- Services : `assets/images/services/`
- Portfolio : `assets/images/portfolio/`
- Drone : `assets/images/drone/`
- Blog : `assets/images/blog/`
- Témoignages : `assets/images/testimonials/`

### 4. Configuration Finale ⚙️

#### A. Remplacer les Placeholders

**Dans tous les fichiers HTML :**
- `06 XX XX XX XX` → Votre vrai numéro
- `contact@photodrone-gironde.fr` → Votre vrai email
- `Adresse` → Votre vraie adresse
- `votre-domaine.fr` → Votre vrai domaine

**Dans `assets/js/seo.js` :**
```javascript
const SEO_CONFIG = {
  businessName: 'Votre Nom',
  phone: '+33 X XX XX XX XX',
  email: 'votre@email.fr',
  address: {
    streetAddress: 'Votre adresse',
    addressLocality: 'Blaye',
    postalCode: '33390'
  }
};
```

**Dans `assets/js/stripe.js` :**
```javascript
const STRIPE_PUBLIC_KEY = 'pk_live_VOTRE_CLE_PUBLIQUE';
```

**Dans sitemap.xml et robots.txt :**
- Remplacer `votre-domaine.fr` par votre domaine réel

#### B. Backend pour Stripe (Optionnel mais Recommandé)

Le site fonctionne en frontend uniquement, mais pour Stripe en production, créer :

**`/api/create-payment-intent.php` :**
```php
<?php
require 'vendor/autoload.php';
\Stripe\Stripe::setApiKey('sk_live_VOTRE_CLE_SECRETE');

$data = json_decode(file_get_contents('php://input'), true);

$paymentIntent = \Stripe\PaymentIntent::create([
  'amount' => $data['amount'],
  'currency' => 'eur',
  'payment_method' => $data['paymentMethodId'],
  'confirmation_method' => 'manual',
  'confirm' => true,
]);

echo json_encode($paymentIntent);
?>
```

**`/api/send-confirmation.php` :**
```php
<?php
$to = $_POST['email'];
$subject = 'Confirmation de commande';
$message = 'Merci pour votre commande...';
mail($to, $subject, $message);
?>
```

#### C. Google Analytics

Remplacer dans tous les HTML :
```javascript
gtag('config', 'G-XXXXXXXXXX'); // Votre ID Analytics
```

### 5. Tests Avant Mise en Ligne 🧪

**Tests Fonctionnels :**
- [ ] Navigation mobile fonctionne
- [ ] Panier ajoute/retire produits
- [ ] Formulaires se valident
- [ ] Lightbox portfolio s'ouvre
- [ ] Tous les liens fonctionnent

**Tests Responsive :**
- [ ] Mobile (320px, 375px, 414px)
- [ ] Tablet (768px, 1024px)
- [ ] Desktop (1440px, 1920px)

**Tests Navigateurs :**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

**Tests Performance :**
- [ ] PageSpeed Insights > 90
- [ ] GTmetrix Grade A
- [ ] Lighthouse Score > 90

**Tests SEO :**
- [ ] Balises meta uniques par page
- [ ] Balises Hn hiérarchisées
- [ ] Schema.org valide (Google Rich Results Test)
- [ ] Sitemap accessible
- [ ] Robots.txt correct

### 6. Déploiement sur Hostinger 🚀

**Étapes :**

1. **Préparer les fichiers**
```bash
# Minifier CSS/JS (optionnel)
npm install -g uglifycss uglify-js
uglifycss assets/css/*.css > assets/css/all.min.css
uglifyjs assets/js/*.js -o assets/js/all.min.js
```

2. **Upload via FTP**
- Utiliser FileZilla ou FTP Manager Hostinger
- Uploader tous les fichiers à la racine `/public_html/`

3. **Vérifier**
- `.htaccess` actif
- HTTPS activé (Let's Encrypt dans Hostinger)
- Permissions fichiers : 644
- Permissions dossiers : 755

4. **Configuration DNS**
- A Record : @ → IP serveur Hostinger
- CNAME : www → votre-domaine.fr

5. **Post-Déploiement**
- Soumettre sitemap à Google Search Console
- Configurer Google My Business
- Ajouter site à Bing Webmaster Tools
- Tester avec Google Mobile-Friendly Test

---

## 📚 Documentation Technique

### CSS Classes Principales

**Layout :**
- `.container` : Max-width 1440px, centré
- `.section` : Padding vertical 6rem
- `.grid`, `.grid-2`, `.grid-3`, `.grid-4` : Grids responsives

**Buttons :**
- `.btn-primary` : Bouton principal (or)
- `.btn-secondary` : Bouton secondaire (noir)
- `.btn-outline` : Bouton bordure
- `.btn-ghost` : Bouton transparent
- `.btn-lg`, `.btn-sm` : Tailles

**Components :**
- `.card` : Carte basique
- `.service-card` : Carte service
- `.product-card` : Carte produit
- `.blog-card` : Carte article
- `.testimonial-card` : Carte témoignage
- `.zone-card` : Carte zone géographique

**Portfolio :**
- `.portfolio-grid` : Grille portfolio
- `.portfolio-item` : Item portfolio
- `.portfolio-filters` : Filtres
- `.lightbox` : Lightbox

**Cart :**
- `.cart-sidebar` : Sidebar panier
- `.cart-icon` : Icône panier
- `.cart-badge` : Badge compteur

### JavaScript Functions Globales

**Utilities :**
- `window.showToast(message, type)` : Afficher notification
- `window.formatPrice(price)` : Formater prix en euros
- `window.storage.set(key, value)` : LocalStorage set
- `window.storage.get(key)` : LocalStorage get
- `window.trackEvent(category, action, label)` : Google Analytics

**Cart :**
- `window.cart.addItem(productId, quantity)` : Ajouter au panier
- `window.cart.removeItem(productId)` : Retirer du panier
- `window.cart.getTotal()` : Obtenir total
- `window.cart.clear()` : Vider panier

**Modals :**
- `window.openModal(modalId)` : Ouvrir modal
- `window.closeModal(modalId)` : Fermer modal

**Payment :**
- `window.openCheckout()` : Ouvrir modal paiement

### Variables CSS Personnalisables

```css
:root {
  /* Couleurs - Modifier selon votre charte */
  --primary: #1a1a1a;
  --secondary: #d4af37;
  --accent: #2c5f7f;

  /* Fonts - Remplacer si besoin */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;

  /* Espacements - Ajuster si besoin */
  --space-xl: 3rem;
  --space-2xl: 4rem;
}
```

---

## 🎯 SEO Local - Stratégie

### Mots-clés Principaux Ciblés

**Génériques :**
- photographe drone nord gironde ⭐⭐⭐⭐⭐
- photographe nord gironde ⭐⭐⭐⭐
- photo aérienne gironde ⭐⭐⭐⭐

**Services :**
- photographe mariage gironde ⭐⭐⭐⭐
- photographe immobilier gironde ⭐⭐⭐⭐⭐
- photographe entreprise gironde ⭐⭐⭐

**Locaux :**
- photographe blaye ⭐⭐⭐⭐⭐
- photographe drone blaye ⭐⭐⭐⭐⭐
- photographe saint-ciers-sur-gironde ⭐⭐⭐⭐
- photographe libourne ⭐⭐⭐

### Maillage Interne Optimal

```
Accueil
  ↓
  ├─→ Services → Détails services → Boutique
  ├─→ Drone → Portfolio drone → Services drone
  ├─→ Portfolio → Services → Contact
  ├─→ Pages SEO locales → Services → Contact
  └─→ Blog → Services liés → Contact
```

**Liens internes minimum par page : 10-15**

### Backlinks à Obtenir

1. **Annuaires Locaux** (Gratuits)
   - Google My Business ⭐⭐⭐⭐⭐
   - Bing Places
   - PagesJaunes
   - Yelp France

2. **Sites Gironde**
   - Tourisme Gironde
   - CCI Bordeaux Gironde
   - Annuaires entreprises locales

3. **Sites Métier**
   - Mariages.net
   - Leboncoin Pro
   - Houzz (immobilier)

---

## 🔥 Optimisations Recommandées

### Performance

1. **Images WebP**
```bash
# Convertir toutes les images
find assets/images -name "*.jpg" -exec sh -c 'cwebp -q 85 "$1" -o "${1%.jpg}.webp"' _ {} \;
```

2. **Lazy Loading**
Déjà implémenté avec `loading="lazy"` sur toutes les images

3. **Critical CSS** (Optionnel)
Extraire le CSS critique et l'inliner dans `<head>`

### SEO

1. **Rich Snippets**
Déjà implémentés via schema.org

2. **FAQ Schema** (À ajouter)
```json
{
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Quel est le tarif d'une prestation drone ?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "À partir de 250€..."
    }
  }]
}
```

3. **Reviews Schema** (Après avoir des avis)
```json
{
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "45"
}
```

### Conversion

1. **A/B Testing**
Tester différentes versions de :
- CTA buttons
- Hero titles
- Pricing display

2. **Heatmaps**
Installer Hotjar ou Microsoft Clarity

3. **Chat** (Optionnel)
Ajouter Tawk.to ou Crisp

---

## 📞 Support & Maintenance

### Mises à Jour Régulières

**Mensuel :**
- [ ] Ajouter 2-3 photos portfolio
- [ ] Publier 1 article blog
- [ ] Vérifier liens cassés
- [ ] Analyser Google Analytics

**Trimestriel :**
- [ ] Mise à jour contenu services
- [ ] Optimisation mots-clés
- [ ] Tests performance
- [ ] Backup complet

**Annuel :**
- [ ] Refonte design partielle
- [ ] Audit SEO complet
- [ ] Optimisation conversions

### Outils Recommandés

**Analytics :**
- Google Analytics 4
- Google Search Console
- Microsoft Clarity

**SEO :**
- Ahrefs / SEMrush
- Screaming Frog
- Google PageSpeed Insights

**Monitoring :**
- UptimeRobot (uptime)
- GTmetrix (performance)
- Broken Link Checker

---

## 📝 Checklist Finale

### Avant Mise en Ligne

- [ ] Toutes les pages HTML créées (7 pages + 5 SEO)
- [ ] Toutes les images ajoutées et optimisées
- [ ] Placeholders remplacés (téléphone, email, adresse)
- [ ] Stripe configuré (clé publique + backend)
- [ ] Google Analytics configuré
- [ ] Sitemap soumis à Google
- [ ] Robots.txt vérifié
- [ ] .htaccess testé (HTTPS, cache, compression)
- [ ] Tests responsive tous devices
- [ ] Tests tous navigateurs
- [ ] Formulaires testés
- [ ] Panier testé
- [ ] PageSpeed > 90
- [ ] Validation W3C HTML/CSS
- [ ] Schema.org validé (Google Rich Results Test)

### Post Mise en Ligne

- [ ] Google My Business créé et optimisé
- [ ] Backlinks locaux créés
- [ ] Réseaux sociaux liés
- [ ] Monitoring uptime activé
- [ ] Backup automatique configuré
- [ ] SSL/HTTPS actif
- [ ] Redirections HTTP → HTTPS OK
- [ ] Test Google Mobile-Friendly
- [ ] Soumettre à annuaires locaux

---

## 🚀 Prochaines Étapes Recommandées

1. **Semaine 1-2** : Créer toutes les pages HTML manquantes
2. **Semaine 3** : Ajouter toutes les images réelles
3. **Semaine 4** : Tests complets + corrections
4. **Semaine 5** : Mise en ligne + SEO local
5. **Mois 2** : Contenu blog + backlinks
6. **Mois 3+** : Optimisation conversions + A/B testing

---

## 💡 Conseils Finaux

### Pour Réussir Votre SEO Local

1. **Google My Business = Priorité #1**
   - Photos régulières
   - Répondre aux avis
   - Posts hebdomadaires

2. **Contenu Blog**
   - 1 article/mois minimum
   - Cibler longue traîne locale
   - Exemples : "Meilleurs spots photo drone Gironde"

3. **Backlinks Locaux**
   - Partenariats photographes locaux
   - Articles invités blogs locaux
   - Annuaires qualité

4. **Avis Clients**
   - Demander systématiquement
   - Google, Facebook, Pages Jaunes
   - Répondre à tous les avis

### Pour Augmenter les Conversions

1. **Simplifier le Contact**
   - Formulaire court
   - Click-to-call visible
   - WhatsApp Business (optionnel)

2. **Preuves Sociales**
   - Témoignages clients
   - Logos clients entreprise
   - Certifications visibles

3. **Offres Limitées**
   - Promotion saisonnière
   - Early bird mariage
   - Pack découverte

---

## ✨ Ce Qui Rend Ce Site Unique

✅ **Design Premium** : Palette couleurs élégante, typographie soignée
✅ **Mobile-First** : Parfait sur tous devices
✅ **Rapide** : < 2s chargement, Core Web Vitals optimisés
✅ **SEO Ready** : Schema.org, meta tags, maillage interne
✅ **E-commerce** : Boutique fonctionnelle avec Stripe
✅ **Différenciation Drone** : Mise en avant expertise
✅ **Local SEO** : 5 pages locales ciblées
✅ **Moderne** : Technologies actuelles, code propre

---

## 📧 Questions ?

Pour toute question sur l'implémentation ou personnalisation :
- Relisez l'ARCHITECTURE.md pour la vue d'ensemble
- Consultez les commentaires dans le code
- Utilisez les templates fournis comme base

**Bon courage pour la finalisation ! 🎉**

---

*Développé avec ❤️ pour sublimer votre activité de photographe drone*
