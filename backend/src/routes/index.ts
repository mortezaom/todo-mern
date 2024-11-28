import { authRouter } from "./authRouter";
import { Router, type Router as ExpressRouter } from "express";
import { tasksRouter } from "./tasksRouter";

export const appRouter: ExpressRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/tasks", tasksRouter);
