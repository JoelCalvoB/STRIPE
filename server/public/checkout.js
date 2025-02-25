// This is your test publishable API key.
const stripe = Stripe("pk_test_51QvsiWJovX47gsxLNGMiWwuksKYZAVwv5YdJYS2vzwYnyEpxdZbeuS7QCdroUEr529yM2dOPHIfpYzgWmoz30D0S0068L8eYnt");

initialize();

// Create a Checkout Session as soon as the page loads
async function initialize() {
  const response = await fetch("/create-checkout-session", {
    method: "POST",
  });

  const { clientSecret } = await response.json();

  const checkout = await stripe.initEmbeddedCheckout({
    clientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}