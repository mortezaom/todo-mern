import { tasksService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status-codes";
import { errorResponse } from "../../utils/errorResponse";

const updateHandler = async (req, res) => {
	const { id } = req.params;
  
	const { title, description, isCompleted } = req.body;
	try {
		const task = await tasksService.updateTask({
			id,
			title,
			description,
			isCompleted,
		});
		return res.status(httpStatus.OK).json(task);
	} catch (error) {
		return res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(errorResponse(error.toString()));
	}
};

export const updateController = errorHandlerWrapper(updateHandler);
