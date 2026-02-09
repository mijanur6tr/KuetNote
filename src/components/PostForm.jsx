import React, { useCallback, useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select, } from "./index"
import service from '../appWrite/config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authService from '../appWrite/auth'
import { UploadCloud } from 'lucide-react'
import { ContextStore } from '../context/contextStore'

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "Public",
      category: post?.category || "Random Thought"
    },
  })

  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate()
  const {user}= useContext(ContextStore)

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "image" && value.image && value.image[0]) {
        const file = value.image[0];
        setPreviewImage(URL.createObjectURL(file));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);



  const submit = async (data) => {
    if (!user?.$id) {
      console.error("User not ready. Please wait a moment before posting.");
      toast.error("User info not loaded yet.");
      return;
    }

    const selectedFile = data.image?.[0];


    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Maximum allowed size is 5MB.");
      return;
    }


    if (data.content && data.content.length > 1640) {
      toast.error(`Post content is too long (${data.content.length} characters). Limit is 1640.`);
      return;
    }

    if (post) {
      const file = selectedFile ? await service.createFile(selectedFile) : null;

      if (file) {
        await service.deleteFile(post.featuredImage);
      }

      const updatedPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (updatedPost) {
        toast.success("Post Updated!");
        navigate(`/post/${updatedPost.$id}`);
      }
    } else {
      const file = await service.createFile(selectedFile);
      if (file) {
        const newPost = await service.createPost({
          ...data,
          userId: user.$id,
          userName : user.name,
          featuredImage: file.$id,
        });
        if (newPost) {
          toast.success("Post Uploaded!");
          navigate(`/post/${newPost.$id}`);
        } else {
          await service.deleteFile(file.$id);
          toast.error("Failed to upload post.");
        }
      }
    }
  };



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
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", transformSlug(value.title), { shouldValidate: true })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, transformSlug, setValue])

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

                  <label className="w-full border-2 border-dashed border-slate-600/50 rounded-xl p-4 text-center cursor-pointer bg-slate-800/30 hover:bg-slate-700/30 hover:border-cyan-500/50 transition-all duration-300">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-amber-400 rounded-full flex items-center justify-center">
                        <UploadCloud className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-slate-400 text-sm">
                        {previewImage || post?.featuredImage ? 'Click to change' : 'Click to upload'}
                      </span>
                      <span className="text-slate-500 text-xs">PNG, JPG up to 5MB</span>
                    </div>
                    <input
                      type="file"
                      accept="image/png, image/jpg, image/jpeg, image/gif"
                      className="hidden"
                      {...register("image", { required: !post })}
                    />
                  </label>
                </div>
              </div>

              {/* Image Preview */}
              {(previewImage || post?.featuredImage) && (
                <div className="relative rounded-xl overflow-hidden border border-slate-700/50 shadow-lg">
                  <img
                    src={previewImage || service.previewFile(post.featuredImage)}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                </div>
              )}

              {/* Visibility */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative">
                  <Select
                    options={["Public", "Private"]}
                    label="Visibility"
                    {...register("status", { required: true })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all duration-300"
                    labelClass="text-slate-300 font-medium text-sm mb-2 block"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative">
                  <Select
                    options={["Learn & Share", "Random Thought", "Academic", "Prominent Places", "Subject Review"]}
                    label="Category"
                    {...register("category", { required: true })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all duration-300"
                    labelClass="text-slate-300 font-medium text-sm mb-2 block"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 mt-4"
              >
                {post ? (
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
