const app = require("./app")

// placeholder - put in .env file
const port = 8000

// Start server and listen for requests
app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})
