// src/test/routes/user.test.ts
import request from "supertest";
import { createApp } from "../src/app";
import type { Server } from "node:http";
import "./setup";
import { AppDataSource } from "../src/db";

describe("User Route", () => {
	let server: Server;
	const app = createApp();

	beforeAll((done) => {
		server = app.listen(done);
	});

	afterAll((done) => {
		server.close(done);
	});

	it("should register user", async () => {
		const response = await request(server).post("/api/v1/auth/register").send({
			username: "username",
			email: "email@mail.com",
			password: "password",
		});
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("user");
	});

	it("should login user", async () => {
		const response = await request(server).post("/api/v1/auth/login").send({
			email: "email@mail.com",
			password: "password",
		});
		expect(response.status).toBe(202);
		expect(response.body).toHaveProperty("token");
	});
});



afterAll(async () => {
	if (AppDataSource.isInitialized) {
		await AppDataSource.destroy();
	}
});