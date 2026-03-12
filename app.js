const express = require("express")
const app = express()
const port = 8000

app.use(express.json())

// Placeholder until connected to Server
const messages = [
	{
		success: true,
		message: "This is Item 1",
		name: "Test",
		email: "testing@test.com",
		id: 1773196349880,
	},
]

// Handle POST request
const createMessage = (req, res) => {
	console.log("Request body:", req.body)

	// testing
	const token = Date.now()
	const newMessage = Object.assign({ id: token }, req.body)
	messages.push(newMessage)
	console.log(messages)

	res.status(201).json({
		success: true,
		message: req.body.message,
		token: token,
	})
}

// Handle GET request
const getMessage = (req, res) => {
	//console.log(req.params.token)

	const returnMessage = messages.find(
		(message) => message.id === req.params.token * 1,
	)

	if (returnMessage) {
		return res.status(200).json({
			success: true,
			message: returnMessage.message,
			name: returnMessage.name,
			email: returnMessage.email,
		})
	}
	res.status(404).json({
		success: false,
		message: "No message in DB",
	})
}

// Create router for message routes and mount router at /api/message
const messageRouter = express.Router()
app.use("/api/message", messageRouter)

// Create and Get message
messageRouter.route("/").post(createMessage)
messageRouter.route("/:token").get(getMessage)

// Start server and listen for requests
app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})

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
