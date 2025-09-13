import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import { createPost, updatePost, getFilePreview } from "../../api/blog";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        content: post.content || "",
        status: post.status ? "active" : "inactive",
      });
    }
  }, [post, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("status", data.status === "active");

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      setErrorMessage("");
      setIsSubmitting(true);
      
      if (post) {
        await updatePost(post._id, formData);
        navigate(`/post/${post._id}`);
      } else {
        await createPost(formData);
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      setErrorMessage(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            {post ? "Edit Post" : "Create New Post"}
          </h1>
          <p className="text-gray-600 text-lg">
            {post ? "Make changes to your post" : "Share your thoughts with the world"}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            {/* Error Message */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg shadow-sm">
                <p className="text-red-700 text-sm font-medium">{errorMessage}</p>
              </div>
            )}

            {/* Form Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Main Content Section */}
              <div className="xl:col-span-2 space-y-6">
                {/* Title Input */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your post title"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 placeholder-gray-400"
                      {...register("title", { required: "Title is required" })}
                    />
                  </div>
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-2 animate-pulse">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Content RTE */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <div className="bg-gray-50 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200">
                    <RTE
                      label=""
                      name="content"
                      control={control}
                      defaultValue={getValues("content")}
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="xl:col-span-1 space-y-6">
                {/* Image Upload */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Featured Image</h3>
                  
                  {/* Current Image Preview */}
                  {post?.imagePublicId && (
                    <div className="mb-4">
                      <img
                        src={getFilePreview(post.imagePublicId)}
                        alt="Current featured image"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                      />
                      <p className="text-sm text-gray-600 mt-2">Current image</p>
                    </div>
                  )}

                  {/* File Input */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {post ? "Change Image" : "Upload Image"} 
                      {!post && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        {...register("image", {
                          validate: (value) =>
                            post || (value && value.length > 0) || "Image is required",
                        })}
                      />
                    </div>
                    {errors.image && (
                      <p className="text-red-500 text-xs mt-2 animate-pulse">
                        {errors.image.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Selection */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Publishing Options</h3>
                  
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      {...register("status", { required: true })}
                    >
                      <option value="active">Active (Published)</option>
                      <option value="inactive">Inactive (Draft)</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                      post 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {post ? "Updating..." : "Creating..."}
                      </div>
                    ) : (
                      post ? "Update Post" : "Create Post"
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}