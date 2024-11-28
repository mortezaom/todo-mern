import { Outlet } from "react-router";

export const RootLayout = () => {
	return (
		<div className="min-h-screen w-full">
			<main className="flex-1">
				<Outlet />
			</main>
		</div>
	);
};
