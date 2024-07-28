// functions/index.js
const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_51PC60hSBLn8coPI1mSE4rJyRtXIV0JWtnwTw00QfMV84dJrVAZ9rRIRjSebtCFa08BUJdEoFufHgOghnYNSGfYZq00KpIxgVaX'); // replace with your Stripe secret key

export const createPaymentIntent = https.onCall(async (data, context) => {
  try {
    const { amount } = data;

    // Create a PaymentIntent with the amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr', // or the currency you are using
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    throw new https.HttpsError('internal', 'Unable to create PaymentIntent');
  }
});
