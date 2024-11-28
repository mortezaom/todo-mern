import { TasksValidator } from "../validators";
import { TasksController } from "../controllers";

import { Router, type Router as ExpressRouter } from "express";
import { checkAuth } from "../utils";

export const tasksRouter: ExpressRouter = Router();

tasksRouter.get("/", checkAuth, TasksController.getAllController);

tasksRouter.post(
	"/",
	checkAuth,
	TasksValidator.createValidator(),
	TasksController.createController,
);
tasksRouter.put(
	"/reorder",
	checkAuth,
	TasksValidator.reorderValidator(),
	TasksController.reorderController,
);

tasksRouter.get("/:id", checkAuth, TasksController.getSingleController);

tasksRouter.put("/:id", checkAuth, TasksController.updateController);

tasksRouter.delete("/:id", checkAuth, TasksController.deleteController);
