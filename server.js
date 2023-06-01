require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
// app.use(cors({ origin: 'http://your-frontend-url' }));

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

// app.post("/create-checkout-session", async (req, res) => {
//   const { items } = req.body
//   console.log(items) // Log the items here to check their structure

//   const line_items = products.map((product) => ({
//     price_data: {
//       currency: "usd",
//       unit_amount: product.price * 100, // Stripe requires the price in cents
//       product_data: {
//         name: product.description, // you need to provide product name here
//         description: product.specs,
//         images: [product.img],
//       },
//     },
//     quantity: product.quantity,
//   }))

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: lineItems,
//     mode: "payment",
//     success_url: "http://localhost:3000/success", // Replace with your success page
//     cancel_url: "http://localhost:3000/cancel", // Replace with your cancel page
//   })

//   res.json({ sessionId: session.id })
// })
app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body
  console.log(items) // Log the items here to check their structure

  const line_items = items.map((item) => ({
    price_data: {
      currency: "usd",
      unit_amount: item.price * 100, // Stripe requires the price in cents
      product_data: {
        name: item.description, // you need to provide product name here
        description: item.specs,
        // images: [item.img],
      },
    },
    quantity: item.quantity,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: line_items,
    mode: "payment",
    success_url: "https://localhost:3000/success", // Replace with your success page
    cancel_url: "https://localhost:3000/cancel", // Replace with your cancel page
  })

  res.json({ sessionId: session.id })
})

app.get("/success", (req, res) => {
  res.send("Payment was successful!")
})

app.listen(4242, () => console.log("Node server listening on port 4242!"))

// after const stripe
// const storeItems = new Map([
//   [1, { priceInCents: 10000, name: "Learn React Today" }],
//   [2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ])
//keep item information (name & price on server (ideally Database or jsonfile) that way you just send the ID from client to server and how many of each ID)
// npm run devStart

//   v1
//   const lineItems = items.map((item) => ({
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: item.name,
//       },
//       unit_amount: item.price * 100, // Stripe needs the price in cents
//     },
//     quantity: item.quantity,
//   }))
//   v2
//   const lineItems = items.map((item) => ({
//     price_data: {
//       currency: "usd",
//       product_data: {
//         name: item.name,
//         description: item.description,
//         images: [item.img],
//       },
//       unit_amount: item.price * 100, // Stripe needs the price in cents
//     },
//     quantity: item.quantity,
//   }))
