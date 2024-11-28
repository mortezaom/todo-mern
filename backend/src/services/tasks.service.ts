import { AppDataSouce } from "../db";
import { TaskEntity } from "../entities/task.entity";

export const createTask = async (data) => {
	const taskRepository = AppDataSouce.getRepository(TaskEntity);
	const task = taskRepository.create(data);
	await taskRepository.save(task);
	return task;
};

export const getOneTask = async (data) => {
	const { id } = data;
	const taskRepository = AppDataSouce.getRepository(TaskEntity);
	const task = await taskRepository.findOne(id);
	return task;
};

export const getAllTasks = async (page, limit) => {
	const taskRepository = AppDataSouce.getRepository(TaskEntity);
	const tasks = await taskRepository.find({
		skip: (page - 1) * limit,
		take: limit,
		order: {
			order: "desc",
		},
	});
	return tasks;
};

export const updateTask = async (data) => {
	const { id, title, description, isCompleted } = data;
	const taskRepository = AppDataSouce.getRepository(TaskEntity);
	const task = await taskRepository.findOneBy({ uuid: id });
	if (title) task.title = title;
	if (description) task.description = description;
	if (isCompleted !== undefined) task.isCompleted = isCompleted;
	await taskRepository.save(task);
	return task;
};

export const deleteTask = async (data) => {
	const { id } = data;
	const taskRepository = AppDataSouce.getRepository(TaskEntity);
	const task = await taskRepository.findOneBy({ uuid: id });
	await taskRepository.remove(task);
	return task;
};

export const reorderTasks = async (data) => {
	const { tasks } = data;
	const taskRepository = AppDataSouce.getRepository(TaskEntity);
	await taskRepository.save(tasks);
	return tasks;
};

export const getLastOrder = async (userId: string) => {
	try {
		const taskRepository = AppDataSouce.getRepository(TaskEntity);
		const maxOrder = await taskRepository
			.createQueryBuilder("tasks")
			.where("tasks.user_id = :userId", { userId })
			.select("MAX(tasks.order)", "max")
			.getRawOne();
		return maxOrder.max || 0;
	} catch (error) {
		console.log(error);
		return 0;
	}
};
