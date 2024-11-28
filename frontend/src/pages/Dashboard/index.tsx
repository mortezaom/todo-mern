// src/pages/Dashboard.jsx
import { useNavigate } from "react-router";
import { useTasksStore } from "../../stores/tasks";
import { useEffect, useState } from "react";
import { NewTaskModal } from "../../components/Modals";
import { TaskCard, TaskSkeleton } from "../../components/TaskCard";
import { IconType, SIcon } from "../../components/Icons";
import { Switch } from "../../components/Switch";
import { SortableContext } from "@dnd-kit/sortable";
import { DndContext, useSensor, useSensors } from "@dnd-kit/core";
import { MouseSensor, TouchSensor } from "../../utils/dnd-helper";
import { useShallow } from "zustand/shallow";

export const Dashboard = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	const showCompleted = useTasksStore((state) => state.showCompleted);
	const toggleCompleted = useTasksStore((state) => state.toggleShowCompleted);
	const tasks = useTasksStore(
		useShallow((state) =>
			state.tasks.filter((task) => showCompleted || !task.isCompleted),
		),
	);
	const fetchData = useTasksStore((state) => state.fetchTasks);
	const loading = useTasksStore((state) => state.loading);
	const handleReorder = useTasksStore((state) => state.handleReorder);

	const [addModalOpen, setAddModalOpen] = useState(false);

	const dndSensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

	const loadMore = useTasksStore((state) => state.loadMore);
	const hasMore = useTasksStore((state) => state.hasMore);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<div className="mx-auto py-6 sm:px-6 lg:px-8 max-w-[680px]">
			<div className="px-4 py-6 sm:px-0">
				<h1 className="text-2xl font-semibold flex gap-4 justify-between">
					<span>Tasks Dashboard</span>
					<button
						className="w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 p-2 rounded-full transition-colors"
						type="button"
						onClick={handleLogout}
					>
						<SIcon type={IconType.SignoutIcon} size={18} />
					</button>
				</h1>
				<br />
				<div className="flex items-center gap-2 justify-between">
					<button
						className="w-10 h-10 flex gap-2 items-center justify-center bg-blue-500 hover:bg-blue-600 p-2 rounded-lg transition-colors"
						type="button"
						onClick={() => setAddModalOpen(true)}
					>
						<SIcon type={IconType.AddIcon} size={24} />
					</button>
					<Switch value={showCompleted} onChange={toggleCompleted}>
						Show Completed
					</Switch>
				</div>

				<DndContext onDragEnd={handleReorder} sensors={dndSensors}>
					<div className="mt-6 flex gap-5 flex-col">
						<SortableContext items={tasks.map((task) => task.uuid)}>
							{tasks.map((task) => (
								<TaskCard key={task.uuid} task={task} />
							))}
						</SortableContext>
					</div>
				</DndContext>
				<div className="mt-5">
					{loading && <TaskSkeleton />}
					{(!loading && hasMore) && (
						<button
							className="w-full h-12 flex items-center justify-center text-blue-500 p-2 rounded-lg"
							type="button"
							onClick={loadMore}
						>
							Load More
						</button>
					)}
				</div>
			</div>

			<NewTaskModal open={addModalOpen} setOpen={setAddModalOpen} />
		</div>
	);
};
