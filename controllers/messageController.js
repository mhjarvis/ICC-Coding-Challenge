const Message = require("./../models/messageModel")
const uuid = require("crypto")

// Function to handle error output for user
const formatError = (err) => {
	const errors = []

	for (let key in err.errors) {
		errors.push(err.errors[key].message)
	}

	return errors.join("; ")
}

const generateToken = () => {
	return uuid.randomUUID()
}

// Handle POST request
// Using async/await for query to database
const createMessage = async (req, res) => {
	try {
		// Use UUID to generate unique time-based token
		const token = generateToken()

		// Create new Message in DB from input and prevent user input for viewed
		const newMessage = await Message.create({
			name: req.body.name,
			email: req.body.email,
			message: req.body.message,
			token: token,
			viewed: false,
		})

		if (newMessage) {
			return res.status(201).json({
				success: true,
				error: null,
				token: token,
			})
		}
	} catch (err) {
		// Handle error output for readability
		const error = formatError(err)

		return res.status(400).json({
			success: false,
			error: error,
			token: null,
		})
	}
}

// Handle GET request
const getMessage = async (req, res) => {
	try {
		// Search DB for document with matching token
		const message = await Message.findOne({ token: req.params.token })

		// If message does not exist return 404 and error
		if (!message) {
			return res.status(404).json({
				success: false,
				error: "This message does not exist",
				name: null,
				email: null,
				message: null,
			})
		}

		// If message has already been viewed, return 404 and error
		if (message.viewed === true) {
			return res.status(404).json({
				success: false,
				error: "This message has already been viewed",
				name: null,
				email: null,
				message: null,
			})
		}

		// Update message and set viewed to true so it cannot be seen again
		message.viewed = true
		await message.save()

		// If message exists and has NOT been viewed, return message
		return res.status(200).json({
			success: true,
			error: null,
			name: message.name,
			email: message.email,
			message: message.message,
		})
	} catch (err) {
		return res.status(404).json({
			success: true,
			error: "Unknown error occured",
			name: null,
			email: null,
			message: null,
		})
	}
}

module.exports = { createMessage, getMessage, formatError, generateToken }

/* Endpoint #1 - Creating the token

Path: /message
Method: POST

Input: JSON, fields:
- name [String]
- email [String]
- message [String]
Note: all data should be validated reasonably, and the message should be limited to 250 characters

Output: JSON, fields:
- success [Boolean]
- error [String] // If error(s) present, this field should return a string with a suitable error message. If no error, it should return null. (Note: This field name was updated to ‘error’ instead of ‘message’ as listed on the original spec) 
- token [String] // The generated token. If an error occurs, this field should be null. 


Endpoint #2 - Retrieving the message

Path: /message/:token
Method: GET

Output: JSON, fields:
- success [Boolean]
- error [String] // If error(s) present, this field should return a string with a suitable error message. If no error, it should return null. (Note: This field name was updated to ‘error’ instead of ‘message’ as listed on the original spec)
- name [String]
- email [String]
- message [String] 
Note: If the request is successful, the name, email, and message fields should match the values provided in endpoint #1. If an error occurs, the name, email, and message fields should be returned but set to null.
 */
