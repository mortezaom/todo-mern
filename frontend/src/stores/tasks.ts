import { create } from "zustand";
import { http } from "../utils/http";
import type { DragEndEvent } from "@dnd-kit/core";

export interface Task {
	uuid: string;
	title: string;
	description: string | null;
	isCompleted: boolean;
	user: string;
	order: number;
}

export interface TasksState {
	tasks: Task[];
	error: string | null;
	loading: boolean;
	showCompleted: boolean;
	currentPage: number;
	hasMore: boolean;
	setTasks: (tasks: Task[]) => void;
	fetchTasks: () => Promise<void>;
	addNewTask: (title: string, description: string) => Promise<boolean>;
	deleteATast: (id: string) => Promise<boolean>;
	handleReorder: (e: DragEndEvent) => void;
	updateTask: (
		id: string,
		title?: string,
		description?: string,
		isCompleted?: boolean,
	) => Promise<boolean>;
	toggleShowCompleted: () => void;
	loadMore: () => void;
}

export const useTasksStore = create<TasksState>((set, get) => ({
	tasks: [] as Task[],
	error: null as string | null,
	loading: false,
	showCompleted: false,
	currentPage: 1,
	hasMore: true,
	setTasks: (tasks: Task[]) => set({ tasks }),
	fetchTasks: async () => {
		try {
			set({ loading: true });
			set({ error: null });
			const response = await http.get("/tasks");
			set({
				tasks: response.tasks,
				currentPage: response.page,
				hasMore: response.hasMore,
			});
		} catch (error) {
			set({ error: "Failed to fetch tasks!" });
		} finally {
			set({ loading: false });
		}
	},
	addNewTask: async (title, description) => {
		try {
			set({ loading: true });
			set({ error: null });
			const response = await http.post("/tasks", { title, description });
			set((state) => ({ tasks: [response, ...state.tasks] }));
			return true;
		} catch (error) {
			set({ error: "Failed to add new task!" });
			return false;
		} finally {
			set({ loading: false });
		}
	},
	deleteATast: async (id) => {
		try {
			await http.delete(`/tasks/${id}`);
			set((state) => ({
				tasks: state.tasks.filter((task) => task.uuid !== id),
			}));
			return true;
		} catch (error) {
			return false;
		}
	},
	handleReorder: (e) => {
		const { active, over } = e;
		if (!active || !over || active.id === over.id) return;
		const cTasks = [...get().tasks];
		const activeItem = cTasks.find((task) => task.uuid === active.id);
		const overIndex = cTasks.findIndex((task) => task.uuid === over.id);
		const orders = cTasks.map((task) => task.order);
		if (!activeItem || overIndex === -1) return set({ tasks: cTasks });
		const newTasks = cTasks.filter((task) => task.uuid !== active.id);
		newTasks.splice(overIndex, 0, activeItem);
		newTasks.forEach((task, index) => {
			task.order = orders[index];
		});
		http.put("/tasks/reorder", {
			tasks: newTasks.map((task) => ({
				uuid: task.uuid,
				order: task.order,
			})),
		});
		set({ tasks: newTasks });
	},
	updateTask: async (id, title, description, isCompleted) => {
		try {
			const data = {} as Task;
			if (title) data.title = title;
			if (description) data.description = description;
			if (isCompleted !== undefined) data.isCompleted = isCompleted;
			const response = await http.put(`/tasks/${id}`, data);
			set((state) => ({
				tasks: state.tasks.map((task) => (task.uuid === id ? response : task)),
			}));
			return true;
		} catch (error) {
			return false;
		}
	},
	toggleShowCompleted: () =>
		set((state) => ({ showCompleted: !state.showCompleted })),
	loadMore: async () => {
		try {
			if (get().loading || !get().hasMore) return;
			set({ loading: true });
			const response = await http.get("/tasks", {
				page: get().currentPage + 1,
			});
			set((state) => ({
				tasks: [...state.tasks, ...response.tasks],
				currentPage: response.page,
				hasMore: response.hasMore,
			}));
		} catch (error) {
			set({ error: "Failed to fetch tasks!" });
		} finally {
			set({ loading: false });
		}
	},
}));
