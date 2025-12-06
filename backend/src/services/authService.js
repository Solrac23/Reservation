import db from "../database/db.js";
import ErrorHandler from "../error/error.js";

export async function authenticateService(email) {
	if(!email) {
		throw new ErrorHandler("Email is not provided", 400);
	}

	try {
		const user = await db
			.where("email", email)
			.from("users")
			.select("*")
			.first();

		return user;
	} catch (err) {
		throw new ErrorHandler("Usuario nao encontrado", 404);
	}
}