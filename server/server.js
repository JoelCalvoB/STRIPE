// const stripe = require("stripe")("sk_test_51QvsiWJovX47gsxLxWwWvuyj4zce1s4w65KopUNrYLcIgMtiifbXOvPsoJP7coFT0wb8krIvnlfMJaT3cmcxG95T00lday3xTM");
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(express.static("public"));
// app.use(cors());
// app.use(bodyParser.json());

// const YOUR_DOMAIN = "http://localhost:4242";

// // 🟢 CREAR SESIÓN DE CHECKOUT PARA SUSCRIPCIONES
// app.post("/checkout", async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       mode: "subscription", // 💡 Cambiado de 'payment' a 'subscription'
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: "price_1QymoiJovX47gsxLRaLb62MH", // 💰 Reemplaza con el ID del precio en Stripe
//           quantity: 1,
//         },
//       ],
//       success_url: `${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//     });

//     res.status(200).json(session);
//   } catch (error) {
//     console.error("Error creando la sesión de Stripe:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // 🟢 OBTENER EL ESTADO DE LA SUSCRIPCIÓN
// app.get("/session-status", async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
//     const subscription = await stripe.subscriptions.retrieve(session.subscription);

//     res.json({
//       status: subscription.status, // active, incomplete, canceled, etc.
//       customer_email: session.customer_details.email,
//       subscription_id: subscription.id,
//     });
//   } catch (error) {
//     console.error("Error obteniendo el estado de la suscripción:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(4242, () => console.log("🔥 Servidor corriendo en http://localhost:4242"));






// This is your test secret API key.
const stripe = require('stripe')('sk_test_51QvsiWJovX47gsxLxWwWvuyj4zce1s4w65KopUNrYLcIgMtiifbXOvPsoJP7coFT0wb8krIvnlfMJaT3cmcxG95T00lday3xTM');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(cors())
app.use(bodyParser.json());

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/checkout', async (req, res) => {
  const items = req.body.items.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.image]
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty
    }
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [...items],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.status(200).json(session);
});

app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});

app.listen(4242, () => console.log('Running on port 4242'));