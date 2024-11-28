// src/test/setup.ts
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { AppDataSource } from "../src/db";
import { createDatabase } from "typeorm-extension";

beforeAll(async () => {
	Object.assign(AppDataSource.options, {
		ifNotExist: true,
		type: "sqlite",
		database: ":memory:",
		dropSchema: true,
		entities: [`${__dirname}/../src/entities/index.{ts,js}`],
		synchronize: true,
		logging: false,
		entitySkipConstructor: true,
		namingStrategy: new SnakeNamingStrategy(),
	});
	await AppDataSource.initialize();
});

afterAll(async () => {
	if (AppDataSource.isInitialized) {
		await AppDataSource.destroy();
	}
});

afterEach(async () => {
	jest.clearAllMocks();
});
