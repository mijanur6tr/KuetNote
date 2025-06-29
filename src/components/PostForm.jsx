import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select } from "./index"
import { useSelector } from 'react-redux'
import service from '../appWrite/config'
import { useNavigate } from 'react-router-dom'

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  })

  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.userData)

  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? await service.createFile(data.image[0]) : null

      if (file) {
        service.deleteFile(post.featuredImage)
      }

      const updatedPost = await service.updatePost({
        slug: post.$id,
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
    <div className="py-6 px-4 max-w-6xl mx-auto">
      <form
        onSubmit={handleSubmit(submit, (err) => console.log('Validation Error', err))}
        className="flex flex-col md:flex-row flex-wrap gap-6"
      >
        {/* LEFT SECTION */}
        <div className="md:w-2/3 w-full px-2">
          <Input
            type="text"
            label="Title:"
            placeholder="Enter your blog title"
            className="mb-4 w-full max-w-lg"
            {...register("title", {
              required: true,
            })}
            labelClass="text-indigo-700 font-semibold"
          />

          {/* Hidden slug input */}
          <input
            type="hidden"
            {...register("slug", { required: true })}
          />

          <RTE
            label="Content:"
            name="content"
            control={control}
            defaultValues={getValues("content")}
            labelClass="text-indigo-700 font-semibold"
          />
        </div>

        {/* RIGHT SECTION */}
        <div className="md:w-1/3 w-full px-2">
          <Input
            label="Featured Image"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
            labelClass="text-indigo-700 font-semibold"
          />

          {post?.featuredImage && (
            <div className="w-full mb-4 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={service.previewFile(post.featuredImage)}
                alt={post.title}
                className="rounded-md w-full h-auto object-cover"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
            labelClass="text-indigo-700 font-semibold"
          />

          <Button
            type="submit"
            bgColor={post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
            className="w-full text-white font-semibold py-2 rounded-md"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PostForm
