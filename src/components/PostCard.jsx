import React from 'react'
import service from '../appWrite/config'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns';


const PostCard = ({ $id, title, featuredImage, $createdAt , userName }) => {

  const timeAgo = formatDistanceToNow(new Date($createdAt), { addSuffix: true });

  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="w-full bg-cyan-800 rounded-bl-2xl rounded-tr-2xl  lg:rounded-bl-3xl lg:rounded-tr-3xl shadow-md overflow-hidden transition-transform hover:scale-103 hover:shadow-lg duration-300">

      {/* User name and time */}
      <div className="px-3 pt-3 pb-1">
        <h2 className="text-lg lg:text-xl font-medium text-white leading-tight mb-0">{userName}</h2>
        <span className="text-sm tracking-tighter text-gray-300">{timeAgo}</span>
      </div>


        {/* Post Title */}
        <div className="px-3">
          <h2 className="text-md font-normal text-white">{title}</h2>
        </div>

        {/* Featured Image */}
        <div className="w-full h-48 overflow-hidden bg-gray-200 mt-2">
          <img
            src={service.previewFile(featuredImage)}
            alt={title}
            className="w-full h-full object-cover "
          />
        </div>
      </div>
    </Link>
  )
}

export default PostCard
