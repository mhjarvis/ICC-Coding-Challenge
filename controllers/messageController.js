const Message = require("./../models/messageModel")

// Create Unique token (possibly using UUID?)

// Handle POST request
// Using async/await for query to database
exports.createMessage = async (req, res) => {
	try {
		// testing
		const token = Date.now()

		// Create new Message in DB from user input and prevent user input for
		// viewed
		const newMessage = await Message.create({
			name: req.body.name,
			email: req.body.email,
			message: req.body.message,
			token: token,
			viewed: false,
		})
		console.log(req.body)

		// Needs udpating to include unique token
		// Set token from function and not user inpu
		res.status(201).json({
			success: true,
			error: null,
			token: token,
		})
	} catch (err) {
		res.status(400).json({
			success: false,
			// Needs to be updated to return what the issue is
			error: `Error: ${err.message}`,
			token: null,
		})
	}
}

// Handle GET request
exports.getMessage = async (req, res) => {
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
				error: "This message has already been viewed.",
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
			error: "Unknown error occured, check your route.",
			err,
			name: null,
			email: null,
			message: null,
		})
	}
}

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
