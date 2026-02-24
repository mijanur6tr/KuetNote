import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '../services/api'

// Async thunks for API calls
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await apiService.getComments(postId)
      return { postId, comments: response }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ content, postId }, { rejectWithValue }) => {
    try {
      const response = await apiService.createComment({ content, postId })
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const response = await apiService.updateComment(commentId, { content })
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      await apiService.deleteComment(commentId)
      return commentId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const upvoteComment = createAsyncThunk(
  'comments/upvoteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await apiService.upvoteComment(commentId)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const downvoteComment = createAsyncThunk(
  'comments/downvoteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await apiService.downvoteComment(commentId)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  comments: {}, // { postId: [comments] }
  loading: false,
  error: null,
}

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearComments: (state) => {
      state.comments = {}
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false
        const { postId, comments } = action.payload
        state.comments[postId] = comments
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create Comment
      .addCase(createComment.fulfilled, (state, action) => {
        const comment = action.payload
        if (state.comments[comment.postId]) {
          state.comments[comment.postId].unshift(comment)
        } else {
          state.comments[comment.postId] = [comment]
        }
      })
      // Update Comment
      .addCase(updateComment.fulfilled, (state, action) => {
        const updatedComment = action.payload
        Object.keys(state.comments).forEach(postId => {
          const commentIndex = state.comments[postId].findIndex(c => c._id === updatedComment._id)
          if (commentIndex !== -1) {
            state.comments[postId][commentIndex] = updatedComment
          }
        })
      })
      // Delete Comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        const commentId = action.payload
        Object.keys(state.comments).forEach(postId => {
          state.comments[postId] = state.comments[postId].filter(c => c._id !== commentId)
        })
      })
      // Upvote Comment
      .addCase(upvoteComment.fulfilled, (state, action) => {
        const updatedComment = action.payload
        Object.keys(state.comments).forEach(postId => {
          const commentIndex = state.comments[postId].findIndex(c => c._id === updatedComment._id)
          if (commentIndex !== -1) {
            state.comments[postId][commentIndex] = updatedComment
          }
        })
      })
      // Downvote Comment
      .addCase(downvoteComment.fulfilled, (state, action) => {
        const updatedComment = action.payload
        Object.keys(state.comments).forEach(postId => {
          const commentIndex = state.comments[postId].findIndex(c => c._id === updatedComment._id)
          if (commentIndex !== -1) {
            state.comments[postId][commentIndex] = updatedComment
          }
        })
      })
  },
})

export const { clearError, clearComments } = commentSlice.actions

export default commentSlice.reducer