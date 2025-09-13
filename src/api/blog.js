import {api} from "./index.js"

export const createPost = (data) => api.post("/api/v1/blog/create-post", data);
export const updatePost = (postId, data) => api.patch(`/api/v1/blog/${postId}`, data);
export const getPostById = (postId) => api.get(`/api/v1/blog/fetch/${postId}`);
export const deletePost = (postId) => api.delete(`/api/v1/blog/${postId}`);
export const getAllPosts = () => api.get("/api/v1/blog/posts/all-active");
export const inactivePosts = () => api.get("/api/v1/blog/posts/inactive");
export const activePosts = () => api.get("/api/v1/blog/posts/active");
export const getFilePreview = (fileId) => api.get(`/api/v1/blog/preview/${fileId}`);
