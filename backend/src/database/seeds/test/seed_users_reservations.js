import { crypt } from "../../../controller/utils/cryptography.js";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
	// Deletes ALL existing entries
	await knex("reservation").del();
	await knex("user").del();

	let pass = "password";
	await knex("user").insert([
		{
			id: 1, 
			first_name: "Alexander", 
			last_name: "Frizon",
			email: "alexander.frizon@example.com",
			role: "admin",
			password: crypt(pass)
		},
		{
			id: 2,
			first_name: "John", 
			last_name: "Doe",
			email: "john.doe@example.com",
			role: "user",
			password: crypt(pass)
		},
		{
			id: 3, 
			first_name: "Jane", 
			last_name: "Smith",
			email: "jane.smith@example.com",
			role: "user",
			password: crypt(pass),
		}
	]);

	await knex("reservation").insert([
		{
			id: 1,
			user_id: knex("user").select("id").first().where({ email: "alexander.frizon@example.com" }),
			date: "2024-08-01",
			time: "10:00:00",
			phone: "12345678901",
			people: 2,
		},
		{
			id: 2,
			user_id: knex("user").select("id").first().where({ email: "john.doe@example.com" }),
			date: "2024-08-02",
			time: "11:00:00",
			phone: "98765432101",
			people: 3,
		},
		{
			id: 3,
			user_id: knex("user").select("id").first().where({ email: "jane.smith@example.com" }),
			date: "2024-08-03",
			time: "12:00:00",
			phone: "09876543211",
			people: 4,
		}
	]);
};
