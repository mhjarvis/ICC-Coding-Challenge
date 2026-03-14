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
		// Add viewed input set to false

		res.status(201).json({
			success: true,
			message: newMessage.message,
			token: token,
		})
	} catch (err) {
		res.status(400).json({
			success: false,
			message: err,
		})
	}
}

// Handle GET request
exports.getMessage = async (req, res) => {
	try {
		// Search DB for document with matching token
		const message = await Message.findOne({ token: req.params.token })

		console.log(message)

		// If message does not exist return 404 and error
		if (!message) {
			return res.status(404).json({
				success: false,
				message: "Error: message does not exist",
			})
		}

		// If message has already been viewed, return 404 and error
		if (message.viewed === true) {
			return res.status(404).json({
				success: false,
				message: "Error: message already viewed",
			})
		}

		// Update message and set viewed to true so it cannot be seen again
		message.viewed = true
		await message.save()

		// If message exists and has NOT been viewed, return message
		return res.status(200).json({
			success: true,
			message: message.message,
		})
	} catch (err) {
		return res.status(404).json({
			success: false,
			message: err,
		})
	}
}

/* Path: /message
Method: POST

Input: JSON, fields:
- name [String]
- email [String]
- message [String]
Note: all data should be validated reasonably, and the message should be limited to 250 characters

Output: JSON, fields:
- success [Boolean]
- message [String]
- token [String]
Note: the message should be null unless an error has occurred */

/* Path: /message/:token
Method: GET

Output: JSON, fields:
- success [Boolean]
- message [String]
- name [String]
- email [String]
- message [String]
Note: the message should be null unless an error has occurred
Note: the name, email, and message fields should match the values provided in endpoint #1 */
