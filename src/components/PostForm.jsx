import React, { useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, RTE, Select, } from "./index"
// import { useSelector } from 'react-redux'
import service from '../appWrite/config'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authService from '../appWrite/auth'
import { UploadCloud } from 'lucide-react'

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

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "image" && value.image && value.image[0]) {
        const file = value.image[0];
        setPreviewImage(URL.createObjectURL(file));
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);


  // useEffect(() => {
  //   if (post?.content) {
  //     setValue("content", post.content)
  //   }
  // }, [post, setValue])


  const navigate = useNavigate()
  // const user = useSelector((state) => state.auth.userData)


  const submit = async (data) => {
    const user = await authService.getCurrentUser()
    if (!user?.$id) {
      console.error("User not ready. Please wait a moment before posting.");
      toast.error("User info not loaded yet.");
      return;
    }

    const selectedFile = data.image?.[0];


    if (selectedFile && selectedFile.size > 3 * 1024 * 1024) {
      toast.error("File is too large. Maximum allowed size is 3MB.");
      return;
    }


    if (data.content && data.content.length > 1500) {
      toast.error(`Post content is too long (${data.content.length} characters). Limit is 1500.`);
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
    <div className="py-10 px-4 bg-gradient-to-br from-[#aecae6e1] via-[#8fb6d8dc] to-[#809ab8] min-h-screen rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-10 text-amber-800">
        Create Your Post. <span className="text-indigo-600">Paint Creativity</span>
      </h2>

      <div className="max-w-6xl mx-auto bg-black/4 rounded-xl shadow-lg p-6 lg:p-16">

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
            <div className="flex flex-col gap-2">
              <label className="block text-base lg:text-lg font-semibold text-slate-700 mb-1 tracking-wide">
                Featured Image
              </label>

              <label className="w-full border-2 border-solid border-gray-400 rounded-lg p-3 text-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition">
                <div className="flex flex-col items-center justify-center gap-2">
                  <UploadCloud className="w-6 h-6 text-blue-600" />
                  <span className="text-gray-700 text-sm">
                    {previewImage || post?.featuredImage ? 'Click to change image' : 'Click to upload'}
                  </span>

                </div>
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  className="hidden"
                  {...register("image", { required: !post })}
                />
              </label>
            </div>

            {(previewImage || post?.featuredImage) && (
              <div className="w-full rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                <img
                  src={previewImage || service.previewFile(post.featuredImage)}
                  alt="Preview"
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
            <Select
              options={["Prominent Places", "Random Thought", "Academic", "Subject Review"]}
              label="Categoy"
              className="w-1/2 "

              {...register("category", { required: true })}
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
