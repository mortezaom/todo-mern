class Http {
	baseURL: string;
	constructor(baseURL) {
		this.baseURL = baseURL;
	}

	async request(
		endpoint: string,
		options: {
			headers?: Record<string, string>;
			method?: string;
			body?: string;
		} = {},
	) {
		const url = `${this.baseURL}${endpoint}`;
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			...options.headers,
		};

		const token = localStorage.getItem("token");
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}

		try {
			const response = await fetch(url, {
				...options,
				headers,
			});

			if (response.status === 401) {
				const pathName = window.location.pathname;
				if (pathName === "/login" || pathName === "/register") {
					return;
				}
				localStorage.removeItem("token");
				window.location.href = "/login";
				return;
			}

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Request failed");
			}

			return data;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(error.message || "Network error");
			}
			throw new Error("Network error");
		}
	}

	get(endpoint, query?, options = {}) {
		const queryString = new URLSearchParams(query).toString();
		return this.request(`${endpoint}?${queryString}`, {
			...options,
			method: "GET",
		});
	}

	post(endpoint, body, options = {}) {
		return this.request(endpoint, {
			...options,
			method: "POST",
			body: JSON.stringify(body),
		});
	}

	put(endpoint, body, options = {}) {
		return this.request(endpoint, {
			...options,
			method: "PUT",
			body: JSON.stringify(body),
		});
	}

	patch(endpoint, body, options = {}) {
		return this.request(endpoint, {
			...options,
			method: "PATCH",
			body: JSON.stringify(body),
		});
	}

	delete(endpoint, options = {}) {
		return this.request(endpoint, {
			...options,
			method: "DELETE",
		});
	}
}

// export const http = new Http(import.meta.env.VITE_API_URL);
export const http = new Http("http://localhost:8000/api/v1");
