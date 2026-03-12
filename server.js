const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = require("./app")

// Use config.env file
dotenv.config({ path: "./config.env" })

const DB = process.env.DATABASE.replace(
	"<db_password>",
	process.env.DATABASE_PASSWORD,
)

mongoose.connect(DB).then((con) => {
	console.log("Connected to Database is successful")
})

// placeholder - put in .env file
const port = process.env.PORT

// Start server and listen for requests
app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})
