import { body } from "express-validator";

export const updateValidator = () => {
  return [
    body("title").optional().isString(),
    body("description").optional().isString(),
    body("isCompleted").optional().isBoolean(),
  ];
};
