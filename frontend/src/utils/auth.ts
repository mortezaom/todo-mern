// src/utils/auth.js
export const checkAuth = () => {
	const user = localStorage.getItem("token");
	return !!user;
};

export const getUser = () => {
	const user = localStorage.getItem("user");
	return user ? JSON.parse(user) : null;
};
