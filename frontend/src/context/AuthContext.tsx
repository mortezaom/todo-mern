// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

interface User {
	id: number;
	email: string;
	name: string;
}

interface AuthContextType {
	user: User | null;
	login: (credentials: { email: string; password: string }) => boolean;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	const login = (credentials) => {
		// Simulate API call
		if (
			credentials.email === "test@example.com" &&
			credentials.password === "password"
		) {
			const userData = { id: 1, email: credentials.email, name: "Test User" };
			setUser(userData);
			localStorage.setItem("user", JSON.stringify(userData));
			return true;
		}
		return false;
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
