const express = require("express")

const messageRouter = require("./routes/messageRoutes")

const app = express()

app.use(express.json())

// Mount router at /api/message
app.use("/api/message", messageRouter)

module.exports = app
