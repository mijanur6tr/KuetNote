import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select, } from "./index"
import { useSelector } from 'react-redux'
import service from '../appWrite/config'
import { useNavigate } from 'react-router-dom'

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "Public",
    },
  })

  // useEffect(() => {
  //   if (post?.content) {
  //     setValue("content", post.content)
  //   }
  // }, [post, setValue])


  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    if (!user?.$id) {
      console.error("User not ready. Please wait a moment before posting.");
      alert("User info not loaded yet. Please wait a moment and try again.");
      return;
    }

    if (post) {
      const file = data.image[0] ? await service.createFile(data.image[0]) : null

      if (file) {
        service.deleteFile(post.featuredImage)
      }

      const updatedPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      })

      if (updatedPost) navigate(`/post/${updatedPost.$id}`)
    } else {
      const file = await service.createFile(data.image[0])
      if (file) {
        const newPost = await service.createPost({
          ...data,
          userId: user.$id,
          featuredImage: file.$id,
        })
        if (newPost) navigate(`/post/${newPost.$id}`)
      }
    }
  }

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
    <div className="py-10 px-4 bg-gradient-to-br from-[#aecae6e1] via-[#8fb6d8dc] to-[#809ab8] min-h-screen rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-10 text-amber-800">
        Create Your Post. <span className="text-indigo-600">Paint Creativity</span>
      </h2>

      <div className="max-w-6xl mx-auto bg-black/3 rounded-xl shadow-lg p-6 lg:p-16">

        <form
          onSubmit={handleSubmit(submit, (err) => console.log('Validation Error', err))}
          className="flex gap-5 lg:gap-10 flex-wrap"
        >
          {/* LEFT SECTION */}
          <div className="lg:w-3/5 px-2  w-full ">
            <Input
              type="text"
              label="Title:"
              placeholder="Enter your blog title"
              className="mb-6 w-full"
              {...register("title", { required: true })}
              labelClass="block text-base lg:text-lg font-semibold text-slate-700 mb-1 tracking-wide"

            />

            {/* Hidden slug input */}
            <input type="hidden" {...register("slug", { required: true })} />

            <RTE
              label="Content:"
              name="content"
              control={control}
              defaultValues={getValues("content")}
              labelClass="block text-base lg:text-lg font-semibold text-slate-700 mb-1 tracking-wide"

            />
          </div>

          {/* RIGHT SECTION */}
          <div className="lg:w-1/3 w-full px-2 flex flex-col gap-6 ">
            <Input
              label="Featured Image"
              type="file"
              placeholder="Choose Your File"
              className="w-1/2"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
              labelClass="block text-base lg:text-lg font-semibold text-slate-700 mb-1 tracking-wide"
            />

            {post?.featuredImage && (
              <div className="w-full rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                <img
                  src={service.previewFile(post.featuredImage)}
                  alt={post.title}
                  className="rounded-md w-full h-auto object-cover"
                />
              </div>
            )}

            <Select
              options={["Public", "Private"]}
              label="Visibility"
              className="w-1/2 "

              {...register("status", { required: true })}
              labelClass="block text-base lg:text-lg font-semibold text-slate-700 mb-1 tracking-wide"
            />

            <Button
              type="submit"
              bgColor={post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
              className="text-white mx-auto font-semibold py-2 rounded-md w-full sm:w-1/2 px-4 sm:px-0 max-w-xs"
            >
              {post ? "Update Post" : "Publish Post"}
            </Button>

          </div>

        </form>
      </div>
    </div>
  )
}

export default PostForm
