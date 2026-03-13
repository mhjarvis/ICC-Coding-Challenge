const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = require("./app")

// Use .env file
dotenv.config({ path: "./config.env" })

// Asign port from .env file
const port = process.env.PORT

// Update Database connection string
const DB = process.env.DATABASE.replace(
	"<db_password>",
	process.env.DATABASE_PASSWORD,
)

// Connect to Database
mongoose.connect(DB).then((con) => {
	console.log("Connected to Database is successful")
})

// Start server and listen for requests
app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})
