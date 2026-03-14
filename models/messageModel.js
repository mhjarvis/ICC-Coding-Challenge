const mongoose = require("mongoose")
const validator = require("validator") // Using validator for input validations

// Schema for creating new message document
const messageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "You must include a name"],
		// Validate that there are only letters in the string (ignore spaces)
		validate: [
			(str) => validator.isAlpha(str, "en-US", { ignore: " " }),
			"Name should only include letters",
		],
	},
	email: {
		type: String,
		required: [true, "You must include a email"],
		// Validate that this is a valid email
		validate: [validator.isEmail, "Email must be a valid email"],
	},
	message: {
		type: String,
		required: [true, "You must include a message"],
		// Validate that messsage is 250 chars or less
		maxlength: [250, "Message must be 250 characters or less"],
	},
	token: {
		type: String,
		required: [true, "Token not created"],
		unique: true,
	},
	// Using this bool to control viewing message only once
	viewed: {
		type: Boolean,
		default: false,
	},
	// Message will expire (delete) after 86,400 seconds (24 hours) +- 60 secs
	createdAt: {
		type: Date,
		expires: [86400],
		default: Date.now(),
	},
})

const Message = mongoose.model("Message", messageSchema)

module.exports = Message
