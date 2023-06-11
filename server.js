if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
const path = require("path")
app.use(express.static(path.join(__dirname, "build")))

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  )
} else {
  app.use(
    cors({
      origin: "https://simple-ecommerce.herokuapp.com",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  )
}

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const PORT = process.env.PORT || 4242

app.get("/", (req, res) => {
  res.send("Your API is up and running!")
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
        name: item.description,
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
