import { tasksService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status-codes";
import { errorResponse } from "../../utils/errorResponse";

const deleteHandler = async (req, res) => {
	const { id } = req.params;
	try {
		const task = await tasksService.deleteTask({ id });
		return res.status(httpStatus.OK).json(task);
	} catch (error) {
		return res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(errorResponse(error.toString()));
	}
};

export const deleteController = errorHandlerWrapper(deleteHandler);
