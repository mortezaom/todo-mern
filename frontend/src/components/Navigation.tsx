// src/components/Navigation.jsx
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export const Navigation = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		auth?.logout();
		navigate("/login");
	};

	return (
		<nav className="bg-white shadow-md p-4">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<div className="flex items-center space-x-4">
					<Link to="/" className="text-xl font-bold text-gray-800">
						YourApp
					</Link>
					{auth?.user && (
						<Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
							Dashboard
						</Link>
					)}
				</div>

				<div>
					{auth?.user ? (
						<div className="flex items-center space-x-4">
							<span className="text-gray-600">{auth?.user.email}</span>
							<button
								onClick={handleLogout}
								className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
								type="button"
							>
								Logout
							</button>
						</div>
					) : (
						<Link
							to="/login"
							className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
						>
							Login
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};
