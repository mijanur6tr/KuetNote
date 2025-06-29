import React from 'react'
import service from '../appWrite/config'
import { Link } from 'react-router-dom'

const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="w-full bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg duration-300">
        
        {/* Image wrapper with fixed height */}
        <div className="w-full h-48 overflow-hidden bg-gray-200">
          <img
            src={service.previewFile(featuredImage)}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Text content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
