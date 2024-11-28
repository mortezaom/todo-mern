// src/app.ts
import express from "express";
import cors from "cors";
import { appRouter } from "./routes";
import { errorHandlerMiddleware, routeMiddleware } from "./middlewares";
import { clientUse } from "req-ip-scope";
import type { Application } from "express";

export const createApp = (): Application => {
	const app = express();

	app.use(cors());
	app.use(express.json());
	// comment this line if you want to run the test cases without issue (it cause the app to not close completely)
	app.use(clientUse());
	app.use(routeMiddleware);
	app.use("/health", (_req, res) => {
		res.json({ msg: "Hello World" });
	});
	app.use("/api/v1", appRouter);
	app.use(errorHandlerMiddleware);

	return app;
};
