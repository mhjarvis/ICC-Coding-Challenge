const { errors, generateToken } = require("../controllers/messageController")

// Test to ensure token is generated, is a string and not null/undefined
describe("Token Generation", () => {
	test("returns token that is a string", () => {
		const token = generateToken()

		expect(typeof token).toBe("string")
		expect(token).not.toBe(null)
		expect(token).not.toBe(undefined)
	})
})

// Test errors to return correct error message
const testError = {
	errors: {
		name: {
			message: "You must include a name",
		},
		message: {
			message: "You must include a message",
		},
	},
}

describe("POST error is formated correctly", () => {
	test("returns string that summarizes errors", () => {
		expect(errors(testError)).toBe(
			"You must include a name; You must include a message",
		)
	})
})
