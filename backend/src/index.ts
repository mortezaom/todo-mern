// src/index.ts
import { createApp } from "./app";
import { dbCreate, AppDataSource } from "./db";
import { Env } from "./env";

const setupServer = async () => {
	await dbCreate();
	await AppDataSource.initialize();

	const app = createApp();
	const { port } = Env;

	app.listen(port, () => {
		console.log(`Server is listening on ${port}.`);
	});
};

setupServer();
