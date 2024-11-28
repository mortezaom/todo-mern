import { tasksService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { encryptPassword } from "../../utils/encrypt";
import httpStatus from "http-status-codes";
import { errorResponse } from "../../utils/errorResponse";

const getSingleHandler = async (req, res) => {
	const { id } = req.params;
	try {
		const user = await tasksService.getOneTask({ id });
		return res.status(httpStatus.OK).json({ user });
	} catch (error) {
		return res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(errorResponse(error.toString()));
	}
};

export const getSingleController = errorHandlerWrapper(getSingleHandler);
