// PostCard.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import { MessageCircle } from 'lucide-react'
import parse from 'html-react-parser'
import apiService from '../services/api'
import { useSelector, useDispatch } from 'react-redux'
import { upvotePost, downvotePost } from '../store/postSlice'

const PostCard = ({ _id, title, featuredImage, createdAt, userName, category, content, slug, upvotes = [], downvotes = [], commentCount = 0 }) => {
  const dispatch = useDispatch()
  const { userData: user } = useSelector((state) => state.auth)
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true })
  const userVote = upvotes.includes(user?.id) ? 'up' : downvotes.includes(user?.id) ? 'down' : null
  
  // Extract plain text from HTML content (first 150 characters)
  const getExcerpt = (htmlContent) => {
    if (!htmlContent) return ''
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent
    const text = tempDiv.textContent || tempDiv.innerText || ''
    return text.length > 150 ? text.substring(0, 150) + '...' : text
  }

  // Map categories to gradient colors
  const getCategoryColor = (cat) => {
    const categoryColors = {
      'Learn & Share': 'from-blue-500 to-cyan-400',
      'Random Thought': 'from-purple-500 to-pink-400',
      'Academic': 'from-green-500 to-emerald-400',
      'Prominent Places': 'from-orange-500 to-red-400',
      'Subject Review': 'from-indigo-500 to-purple-400',
    }
    return categoryColors[cat] || 'from-gray-500 to-slate-400'
  }

  const excerpt = getExcerpt(content)

  const handleUpvote = async () => {
    dispatch(upvotePost(slug))
  }

  const handleDownvote = async () => {
    dispatch(downvotePost(slug))
  }

  return (
    <Link to={`/post/${slug}`} className="block group">
      <div className="w-full bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 rounded-2xl shadow-xl overflow-hidden transition-all duration-300  border border-slate-700/50 hover:border-cyan-500/30">

        {/* Header Section */}
        <div className="px-5 pt-5 pb-3 flex items-start justify-between">
          <div className='flex-1'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-10 h-10 bg-gradient-to-br from-cyan-500 to-amber-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg'>
                {userName?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-semibold text-white leading-tight">
                  {userName}
                </h3>
                <span className="text-xs text-slate-400">{timeAgo}</span>
              </div>
            </div>
          </div>
          
          {/* Category Badge */}
          {category && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(category)} shadow-md`}>
              {category}
            </span>
          )}
        </div>

        {/* Title */}
        <div className="px-5 pb-3">
          <h2 className="text-xl font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
            {title}
          </h2>
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <div className="w-full h-56 overflow-hidden bg-slate-900 relative">
            <img
              src={featuredImage}
              alt={title}
              className="w-full h-full object-cover "
            />
            <div className='absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent'></div>
          </div>
        )}

        {/* Excerpt */}
        {excerpt && (
          <div className="px-5 py-4 border-t border-slate-700/50">
            <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
              {excerpt}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-900/50 border-t border-slate-700/30 flex items-center justify-between">
          <div className="flex items-center gap-4">

            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.preventDefault(); handleUpvote(); }}
                className={`p-1 rounded ${userVote === 'up' ? 'text-green-400' : 'text-slate-400 hover:text-green-400'}`}
              >
                ▲
              </button>
              <span className="text-slate-400 text-sm">{upvotes.length}</span>
            </div>


            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.preventDefault(); handleDownvote(); }}
                className={`p-1 rounded ${userVote === 'down' ? 'text-red-400' : 'text-slate-400 hover:text-red-400'}`}
              >
                ▼
              </button>
              <span className="text-slate-400 text-sm">{downvotes.length}</span>
            </div>

            <div className="flex items-center gap-1">

              <span className="text-slate-400 text-sm flex justify-center items-center gap-1"> 
              <MessageCircle className='h-4 w-4' />
              {commentCount}</span>
            </div>

          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Read more</span>
            <svg className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
