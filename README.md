# ICC - Coding Challenge

A REST API built with **Node.js, Express, MongoDB, and Mongoose** that allows users to submit a message to a database, receive a token for the message in return, and allow one-time access to that message.

---

### Testing with Postman

1. Send POST message to /message
2. Copy the returned 'Token'
3. Send GET request to /message/<token>

---

## Tech Stack

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Jest (for testing)

## Features

- Create a new message using the /message endpoint.
- Messages are stored in MongoDB (Atlas).
- Messages are stored with a unique token that is returned to be used to generate a link.
- Messages can only be viewed once.
- Messages will expire after 24 hours.
- Input validation for name, email, and messaging fields with error handling.

---

## Live API

A deployed version of the messaging API is available here:

```bash
Base URL:
https://icc-coding-challenge.onrender.com
```

NOTE: This API is hosted via Render's free tier and may take some time to spin up (give it 60 seconds after first request to spin up).

### Endpoints

Create a message:

```bash
POST /message

Example:
https://icc-coding-challenge.onrender.com/message
```

Example body:

```json
{
	"name": "John Doe",
	"email": "john@test.com",
	"message": "This is a message"
}
```

Retrieve a message:

```bash
GET /message/:token

Example:
https://icc-coding-challenge.onrender.com/message/:token
```

## Installation

### 1. Clone the project from github.

```bash
git clone https://github.com/mhjarvis/ICC-Coding-Challenge.git
```

### 2. Install dependencies.

```bash
cd ICC-Coding-Challenge
npm install
```

### 3. Create a config.env file in the root folder.

```bash
cp example.env config.env
```

You will need to replace the values in config.env that you created with your MongoDB credentials.

---

## Environment Setup

This project uses MongoDB Atlas. You will need to set up an account and create a cluster with the following steps.

### 1. Create a free MongoDB Atlas Account

[MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### 2. Create a Cluster

After you sign in:

- Select <b>Create a Cluster</b> if not automatically prompted.
- Select the <b>Free Tier</b>.
- Select your <b>provider and region</b> (default is fine).
- Click <b>Create Deployment</b>.

### 3. Setup your Database

When prompted:

- Add your connection IP address (this should be completed automatically).
- Create your database <b>username</b> and <b>password</b>.
- Click <b>Create Database User</b>

Add the <b>username</b> and <b>password</b> values to your config.env file:

```bash
USER=<username>
DATABASE_PASSWORD=<password>
```

### 4. Get your Connection String

- Click <b>Choose a connection method</b>.
- Click on the <b>Drivers</b> option.
- Ensure <b>Node.js</b> is selected as your <b>Driver</b>.
- Install the driver if needed:

```bash
npm install mongodb
```

- Add the <b>Connection String</b> to your config.env file:

```bash
DATABASE=<connection_string>
```

NOTE: This connection string may already have your <b>username</b> and <b>password</b> included, which is fine for testing.

---

## Running the Application

#### Launch the application and connect to your server.

```bash
npm start
```

#### The API will run at:

```bash
http://localhost:8000
```

---

## API Endpoints

### Create Message

#### POST

```bash
/message

Example:
http://localhost:8000/message
```

#### Expected Request Body (raw)

```json
{
	"name": "John",
	"email": "john@test.com",
	"message": "This is a message."
}
```

#### Expected Response

```json
{
	"success": true,
	"error": null,
	"token": "token-value"
}
```

### Get message by Token

#### GET

```bash
/message/:token

Example:
http://localhost:8000/message/:token
```

#### Expected Response (successful)

```json
{
	"success": true,
	"error": null,
	"name": "John",
	"email": "john@test.com",
	"message": "This is a message."
}
```

#### NOTE: If localhost is causing issues, you may try: 127.0.0.1.

---

## Testing

You can run tests with Jest via:

```bash
npm test
```

## Project Structure

```
ICC-Coding-Challenge
├── controllers
├── models
├── routes
├── tests
│
├── app.js
├── config.env
├── package.json
├── README.md
├── server.js
```

## Notes

- MongoDB Atlas is used as the database.
- An example `.env` file is provided and will need to be updated with your MongoDB Atlas connection string.
- The live version may take up to 60 seconds to spin up after initial request.

## Author

mhjarvis
