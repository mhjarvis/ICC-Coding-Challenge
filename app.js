const express = require("express")
const app = express()
const port = 8000

app.use(express.json())

const messages = []

app.post("/message", (req, res) => {
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
})

app.get("/message/:token", (req, res) => {
	console.log(req.params.token)
	res.status(200).json({
		success: true,
		message: "Testing",
		name: "Testing",
		email: "testing@test.com",
		token: req.params.token,
	})
})

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
