const express = require("express")

const messageRouter = require("./routes/messageRoutes")

const app = express()

app.use(express.json())

// Mount router at /api/message
app.use("/api/message", messageRouter)

// Handle all other routes
app.all("{*splat}", (req, res, next) => {
	res.status(404).json({
		success: false,
		error: `This route does not exist on this server.`,
	})
	next()
})

module.exports = app
