import { body } from "express-validator";

export const reorderValidator = () => {
	return [
		body("tasks").isArray(),
		body("tasks.*.uuid").isString(),
		body("tasks.*.order").isNumeric(),
	];
};
