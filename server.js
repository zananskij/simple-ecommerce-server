require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json())

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

app.listen(4242, () => console.log("Node server listening on port 4242!"))

// after const stripe
// const storeItems = new Map([
//   [1, { priceInCents: 10000, name: "Learn React Today" }],
//   [2, { priceInCents: 20000, name: "Learn CSS Today" }],
// ])
//keep item information (name & price on server (ideally Database or jsonfile) that way you just send the ID from client to server and how many of each ID)
// npm run devStart