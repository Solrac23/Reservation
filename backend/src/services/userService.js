import { crypt } from "../controller/utils/cryptography.js";
import db from "../database/db.js";
import { ErrorDatabase } from "../error/errorDatabase.js";
import ErrorHandler from "../error/errorHandler.js";

export async function createUserService({
	first_name,
	last_name,
	email,
	password,
	role
}) {

	if(!role) {
		role = "user";
	}

	const pass = crypt(password);

	const userAlreadyExists = await db("users")
		.where("email", email)
		.select("*")
		.first();
  
	if(userAlreadyExists){
		throw new ErrorHandler("Usuário já existe", 409);
	}

	try {
		// Tentando criar uma nova reserva no banco de dados utilizando o modelo Reservation
		await db("users").insert({
			first_name, 
			last_name, 
			email, 
			role,
			password: pass  // A senha é criptografada antes de ser salva no banco de dados
		});
	} catch (err) {
		if(err.code === "SQLITE_CONSTRAINT"){
			throw new ErrorDatabase(err.message);
		}
		// Se ocorrer algum erro durante o processo de criação da reserva
		throw new ErrorHandler("Erro ao criar usuário", 500);
	}
}

export async function findAllUserService() {
	try {
		const users = await db.select("first_name", "last_name", "email", "role").from("users");

		return users;
	} catch (err) {
		throw new ErrorHandler("Erro ao listar usuários", 500);
	}
}

export async function findUserByIdService(userId) {
	try {
		const user = await db.where("id", userId)
			.from("users")
			.select(["id", "first_name", "last_name", "email", "role", "created_at", "updated_at"])
			.first();

		return user;
	} catch (err) {
		throw new ErrorHandler("Erro ao buscar usuário", 500);
	}
}