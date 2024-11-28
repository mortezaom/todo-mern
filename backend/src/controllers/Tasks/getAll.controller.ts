import { tasksService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status-codes";
import { errorResponse } from "../../utils/errorResponse";

const getAllHandler = async (req, res) => {
	const page = req.query.page ?? 1;
	const limit = req.query.limit ?? 5;
	await new Promise((resolve) => setTimeout(resolve, 1000));
	try {
		const tasks = await tasksService.getAllTasks(page, limit);
		return res
			.status(httpStatus.OK)
			.json({ tasks, page, hasMore: tasks.length === limit });
	} catch (error) {
		return res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.json(errorResponse(error.toString()));
	}
};

export const getAllController = errorHandlerWrapper(getAllHandler);
