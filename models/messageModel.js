const mongoose = require("mongoose")

// Validators

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
		maxlength: [250, "Message must be 250 characters or less."],
	},
	token: {
		type: String,
		required: [true, "Token not created"],
		unique: true,
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
