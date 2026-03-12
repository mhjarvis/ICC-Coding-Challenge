const express = require("express")

// Destructure and import functions from messageController.js
const {
	createMessage,
	getMessage,
} = require("./../controllers/messageController")

const router = express.Router()

// Create and Get message
router.route("/").post(createMessage)
router.route("/:token").get(getMessage)

module.exports = router
