import { useTasksStore, type Task } from "../stores/tasks";
import { useToggle } from "../utils/toggle";
import { useMemo, useState } from "react";
import { IconType, SIcon } from "./Icons";
import { DeleteTaskModal, UpdateTaskModal } from "./Modals";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
	task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
	const [checked, toggle, setValue] = useToggle(false);
	const [removing, setRemoving] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);

	const showCompleted = useTasksStore((taske) => taske.showCompleted);
	const updateTask = useTasksStore((taske) => taske.updateTask);

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: task.uuid });

	const handleCheck = () => {
		toggle();
		if (!checked && !showCompleted) {
			setTimeout(() => {
				setRemoving(true);
				setTimeout(() => {
					updateTask(task.uuid, undefined, undefined, !checked);
				}, 500);
			}, 300);
		} else {
			updateTask(task.uuid, undefined, undefined, !checked);
		}
	};

	useMemo(() => {
		if (task.isCompleted) {
			setValue(task.isCompleted);
		}
	}, [task.isCompleted, setValue]);

	return (
		<div
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
			}}
			{...attributes}
			{...listeners}
		>
			<div
				className={`bg-white shadow rounded-lg transition-all duration-300 ${
					removing ? "opacity-0 max-h-0 py-0 my-0" : "max-h-40"
				}`}
			>
				<div className="p-4 flex">
					<div className="inline-flex items-center">
						<label
							className="flex items-center cursor-pointer relative"
							data-nodnd
						>
							<input
								type="checkbox"
								checked={checked}
								data-nodnd
								onChange={handleCheck}
								className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600"
							/>
							<span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-3.5 w-3.5"
									viewBox="0 0 20 20"
									fill="currentColor"
									stroke="currentColor"
									strokeWidth="1"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clipRule="evenodd"
									/>
								</svg>
							</span>
						</label>
					</div>
					<div className="flex items-center flex-1">
						<div className="ml-5 w-0 flex-1 flex flex-col items-start">
							<span
								className={`text-sm font-medium text-gray-500 truncate relative transition-all ${
									checked ? "animated-line-through animate-draw" : ""
								}`}
							>
								{task.title}
							</span>
							<span
								className={`text-lg font-medium text-gray-900 relative transition-all ${
									checked ? "animated-line-through animate-draw" : ""
								}`}
							>
								{task.description}
							</span>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<button
							className="w-7 h-7 flex items-center justify-center bg-red-300 hover:bg-red-400 p-1 rounded-full transition-colors"
							type="button"
							onClick={() => setOpenDeleteModal(true)}
							data-nodnd
						>
							<SIcon type={IconType.DeleteIcon} size={15} />
						</button>
						<button
							className="w-7 h-7 flex items-center justify-center bg-blue-300 hover:bg-blue-400 p-1 rounded-full transition-colors"
							type="button"
							onClick={() => setOpenEditModal(true)}
							data-nodnd
						>
							<SIcon type={IconType.EditIcon} size={15} />
						</button>
					</div>
				</div>
				<DeleteTaskModal
					open={openDeleteModal}
					setOpen={setOpenDeleteModal}
					task={task}
					data-nodnd
				/>

				<UpdateTaskModal
					open={openEditModal}
					setOpen={setOpenEditModal}
					task={task}
					data-nodnd
				/>
			</div>
		</div>
	);
};

export const TaskSkeleton: React.FC = () => {
	return (
		<div className="overflow-hidden shadow rounded-lg animate-pulse">
			<div className="p-4 flex">
				<div className="inline-flex items-center">
					<div className="h-5 w-5 bg-slate-300 rounded-full animate-pulse" />
				</div>
				<div className="flex items-center flex-1">
					<div className="ml-5 w-0 flex-1 flex flex-col items-start">
						<div className="h-4 bg-slate-300 w-1/2 rounded animate-pulse mb-3" />
						<div className="h-4 bg-slate-300 w-3/4 rounded animate-pulse" />
					</div>
				</div>
			</div>
		</div>
	);
};
