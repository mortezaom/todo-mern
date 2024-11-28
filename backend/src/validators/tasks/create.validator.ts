import { body } from "express-validator";

export const createValidator = () => {
	return [
		body("title").notEmpty().withMessage("Title is required."),
		body("description").optional(),
		body("isCompleted").optional().default(false),
	];
};
