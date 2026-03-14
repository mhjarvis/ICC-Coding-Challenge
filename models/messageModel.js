const mongoose = require("mongoose")

// Schema for creating new message document
const messageSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Must include a name."],
	},
	email: {
		type: String,
		required: [true, "Must include a email."],
	},
	message: {
		type: String,
		required: [true, "Must include a message"],
	},
	token: {
		type: String,
		required: [true, "Token not created"],
	},
	viewed: {
		type: Boolean,
		default: false,
	},
})

const Message = mongoose.model("Message", messageSchema)

module.exports = Message

/* Input: JSON, fields:
- name [String]
- email [String]
- message [String]
Note: all data should be validated reasonably, and the message should be limited to 250 characters */
