// src/pages/Register.jsx
import { Link, useNavigate } from "react-router";
import { http } from "../../utils/http";
import { useState } from "react";

export const Register = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();
	const [errorData, setErrorData] = useState<string | null>(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = e.target;
		setErrorData(null);
		setIsSubmitting(true);
		const formData = new FormData(form);
		try {
			await http.post("/auth/register", {
				username: formData.get("username") as string,
				email: formData.get("email") as string,
				password: formData.get("password") as string,
			});
			navigate("/login");
		} catch (error) {
			console.log(error);
			setErrorData("Invalid credentials!");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="p-6 space-y-4 md:space-y-6 sm:p-8 min-w-96">
				<h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
					Create an account
				</h1>
				<form
					method="post"
					className="space-y-4 md:space-y-6"
					onSubmit={handleSubmit}
				>
					{errorData && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
							<span className="block sm:inline">{errorData}</span>
						</div>
					)}
					<div>
						<label
							htmlFor="username"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Username
						</label>
						<input
							type="text"
							name="username"
							id="username"
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="morteza@gmail.com"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="morteza@gmail.com"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="••••••••"
							className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
					</div>
					<button
						type="submit"
						disabled={isSubmitting}
						className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						{isSubmitting ? "Creating Account..." : "Register"}
					</button>
				</form>
				<br />
				<br />
				<div className="text-center text-white">
					Have an account?{" "}
					<Link
						to="/login"
						className="text-blue-600 hover:underline dark:text-blue-400"
					>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};
