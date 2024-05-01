import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { v4 as uuidv4 } from 'uuid';

export const regidterThunk = createAsyncThunk(
  '@@user/register',
  async (formContent, { dispatch }) => {
    try {
      const res = await fetch('http://localhost:4444/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formContent)
      })

      if (!res.ok) {
        throw new Error('Ошибка регистрации');
      }
      const data = await res.json()
      console.log('Data for thunk', data)
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
export const loginThunk = createAsyncThunk(
  '@@user/login',
  async (formContent, { dispatch }) => {
    try {
      const res = await fetch('http://localhost:4444/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formContent)
      })

      if (!res.ok) {
        throw new Error('Ошибка регистрации');
      }

      const data = await res.json()
      console.log('Data for thunk', data)
      return data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)
export const getMeThunk = createAsyncThunk(
  '@@user/getMe',
  async (_, { getState }) => {
    try {
      const { token } = getState().user
      console.log('Token', token)
      const res = await fetch('http://localhost:4444/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await res.json()
      // console.log('GetMeThunk', data)
      return data
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
)


const userSlice = createSlice({
  name: '@@user',
  initialState: {
    user: {},
    token: '',
    test: 'test',
    loading: 'idle',
    error: null
  },
  reducers: {
    resetToken: (state, action) => {
      state.user = {};
      state.token = '';
    },
    resetTest: (state, action) => {
      state.test = 'TEST';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.token
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = 'idle';
        state.error = 'Error'; // action.error.message
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state, action) => {
        state.loading = 'idle';
      })
  }
})

export const { resetToken, resetTest } = userSlice.actions
export const userReducer = userSlice.reducer

