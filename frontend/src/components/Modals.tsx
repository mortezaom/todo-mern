import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";

import { useEffect, useState } from "react";
import { type Task, useTasksStore } from "../stores/tasks";
import { IconType, SIcon } from "./Icons";
import toast from "react-hot-toast";

interface CustomModalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	onSave?: () => void;
}

export const NewTaskModal = ({ open, setOpen }: CustomModalProps) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const [loading, setLoading] = useState(false);

	const addNewTask = useTasksStore((state) => state.addNewTask);

	const handleSave = async () => {
		setLoading(true);
		if (title && description) {
			const result = await addNewTask(title, description);
			setLoading(false);
			if (result) {
				setOpen(false);
			} else {
				toast.error("Failed to add new task");
			}
		}
	};

	useEffect(() => {
		if (open) {
			setTitle("");
			setDescription("");
		}
	}, [open]);

	return (
		<Dialog open={open} onClose={setOpen} className="relative z-10">
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-black/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
					>
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div className="flex items-start">
								<div className="text-green-600 mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
									<SIcon type={IconType.TaskIcon} size={24} />
								</div>
								<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
									<DialogTitle
										as="h3"
										className="text-base font-semibold text-gray-900"
									>
										Add new Task
									</DialogTitle>
									<div className="mt-2 flex flex-col">
										<div className="flex flex-col mt-2">
											<label
												htmlFor="title"
												className="mb-2 text-sm font-medium text-gray-900"
											>
												Title
											</label>
											<input
												type="text"
												name="title"
												className="sm:text-sm rounded-lg w-full p-2.5 border border-gray-300 text-gray-900"
												required
												value={title}
												onChange={(e) => setTitle(e.target.value)}
											/>
										</div>
										<div className="flex flex-col mt-2">
											<label
												htmlFor="description"
												className="mb-2 text-sm font-medium text-gray-900"
											>
												Description
											</label>
											<textarea
												name="description"
												className="max-h-32 min-h-20 sm:text-sm rounded-lg w-full p-2.5 border border-gray-300 text-gray-900"
												required
												value={description}
												onChange={(e) => setDescription(e.target.value)}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							<button
								type="button"
								onClick={() => handleSave()}
								disabled={loading}
								className="inline-flex w-full justify-center rounded-md bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto transition-colors"
							>
								{loading ? "..." : "Save"}
							</button>
							<button
								type="button"
								data-autofocus
								onClick={() => setOpen(false)}
								className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
							>
								Cancel
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export const DeleteTaskModal = ({
	open,
	setOpen,
	task,
}: CustomModalProps & { task: Task }) => {
	const [loading, setLoading] = useState(false);

	const deleteATast = useTasksStore((state) => state.deleteATast);

	const handleSave = async () => {
		setLoading(true);
		const result = await deleteATast(task.uuid);
		setLoading(false);
		if (result) {
			setOpen(false);
		} else {
			toast.error("Failed to add new task");
		}
	};

	return (
		<Dialog data-nodnd open={open} onClose={setOpen} className="relative z-10">
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-black/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
					>
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div className="flex items-start">
								<div className="text-red-600 mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
									<SIcon type={IconType.DeleteIcon} size={24} />
								</div>
								<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
									<DialogTitle
										as="h3"
										className="text-base font-semibold text-gray-900"
									>
										Remove the Task
									</DialogTitle>
									<div className="mt-2 flex flex-col text-gray-900">
										<p>Are you sure you want to remove this task?</p>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							<button
								type="button"
								onClick={() => handleSave()}
								disabled={loading}
								className="inline-flex w-full justify-center rounded-md bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto transition-colors"
							>
								{loading ? "..." : "Yes"}
							</button>
							<button
								type="button"
								data-autofocus
								onClick={() => setOpen(false)}
								className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
							>
								Cancel
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export const UpdateTaskModal = ({
	open,
	setOpen,
	task,
}: CustomModalProps & { task: Task }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const [loading, setLoading] = useState(false);

	const updateTask = useTasksStore((state) => state.updateTask);

	const handleSave = async () => {
		setLoading(true);
		if (title && description) {
			const result = await updateTask(task.uuid, title, description);
			setLoading(false);
			if (result) {
				setOpen(false);
			} else {
				toast.error("Failed to add new task");
			}
		}
	};

	useEffect(() => {
		if (open) {
			setTitle(task.title);
			setDescription(task.description ?? "");
		}
	}, [open, task]);

	return (
		<Dialog data-nodnd open={open} onClose={setOpen} className="relative z-10">
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-black/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
					>
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div className="flex items-start">
								<div className="text-green-600 mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
									<SIcon type={IconType.TaskIcon} size={24} />
								</div>
								<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
									<DialogTitle
										as="h3"
										className="text-base font-semibold text-gray-900"
									>
										Update Task
									</DialogTitle>
									<div className="mt-2 flex flex-col">
										<div className="flex flex-col mt-2">
											<label
												htmlFor="title"
												className="mb-2 text-sm font-medium text-gray-900"
											>
												Title
											</label>
											<input
												type="text"
												name="title"
												className="sm:text-sm rounded-lg w-full p-2.5 border border-gray-300 text-gray-900"
												required
												value={title}
												onChange={(e) => setTitle(e.target.value)}
											/>
										</div>
										<div className="flex flex-col mt-2">
											<label
												htmlFor="description"
												className="mb-2 text-sm font-medium text-gray-900"
											>
												Description
											</label>
											<textarea
												name="description"
												className="max-h-32 min-h-20 sm:text-sm rounded-lg w-full p-2.5 border border-gray-300 text-gray-900"
												required
												value={description}
												onChange={(e) => setDescription(e.target.value)}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							<button
								type="button"
								onClick={() => handleSave()}
								disabled={loading}
								className="inline-flex w-full justify-center rounded-md bg-green-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto transition-colors"
							>
								{loading ? "..." : "Save"}
							</button>
							<button
								type="button"
								data-autofocus
								onClick={() => setOpen(false)}
								className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
							>
								Cancel
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};
