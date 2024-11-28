// src/test/routes/tasks.test.ts
import request from "supertest";
import { createApp } from "../src/app";
import type { Server } from "node:http";
import "./setup";
import { AppDataSource } from "../src/db";

describe("Tasks Routes", () => {
	let server: Server;
	const app = createApp();

	let token: string;
	let taskList: Array<{
		uuid: number;
		title: string;
		description: string;
		isCompleted: boolean;
		order;
	}> = [];

	beforeAll((done) => {
		server = app.listen(done);
	});

	afterAll((done) => {
		server.close(done);
	});

	it("login to get token", async () => {
		await request(server).post("/api/v1/auth/register").send({
			username: "username",
			email: "email@mail.com",
			password: "password",
		});
		const response = await request(server).post("/api/v1/auth/login").send({
			email: "email@mail.com",
			password: "password",
		});
		expect(response.status).toBe(202);
		expect(response.body).toHaveProperty("token");
		token = response.body.token;
	});

	it("should create task", async () => {
		const response = await request(server)
			.post("/api/v1/tasks")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "task title",
				description: "task description",
			});
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("uuid");

		// create another one as well
		const response2 = await request(server)
			.post("/api/v1/tasks")
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "task title 2",
				description: "task description 2",
			});
		expect(response2.status).toBe(201);
		expect(response2.body).toHaveProperty("uuid");
	});

	it("should get all tasks", async () => {
		const response = await request(server)
			.get("/api/v1/tasks")
			.set("Authorization", `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("tasks");

		taskList = response.body.tasks;
	});

	it("should get single task", async () => {
		const response = await request(server)
			.get(`/api/v1/tasks/${taskList[0].uuid}`)
			.set("Authorization", `Bearer ${token}`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("uuid");
	});

	it("should update task", async () => {
		const response = await request(server)
			.put(`/api/v1/tasks/${taskList[0].uuid}`)
			.set("Authorization", `Bearer ${token}`)
			.send({
				title: "task title updated",
				description: "task description updated",
			});
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("uuid");
		expect(response.body.title).toBe("task title updated");
	});

	it("should mark task as completed", async () => {
		const response = await request(server)
			.put(`/api/v1/tasks/${taskList[0].uuid}`)
			.set("Authorization", `Bearer ${token}`)
			.send({
				isCompleted: true,
			});
		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty("uuid");
		expect(response.body.isCompleted).toBe(true);
	});

	it("should delete task", async () => {
		const response = await request(server)
			.delete(`/api/v1/tasks/${taskList[0].uuid}`)
			.set("Authorization", `Bearer ${token}`);
		expect(response.status).toBe(200);
	});
});

afterAll(async () => {
	if (AppDataSource.isInitialized) {
		await AppDataSource.destroy();
	}
});