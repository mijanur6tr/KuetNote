import React, { useState } from 'react';
import { Button } from './index';
import { useSelector, useDispatch } from 'react-redux';
import { updateComment, deleteComment, upvoteComment, downvoteComment } from '../store/commentSlice';
import { formatDistanceToNow } from 'date-fns';

const CommentCard = ({ comment }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleUpvote = () => {
    dispatch(upvoteComment(comment._id));
  };

  const handleDownvote = () => {
    dispatch(downvoteComment(comment._id));
  };

  const handleEdit = async () => {
    if (editContent.trim()) {
      const result = await dispatch(updateComment({ commentId: comment._id, content: editContent }));
      if (result.meta.requestStatus === 'fulfilled') {
        setIsEditing(false);
      }
    }
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteComment(comment._id));
    if (result.meta.requestStatus !== 'fulfilled') {
      console.error('Error deleting comment');
    }
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-amber-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {comment.userName?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 justify-between">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">{comment.userName}</span>
              <span className="text-slate-400 text-sm">
                {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
              </span>
            </div>
            
            {user && comment.userId === user.id && !isEditing && (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1 hover:bg-slate-700 rounded transition-colors duration-200"
                >
                  <svg className="w-4 h-4 text-slate-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-0.9 2-2s-0.9-2-2-2-2 0.9-2 2 0.9 2 2 2zm0 2c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2zm0 6c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2z" />
                  </svg>
                </button>
                
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200 text-sm first:rounded-t-lg flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete();
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-900/30 transition-colors duration-200 text-sm last:rounded-b-lg flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-white resize-none"
                rows={3}
              />
              <div className="flex gap-2">
                <Button onClick={handleEdit} className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm">
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white text-sm">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-slate-300 mb-3">{comment.content}</p>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                onClick={handleUpvote}
                className={`p-1 rounded ${comment.upvotes?.includes(user?.id) ? 'text-green-400' : 'text-slate-400 hover:text-green-400'}`}
              >
                ▲
              </button>
              <span className="text-slate-400 text-sm">{comment.upvotes?.length || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleDownvote}
                className={`p-1 rounded ${comment.downvotes?.includes(user?.id) ? 'text-red-400' : 'text-slate-400 hover:text-red-400'}`}
              >
                ▼
              </button>
              <span className="text-slate-400 text-sm">{comment.downvotes?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;