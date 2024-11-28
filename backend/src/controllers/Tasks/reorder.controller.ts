import { tasksService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status-codes";
import { errorResponse } from "../../utils/errorResponse";

const reorderHandler = async (req, res) => {
	const { tasks } = req.body;
	try {
		const result = await tasksService.reorderTasks({ tasks });
		return res.status(httpStatus.OK).json({ tasks: result });
	} catch (error) {
		return res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(errorResponse(error.toString()));
	}
};

export const reorderController = errorHandlerWrapper(reorderHandler);
