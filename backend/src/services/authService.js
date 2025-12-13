import jwt from "jsonwebtoken";
import { decrypt } from "../controller/utils/cryptography.js";
import db from "../database/db.js";
import ErrorHandler from "../error/errorHandler.js";

export async function authenticateService({email, password}) {
	if(!email) {
		throw new ErrorHandler("Email não fornecido", 400);
	}

	if(!password){
		throw new ErrorHandler("Password não fornecido", 400);
	}

	try {
		const user = await db
			.where("email", email)
			.from("users")
			.select("*")
			.first();

		const isValidPassword = decrypt(password, user.password);

		if (!user || !isValidPassword) {
			return new ErrorHandler("Email ou senha inválidos", 401);
		}
 
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

		return {token};
	} catch (err) {
		throw new ErrorHandler("Usuario nao encontrado", 404);
	}
}