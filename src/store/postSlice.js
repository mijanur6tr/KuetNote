import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '../services/api'

// Async thunks for API calls
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getPosts()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchMyPosts = createAsyncThunk(
  'posts/fetchMyPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getMyPosts()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await apiService.createPost(postData)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ slug, postData }, { rejectWithValue }) => {
    try {
      const response = await apiService.updatePost(slug, postData)
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (slug, { rejectWithValue }) => {
    try {
      await apiService.deletePost(slug)
      return slug
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const upvotePost = createAsyncThunk(
  'posts/upvotePost',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await apiService.upvotePost(slug)
      return { slug, post: response }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const downvotePost = createAsyncThunk(
  'posts/downvotePost',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await apiService.downvotePost(slug)
      return { slug, post: response }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  posts: [],
  myPosts: [],
  loading: true,
  error: null,
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false
        state.posts = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch My Posts
      .addCase(fetchMyPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        state.loading = false
        state.myPosts = action.payload
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create Post
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload)
        state.myPosts.unshift(action.payload)
      })
      // Update Post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.slug === action.payload.slug)
        if (index !== -1) {
          state.posts[index] = action.payload
        }
        const myIndex = state.myPosts.findIndex(post => post.slug === action.payload.slug)
        if (myIndex !== -1) {
          state.myPosts[myIndex] = action.payload
        }
      })
      // Delete Post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.slug !== action.payload)
        state.myPosts = state.myPosts.filter(post => post.slug !== action.payload)
      })
      // Upvote Post
      .addCase(upvotePost.fulfilled, (state, action) => {
        const { slug, post } = action.payload
        const index = state.posts.findIndex(p => p.slug === slug)
        if (index !== -1) {
          state.posts[index] = post
        }
        const myIndex = state.myPosts.findIndex(p => p.slug === slug)
        if (myIndex !== -1) {
          state.myPosts[myIndex] = post
        }
      })
      // Downvote Post
      .addCase(downvotePost.fulfilled, (state, action) => {
        const { slug, post } = action.payload
        const index = state.posts.findIndex(p => p.slug === slug)
        if (index !== -1) {
          state.posts[index] = post
        }
        const myIndex = state.myPosts.findIndex(p => p.slug === slug)
        if (myIndex !== -1) {
          state.myPosts[myIndex] = post
        }
      })
  },
})

export const { clearError, setLoading } = postSlice.actions

export default postSlice.reducer