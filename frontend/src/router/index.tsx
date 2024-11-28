// src/router/index.jsx
import { createBrowserRouter, redirect } from "react-router";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { RootLayout } from "../layouts/RootLayout";
import { checkAuth } from "../utils/auth";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				loader: () => redirect("/dashboard"),
			},
			{
				path: "login",
				element: <Login />,
				loader: () => {
					if (checkAuth()) {
						return redirect("/dashboard");
					}
					return null;
				},
			},
			{
				path: "register",
				element: <Register />,
				loader: () => {
					if (checkAuth()) {
						return redirect("/dashboard");
					}
					return null;
				},
			},
			{
				path: "dashboard",
				element: <Dashboard />,
				loader: async () => {
					if (!checkAuth()) {
						return redirect("/login");
					}
					// You can fetch dashboard data here
					return { dashboardData: "example data" };
				},
			},
		],
	},
]);
