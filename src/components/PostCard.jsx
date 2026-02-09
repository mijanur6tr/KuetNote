// PostCard.jsx
import React from 'react'
import service from '../appWrite/config'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import parse from 'html-react-parser'

const PostCard = ({ $id, title, featuredImage, $createdAt, userName, category, content }) => {
  const timeAgo = formatDistanceToNow(new Date($createdAt), { addSuffix: true })
  
  // Extract plain text from HTML content (first 150 characters)
  const getExcerpt = (htmlContent) => {
    if (!htmlContent) return ''
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlContent
    const text = tempDiv.textContent || tempDiv.innerText || ''
    return text.length > 150 ? text.substring(0, 150) + '...' : text
  }

  const excerpt = getExcerpt(content)

  // Category color mapping - consistent with theme
  const getCategoryColor = (cat) => {
    const colors = {
      Technology: 'from-cyan-500 to-blue-500',
      Lifestyle: 'from-pink-500 to-rose-500',
      Business: 'from-green-500 to-emerald-500',
      Education: 'from-purple-500 to-indigo-500',
      default: 'from-amber-500 to-orange-500'
    }
    return colors[cat] || colors.default
  }

  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="w-full bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-slate-700/50 hover:border-cyan-500/30">

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
              src={service.previewFile(featuredImage)}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
          <span className="text-xs text-slate-400 font-medium">Read more</span>
          <svg className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
