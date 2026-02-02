/**
 * PHOTOGRAPHE DRONE NORD GIRONDE - Intégration Stripe
 * Gestion des paiements en ligne
 */

(function() {
  'use strict';

  // IMPORTANT: Remplacer par votre clé publique Stripe
  const STRIPE_PUBLIC_KEY = 'pk_test_VOTRE_CLE_PUBLIQUE_STRIPE';

  let stripe = null;
  let elements = null;
  let cardElement = null;

  // ==========================================================================
  // Initialisation Stripe
  // ==========================================================================

  const initStripe = () => {
    if (typeof Stripe === 'undefined') {
      console.error('Stripe.js n\'est pas chargé');
      return false;
    }

    try {
      stripe = Stripe(STRIPE_PUBLIC_KEY);
      return true;
    } catch (error) {
      console.error('Erreur initialisation Stripe:', error);
      return false;
    }
  };

  // ==========================================================================
  // Créer le formulaire de paiement
  // ==========================================================================

  const createPaymentForm = () => {
    if (!stripe) return;

    // Créer Elements
    elements = stripe.elements();

    // Style personnalisé pour la carte
    const style = {
      base: {
        fontSize: '16px',
        color: '#1a1a1a',
        fontFamily: '"Inter", sans-serif',
        '::placeholder': {
          color: '#999'
        }
      },
      invalid: {
        color: '#f44336',
        iconColor: '#f44336'
      }
    };

    // Créer l'élément carte
    cardElement = elements.create('card', { style });

    // Monter l'élément dans le DOM
    const cardContainer = document.getElementById('card-element');
    if (cardContainer) {
      cardElement.mount('#card-element');

      // Gérer les erreurs de validation
      cardElement.on('change', (event) => {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });
    }
  };

  // ==========================================================================
  // Traiter le paiement
  // ==========================================================================

  const processPayment = async (billingDetails) => {
    if (!stripe || !cardElement) {
      window.showToast('Erreur d\'initialisation du paiement', 'error');
      return false;
    }

    window.showLoading();

    try {
      // Créer le PaymentMethod
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails
      });

      if (error) {
        throw error;
      }

      // Envoyer au serveur pour créer PaymentIntent
      // NOTE: Cette partie nécessite un backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: window.cart.getTotal() * 100, // En centimes
          items: window.cart.items,
          billingDetails: billingDetails
        })
      });

      const paymentData = await response.json();

      if (paymentData.error) {
        throw new Error(paymentData.error);
      }

      // Confirmer le paiement si nécessaire
      if (paymentData.requires_action) {
        const { error: confirmError } = await stripe.confirmCardPayment(
          paymentData.client_secret
        );

        if (confirmError) {
          throw confirmError;
        }
      }

      // Paiement réussi
      window.hideLoading();
      handlePaymentSuccess(paymentData);
      return true;

    } catch (error) {
      window.hideLoading();
      handlePaymentError(error);
      return false;
    }
  };

  // ==========================================================================
  // Succès du paiement
  // ==========================================================================

  const handlePaymentSuccess = (data) => {
    window.showToast('Paiement réussi !', 'success');
    window.trackEvent('Ecommerce', 'purchase', 'success', window.cart.getTotal());

    // Vider le panier
    window.cart.clear();

    // Fermer le modal de paiement
    window.closeModal('payment-modal');

    // Afficher la confirmation
    window.openModal('confirmation-modal');

    // Envoyer l'email de confirmation (via backend)
    sendConfirmationEmail(data);
  };

  // ==========================================================================
  // Erreur de paiement
  // ==========================================================================

  const handlePaymentError = (error) => {
    console.error('Erreur paiement:', error);
    window.showToast(error.message || 'Erreur lors du paiement', 'error');
    window.trackEvent('Ecommerce', 'purchase', 'error');

    const errorElement = document.getElementById('card-errors');
    if (errorElement) {
      errorElement.textContent = error.message;
    }
  };

  // ==========================================================================
  // Envoyer email de confirmation
  // ==========================================================================

  const sendConfirmationEmail = async (data) => {
    try {
      await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.billing_details.email,
          orderId: data.id,
          items: window.cart.items,
          total: window.cart.getTotal()
        })
      });
    } catch (error) {
      console.error('Erreur envoi email:', error);
    }
  };

  // ==========================================================================
  // Modal de paiement
  // ==========================================================================

  const openCheckout = () => {
    if (window.cart.items.length === 0) {
      window.showToast('Votre panier est vide', 'warning');
      return;
    }

    // Créer/ouvrir le modal
    const modal = createCheckoutModal();
    document.body.appendChild(modal);
    window.openModal('payment-modal');

    // Initialiser Stripe si pas déjà fait
    if (!stripe) {
      initStripe();
    }

    // Créer le formulaire de paiement
    createPaymentForm();
  };

  // ==========================================================================
  // Créer le modal de checkout
  // ==========================================================================

  const createCheckoutModal = () => {
    const existingModal = document.getElementById('payment-modal');
    if (existingModal) {
      return existingModal;
    }

    const modal = document.createElement('div');
    modal.id = 'payment-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Finaliser votre commande</h3>
          <button onclick="window.closeModal('payment-modal')" class="btn-icon">×</button>
        </div>
        <div class="modal-body">
          <!-- Résumé commande -->
          <div class="order-summary">
            <h4>Récapitulatif</h4>
            <div id="order-items"></div>
            <div class="order-total">
              <strong>Total:</strong>
              <strong id="order-total-amount">${window.formatPrice(window.cart.getTotal())}</strong>
            </div>
          </div>

          <!-- Informations de facturation -->
          <form id="payment-form">
            <h4>Informations de facturation</h4>

            <div class="form-group">
              <label class="form-label">Nom complet *</label>
              <input type="text" id="billing-name" class="form-input" required>
            </div>

            <div class="form-group">
              <label class="form-label">Email *</label>
              <input type="email" id="billing-email" class="form-input" required>
            </div>

            <div class="form-group">
              <label class="form-label">Téléphone *</label>
              <input type="tel" id="billing-phone" class="form-input" required>
            </div>

            <div class="form-group">
              <label class="form-label">Adresse *</label>
              <input type="text" id="billing-address" class="form-input" required>
            </div>

            <div class="grid grid-2">
              <div class="form-group">
                <label class="form-label">Code postal *</label>
                <input type="text" id="billing-postal" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">Ville *</label>
                <input type="text" id="billing-city" class="form-input" required>
              </div>
            </div>

            <!-- Carte bancaire Stripe -->
            <h4 style="margin-top: 2rem;">Paiement sécurisé</h4>
            <div class="form-group">
              <label class="form-label">Carte bancaire *</label>
              <div id="card-element" style="padding: 1rem; border: 2px solid var(--gray-medium); border-radius: var(--radius-base);"></div>
              <div id="card-errors" class="form-error"></div>
            </div>

            <!-- Alternative SumUp -->
            <div style="margin-top: 1rem; padding: 1rem; background: var(--gray-light); border-radius: var(--radius-base);">
              <p><strong>Autre moyen de paiement :</strong></p>
              <p>Vous pouvez également payer via <a href="https://sumup.com/votre-lien" target="_blank" style="color: var(--secondary); font-weight: 600;">SumUp</a></p>
            </div>

            <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 2rem;">
              Payer ${window.formatPrice(window.cart.getTotal())}
            </button>
          </form>
        </div>
      </div>
    `;

    // Event listener pour le formulaire
    setTimeout(() => {
      const form = document.getElementById('payment-form');
      if (form) {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();

          const billingDetails = {
            name: document.getElementById('billing-name').value,
            email: document.getElementById('billing-email').value,
            phone: document.getElementById('billing-phone').value,
            address: {
              line1: document.getElementById('billing-address').value,
              postal_code: document.getElementById('billing-postal').value,
              city: document.getElementById('billing-city').value,
              country: 'FR'
            }
          };

          await processPayment(billingDetails);
        });
      }

      // Remplir le résumé de commande
      updateOrderSummary();
    }, 100);

    return modal;
  };

  // ==========================================================================
  // Mettre à jour le résumé de commande
  // ==========================================================================

  const updateOrderSummary = () => {
    const container = document.getElementById('order-items');
    if (!container) return;

    container.innerHTML = window.cart.items.map(item => `
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span>${item.name} x${item.quantity}</span>
        <span>${window.formatPrice(item.price * item.quantity)}</span>
      </div>
    `).join('');
  };

  // ==========================================================================
  // Modal de confirmation
  // ==========================================================================

  const createConfirmationModal = () => {
    const modal = document.createElement('div');
    modal.id = 'confirmation-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content" style="text-align: center; padding: 3rem;">
        <div style="font-size: 4rem; color: var(--success); margin-bottom: 1rem;">✓</div>
        <h2>Commande confirmée !</h2>
        <p style="font-size: 1.2rem; margin: 2rem 0;">
          Merci pour votre commande. Vous allez recevoir un email de confirmation avec tous les détails.
        </p>
        <p style="color: var(--gray-dark);">
          Nous vous contacterons prochainement pour organiser la prestation.
        </p>
        <button onclick="window.closeModal('confirmation-modal'); window.location.href='index.html'"
                class="btn btn-primary" style="margin-top: 2rem;">
          Retour à l'accueil
        </button>
      </div>
    `;
    document.body.appendChild(modal);
  };

  // ==========================================================================
  // Initialisation
  // ==========================================================================

  const init = () => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Créer le modal de confirmation
    createConfirmationModal();

    // Attacher l'événement au bouton checkout
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', openCheckout);
    }

    console.log('✓ Stripe initialized');
  };

  // Exposer globalement
  window.openCheckout = openCheckout;

  init();

})();
