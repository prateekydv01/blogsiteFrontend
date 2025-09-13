import { api } from "./index.js"

export const createUser = (data)=>api.post("/api/v1/user/create",data)
export const loginUser = (data)=>api.post("/api/v1/user/login",data)
export const logoutUser = ()=>api.post("/api/v1/user/logout")
export const getCurrentUser = ()=>api.get("/api/v1/user/current-user")
export const updateAcessToken = ()=>api.post("/api/v1/user/update-acess-token")

//update access token after auto expire
api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // Check for 401 (unauthorized) and retry only once
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/api/v1/user/update-acess-token")
        const newAccessToken = res.data.data.accessToken;
        // Add token to header (if you use Authorization Bearer flow)
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest); // Retry the original request
      } catch (refreshError) {
        // Handle refresh error (e.g., logout user)
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);