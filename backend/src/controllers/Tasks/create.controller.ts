import { tasksService } from '../../services';
import { errorHandlerWrapper } from '../../utils';
import { errorResponse } from '../../utils/errorResponse';
import httpStatus from 'http-status-codes';

const ORDER_GAP = 1000;

const createHandler = async (req, res) => {
  const { title, description } = req.body;
  try {
    const lastOrder = await tasksService.getLastOrder(req.user.uuid);
	const task = await tasksService.createTask({
      title,
      description,
      user: req.user,
      order: lastOrder + ORDER_GAP,
    });
    return res.status(httpStatus.CREATED).json(task);
  } catch (error) {
    return res.staus(httpStatus.INTERNAL_SERVER_ERROR).json(errorResponse(error.toString()));
  }
};

export const createController = errorHandlerWrapper(createHandler);
