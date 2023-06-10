// WORKING STRIPE SUCCESS CHECKOUT B4 HERROKU DEPLOYMENT
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config()
// }
// require("dotenv").config()
// const express = require("express")
// const cors = require("cors")
// const app = express()
// // app.use(cors())
// app.use(express.json())
// const path = require("path")
// app.use(express.static(path.join(__dirname, "build")))
// app.use(cors({ origin: "https://simple-ecommerce.herokuapp.com/" }))
// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

// // const fs = require("fs")
// // const https = require("https")
// // const httpsOptions = {
// //   key: fs.readFileSync(path.join(__dirname, "ssl", "server.key")),
// //   cert: fs.readFileSync(path.join(__dirname, "ssl", "server.cert")),
// // }
// // const server = https.createServer(httpsOptions, app)

// const PORT = process.env.PORT || 4242

// app.get("/", (req, res) => {
//   res.send("Hello, world!")
// })

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/build/index.html"))
// })

// app.post("/create-checkout-session", async (req, res) => {
//   const { items } = req.body
//   console.log(items) // Log the items here to check their structure

//   const line_items = items.map((item) => ({
//     price_data: {
//       currency: "usd",
//       unit_amount: item.price * 100, // Stripe requires the price in cents
//       product_data: {
//         name: item.description, // you need to provide product name here
//         description: item.specs,
//         // images: [item.img],
//       },
//     },
//     quantity: item.quantity,
//   }))

//   // const session = await stripe.checkout.sessions.create({
//   //   payment_method_types: ["card"],
//   //   line_items: line_items,
//   //   mode: "payment",
//   //   success_url: "https://simple-ecommerce-server.herokuapp.com/success", // Replace with your success page
//   //   cancel_url: "https://simple-ecommerce-server.herokuapp.com/cancel", // Replace with your cancel page
//   // })
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: line_items,
//     mode: "payment",
//     success_url: process.env.SUCCESS_URL, // Use environment variable
//     cancel_url: process.env.CANCEL_URL, // Use environment variable
//   })

//   res.json({ sessionId: session.id })
// })

// app.get("/success", (req, res) => {
//   res.send("Payment was successful!")
// })

// app.listen(4242, () => console.log("Node server listening on port 4242!"))

// WORKING STRIPE SUCCESS CHECKOUT B4 HERROKU DEPLOYMENT
// WORKING STRIPE SUCCESS CHECKOUT B4 HERROKU DEPLOYMENT
// WORKING STRIPE SUCCESS CHECKOUT B4 HERROKU DEPLOYMENT
// WORKING STRIPE SUCCESS CHECKOUT B4 HERROKU DEPLOYMENT
// WORKING STRIPE SUCCESS CHECKOUT B4 HERROKU DEPLOYMENT
// WORKING STRIPE SUCCESS CHECKOUT B4 HERROKU DEPLOYMENT
// WORKING STRIPE SUCCESS CHECKOUT B4 HERROKU DEPLOYMENT

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`)
// })

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`)
// })

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

// const session = await stripe.checkout.sessions.create({
//   payment_method_types: ["card"],
//   line_items: line_items,
//   mode: "payment",
//   success_url: "https://localhost:3000/success", // Replace with your success page
//   cancel_url: "https://localhost:3000/cancel", // Replace with your cancel page
// })

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

// TRYING TO DEPLOY TO HEROKU
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
const path = require("path")
app.use(express.static(path.join(__dirname, "build")))

// Only use this line in development
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:3000" }))
}

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const PORT = process.env.PORT || 4242

app.get("/", (req, res) => {
  res.send("Hello, world!")
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"))
})

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
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,
  })

  res.json({ sessionId: session.id })
})

app.get("/success", (req, res) => {
  res.send("Payment was successful!")
})

if (process.env.NODE_ENV === "production") {
  // Heroku will automatically set the 'production' environment for you
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
} else {
  const https = require("https")
  const fs = require("fs")
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, "ssl", "server.key")),
    cert: fs.readFileSync(path.join(__dirname, "ssl", "server.cert")),
  }
  const server = https.createServer(httpsOptions, app)

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}
