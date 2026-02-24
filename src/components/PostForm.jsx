import React, { useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select, } from "./index"
import apiService from '../services/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UploadCloud } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { createPost, updatePost } from '../store/postSlice'

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "Public",
      category: post?.category || "Random Thought"
    },
  })

  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.userData)

  const title = watch("title");
  const image = watch("image");

  const transformSlug = useCallback((value) => {
    if (value && typeof value == "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-")
        .slice(0, 36)
    }
    return ""
  }, [])

  useEffect(() => {
    if (image && image[0]) {
      setPreviewImage(URL.createObjectURL(image[0]));
    }
  }, [image]);

  useEffect(() => {
    if (title) {
      setValue("slug", transformSlug(title), { shouldValidate: true });
    }
  }, [title, setValue, transformSlug]);

  const submit = async (data) => {
    setIsSubmitting(true);

    if (!user?.id) {
      console.error("User not ready. Please wait a moment before posting.");
      toast.error("User info not loaded yet.");
      setIsSubmitting(false);
      return;
    }

    const selectedFile = data.image?.[0];


    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum allowed size is 5MB.");
      setIsSubmitting(false);
      return;
    }


    if (data.content && data.content.length > 1640) {
      toast.error(`Post content is too long (${data.content.length} characters). Limit is 1640.`);
      setIsSubmitting(false);
      return;
    }

    if (post) {
      const file = selectedFile ? await apiService.uploadFile(selectedFile) : null;

      if (file) {
        await apiService.deleteFile(post.featuredImage);
      }

      const result = await dispatch(updatePost({ slug: post.slug, postData: {
        ...data,
        featuredImage: file ? file.url : undefined,
      }}));

      if (result.meta.requestStatus === 'fulfilled') {
        toast.success("Post Updated!");
        navigate(`/post/${post.slug}`);
      }
      setIsSubmitting(false);
    } else {
      let featuredImageUrl = undefined;
      if (selectedFile) {
        try {
          const uploadedFile = await apiService.uploadFile(selectedFile);
          console.log('File upload result:', uploadedFile);
          if (uploadedFile && uploadedFile.url) {
            featuredImageUrl = uploadedFile.url;
            console.log('Featured image URL obtained:', featuredImageUrl);
          }
        } catch (uploadError) {
          console.error('File upload failed:', uploadError);
          toast.error('Image upload failed. Please try again.');
          setIsSubmitting(false);
          return;
        }
      }
      
      const result = await dispatch(createPost({
        ...data,
        featuredImage: featuredImageUrl,
      }));
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success("Post Uploaded!");
        navigate(`/post/${result.payload.slug}`);
      } else {
        toast.error("Failed to upload post.");
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-amber-400 rounded-xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {post ? 'Edit Post' : 'Create Post'}
            </h1>
            <p className="text-slate-400 text-sm">
              {post ? 'Update your post details' : 'Share your thoughts with the community'}
            </p>
          </div>
        </div>
        <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-amber-400 rounded-full"></div>
      </div>

      {/* Form Card */}
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
        {/* Decorative top bar */}
        <div className="h-1 bg-gradient-to-r from-cyan-500 via-amber-400 to-purple-500"></div>

        <div className="p-6 lg:p-8">
          <form
            onSubmit={handleSubmit(submit, (err) => console.log('Validation Error', err))}
            className="flex gap-6 lg:gap-10 flex-wrap"
          >
            {/* LEFT SECTION */}
            <div className="lg:w-3/5 w-full space-y-6">
              {/* Title */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative">
                  <label className="block text-slate-300 font-medium text-sm mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your blog title"
                    {...register("title", { required: true })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  />
                </div>
              </div>

              <input type="hidden" {...register("slug", { required: true })} />

              {/* Content */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-amber-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative">
                  <label className="block text-slate-300 font-medium text-sm mb-2">
                    Content
                  </label>
                  <RTE
                    name="content"
                    control={control}
                    defaultValues={getValues("content")}
                    className="bg-slate-800/50 border border-slate-600/50 rounded-xl"
                    labelClass="text-slate-300"
                  />
                </div>
              </div>
            </div>



            {/* RIGHT SECTION */}
            <div className="lg:w-1/3 w-full flex flex-col gap-5">
              {/* Featured Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-xl p-5 border border-slate-700/50">
                  <label className="block text-slate-300 font-medium text-sm mb-3">
                    Featured Image
                  </label>

                  {previewImage || post?.featuredImage ? (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-dashed border-slate-600/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group">
                      <img
                        src={previewImage || post?.featuredImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                      <label className="absolute inset-0 flex items-end justify-center  cursor-pointer">
                        <span className="text-white text-sm  bg-cyan-600/90 px-2 py-1 rounded-sm hover:bg-cyan-700 transition-colors duration-300">Change image</span>
                        <input
                          type="file"
                          accept="image/png, image/jpg, image/jpeg, image/gif"
                          className="hidden"
                          {...register("image")}
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="w-full border-2 border-dashed border-slate-600/50 rounded-xl p-4 text-center cursor-pointer bg-slate-800/30 hover:bg-slate-700/30 hover:border-cyan-500/50 transition-all duration-300">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-amber-400 rounded-full flex items-center justify-center">
                          <UploadCloud className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-slate-400 text-sm">Click to upload</span>
                        <span className="text-slate-500 text-xs">PNG, JPG up to 5MB</span>
                      </div>
                      <input
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        className="hidden"
                        {...register("image")}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Image Preview - Removed */}

              {/* Visibility - Radio Buttons */}
              <div className="relative group">
                <div className="absolute inset-0 b blur opacity-10 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative py-2 ">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="status-public"
                        value="Public"
                        {...register("status", { required: true })}
                        className="w-5 h-5 text-green-500 cursor-pointer accent-green-500"
                      />
                      <label htmlFor="status-public" className="ml-3 text-white text-sm font-medium cursor-pointer">
                        Public
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="status-private"
                        value="Private"
                        {...register("status", { required: true })}
                        className="w-5 h-5 text-amber-500 cursor-pointer accent-amber-500"
                      />
                      <label htmlFor="status-private" className="ml-3 text-white text-sm font-medium cursor-pointer">
                        Private
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative">
                  <Select
                    options={["Learn & Share", "Random Thought", "Academic", "Prominent Places", "Subject Review"]}
                    label="Category"
                    {...register("category", { required: true })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-slate-900 focus:outline-none focus:border-cyan-500/50 transition-all duration-300"
                    labelClass="text-slate-300 font-medium text-sm mb-2 block"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Uploading...
                  </>
                ) : post ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Update Post
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Publish Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostForm
