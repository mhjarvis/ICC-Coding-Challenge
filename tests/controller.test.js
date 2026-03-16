const { errors, generateToken } = require("../controllers/messageController")

// Test to ensure token is generated, is a string and not null/undefined
describe("Token Generation", () => {
	test("returns token that is a string", () => {
		const token = generateToken()
		console.log(token)
		expect(typeof token).toBe("string")
		expect(token).not.toBe(null)
		expect(token).not.toBe(undefined)
	})
})
