import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { errorResponse } from "../../utils/errorResponse";
import { generateToken } from "../../utils/generate";
import { comparePassword } from "../../utils/password";
import httpStatus from "http-status-codes";

const loginHandler = async (req, res) => {
	const { email, password } = req.body;
	const findUser = await userService.getOneUser({ email });
	if (!findUser) return returnError(res, "Invalid credentials!");
	if (findUser.deletedAt) return returnError(res, "Deleted Account!");
	const compare = await comparePassword(password, findUser.password);
	if (!compare) return returnError(res, "Invalid Password!");
	const token = generateToken(findUser.uuid);
	return res.status(httpStatus.ACCEPTED).json({ token });
};

const returnError = (res, message) => {
	return res.status(httpStatus.UNAUTHORIZED).json({ message });
};

export const loginController = errorHandlerWrapper(loginHandler);
