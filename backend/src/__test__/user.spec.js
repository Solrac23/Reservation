import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import db from "../database/db.js";
import dotenv from "dotenv";
import app from "../app.js";

dotenv.config({path: process.env.PATH_ENV});

describe("Create User", () => {
	beforeEach(async () => {
		await db.migrate.rollback();
		await db.migrate.latest();
	});

	afterAll(async () => {
		await db.destroy();
	});

	it("should be able create a new user", async () => {
		const res = await request(app)
			.post("/api/v1/user")
			.set("Accept", "application/json")
			.send({
				first_name: "Carlos",
				last_name: "Santos",
				email: "carlos.santos@gmail.com",
				role: "admin",
				password: "463855",
			});
		expect(res.status).toEqual(201);
		expect(res.text).toContain("true");
	});
});

