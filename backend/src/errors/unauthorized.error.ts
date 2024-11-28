import httpStatus from "http-status-codes";
import { CustomError } from "./custom.error";

export class UnauthorizedError extends CustomError {
  constructor(message: string, reasonCode?: string) {
    super(message, httpStatus.UNAUTHORIZED, reasonCode);
  }
}
