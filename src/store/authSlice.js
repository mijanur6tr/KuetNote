import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import apiService from '../services/api'

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await apiService.logIn({ email, password })
      localStorage.setItem('token', response.token)
      return response.user
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const response = await apiService.signUp({ email, password, name })
      localStorage.setItem('token', response.token)
      return response.user
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await apiService.logOut()
      localStorage.removeItem('token')
      return null
    } catch (error) {
      localStorage.removeItem('token')
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  status:false,
  userData:null,
  loading: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
        state.status = true;
        state.userData = action.payload;
        state.error = null;
    },
    logOut: (state) => {
        state.status = false;
        state.userData = null;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = true;
        state.userData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = false;
        state.userData = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = true;
        state.userData = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = false;
        state.userData = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = false;
        state.userData = null;
        state.loading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = false;
        state.userData = null;
        state.loading = false;
        state.error = action.payload;
      })
  }
})


export const { logIn , logOut } = authSlice.actions

export default authSlice.reducer