import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';


export const getEventsThunk = createAsyncThunk(
  '@@exercise/getEvents',
  async (_, { getState }) => {
    try {
      const { token } = getState().user
      // console.log('Token in getEventsThunk', token)
      const res = await fetch('https://heavy-duty-server.vercel.app/event', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error('Failed to fetch event data');
      }

      const data = await res.json()
      // console.log('getEventsThunk S', data)
      return data
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
)
export const getExercisesThunk = createAsyncThunk(
  '@@exercise/getExercises',
  async (_, { getState }) => {
    try {
      const { token } = getState().user
      // console.log('Token in getEventsThunk', token)
      const res = await fetch('https://heavy-duty-server.vercel.app/exercise', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!res.ok) {
        throw new Error('Failed to fetch exercise data');
      }

      const data = await res.json()
      // console.log('getExercisesThunk', data)
      return data
    } catch (error) {
      console.error('Error fetching exercises data:', error);
      throw error;
    }
  }
)
export const createEventThunk = createAsyncThunk(
  '@@exercise/createEvent',
  async (data, { getState }) => {
    // достаем содержимое упражнения и дату на которую кликнули перед выбором
    const exerciseData = data.exercise;
    const time = data.time;
    const { title, description, ...exercise } = exerciseData;
    // формируем body
    const bodyData = { title, description, start: time, approaches: [] }
    console.log('bodyData', bodyData)
    try {
      const { token } = getState().user
      console.log('Token in getEventsThunk', token)
      const res = await fetch('https://heavy-duty-server.vercel.app/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
      })

      if (!res.ok) {
        throw new Error('Failed to fetch exercise data');
      }

      const data = await res.json()
      // console.log('createExercisesThunk', data)
      return data
    } catch (error) {
      console.error('Error fetching exercises data:', error);
      throw error;
    }
  }
)
export const removeEventThunk = createAsyncThunk(
  '@@exercise/removeEvent',
  async (id, { getState }) => {
    // console.log('EventId', id)
    try {
      const { token } = getState().user
      const res = await fetch(`https://heavy-duty-server.vercel.app/event/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (!res.ok) {
        throw new Error('Failed to fetch exercise data');
      }

      const data = await res.json()
      console.log('removeEventThunk', data)
      // return data
    } catch (error) {
      console.error('Error fetching exercises data:', error);
      throw error;
    }
  }
)
export const addEventSetThunk = createAsyncThunk(
  '@@exercise/addEventSet',
  async (obj, { getState, dispatch }) => {
    const bodyData = { eventId: obj.event._id, newApproach: obj.valuesInput }

    try {
      const { token } = getState().user
      const res = await fetch('https://heavy-duty-server.vercel.app/event/approach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
      })
      // ошибка
      if (!res.ok) {
        throw new Error('Failed to fetch addEventSet data');
      }

      // все ok
      const data = await res.json()
      dispatch(getEventsThunk())
    } catch (error) {
      console.error('Error fetching addEventSetThunk data:', error);
      throw error;
    }
  }
)
export const toggleEventSetThunk = createAsyncThunk(
  '@@exercise/toggleEventSetThunk',
  async (obj, { getState, dispatch }) => {
    const eventId = obj.event._id
    const bodyData = { approachId: obj.approachesId, approach: obj.valuesInput }
    // console.log('toggleEventSetThunk', bodyData);
    try {
      const { token } = getState().user
      const res = await fetch(`https://heavy-duty-server.vercel.app/event/${eventId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
      })
      // ошибка
      if (!res.ok) {
        throw new Error('Failed to fetch addEventSet data');
      }

      // все ok
      const data = await res.json()
      dispatch(getEventsThunk())
    } catch (error) {
      console.error('Error fetching addEventSetThunk data:', error);
      throw error;
    }
  }
)
export const removeEventSetThunk = createAsyncThunk(
  '@@exercise/removeEventSet',
  async (obj, { getState, dispatch }) => {
    // console.log('obj', obj)
    const bodyData = { approachId: obj.approachesId }
    const eventId = obj.event._id
    try {
      const { token } = getState().user
      const res = await fetch(`https://heavy-duty-server.vercel.app/event/set/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
      })
      if (!res.ok) {
        throw new Error('Failed to fetch exercise data');
      }

      dispatch(getEventsThunk())
      const data = await res.json()
      // console.log('removeEventSetThunk', data)
      // return data
    } catch (error) {
      console.error('Error fetching exercises data:', error);
      throw error;
    }
  }
)



const exercisesSlice = createSlice({
  name: '@@exercises',
  initialState: {
    date: '',
    events: [
      // { id: uuidv4(), title: 'Событие 1', start: '2024-04-23T10:00:00' },
    ],
    exercises: [],
    exerciseInfo: { id: uuidv4(), title: 'Упражнение', description: 'Кликни по упражнению, чтобы посмотреть информацию о нем' },
    // инфа о каждом упражнении
    modalAdd: false,
    modalToggle: false,
    approachesId: '',
    categoryExercise: 'all',
    categotyBtn: [
      {
        title: 'все',
        category: 'all'
      },
      {
        title: 'грудь',
        category: 'breast'
      },
      {
        title: 'спина',
        category: 'back'
      },
      {
        title: 'ноги',
        category: 'leg'
      },
      {
        title: 'трицепс',
        category: 'triceps'
      },
      {
        title: 'плечи',
        category: 'shoulders'
      },
      {
        title: 'попка',
        category: 'ass'
      },
    ],
    loading: 'idle',
    error: null
  },
  reducers: {
    setTime: (state, action) => {
      state.date = action.payload;
    },
    ToggleApproaches: (state, action) => {
      // console.log('Action.payload', action.payload)
      const updatedEvents = state.events.map(event => {
        if (event.id === action.payload.event.id) {
          // console.log('нашел approachesId', action.payload.approachesId)
          return {
            ...event,
            approaches: event.approaches.map(app => {
              if (app.id === action.payload.approachesId) {
                return {
                  ...app,
                  ...action.payload.valuesInput,
                }
              }
              return app
            })
          };
        }
        return event;
      });

      return { ...state, events: updatedEvents };
    },
    upDateEventDate: (state, action) => {
      const { eventId, newStartDate } = action.payload;
      console.log("Slice:", eventId, newStartDate.slice(0, 19))
      // Находим событие по его ID
      const eventToUpdate = state.events.find(event => event.id === eventId);
      if (eventToUpdate) {
        // Обновляем дату начала события
        eventToUpdate.start = newStartDate;
      }
    },
    addExerciseInfo: (state, action) => {
      state.exerciseInfo = action.payload
    },
    toglleModalAdd: (state, action) => {
      state.modalAdd = !state.modalAdd
    },
    toglleModalToggle: (state, action) => {
      state.modalToggle = !state.modalToggle
      state.approachesId = action.payload
    },
    toggleCategory: (state, action) => {
      state.categoryExercise = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventsThunk.fulfilled, (state, action) => {
        state.events = action.payload
      })
      .addCase(getExercisesThunk.fulfilled, (state, action) => {
        state.exercises = action.payload
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

export const { setTime, addEvents, ToggleEvent, ToggleApproaches,
  toglleModalAdd, toglleModalToggle, addExerciseInfo, removeEvent,
  upDateEventDate, toggleCategory } = exercisesSlice.actions
export const exercisesReducer = exercisesSlice.reducer

export const selectVisibleExercises = (state, filter, value) => {
  switch (filter) {
    case 'all': {
      return state.exercises.filter(exercise => {
        const title = exercise.title.toLowerCase();
        const search = value.toLowerCase();

        return title.includes(search);
      })
    }
    case 'breast': {
      return state.exercises.filter(item => item.category.some(el => el.includes(filter))).filter(exercise => {
        const title = exercise.title.toLowerCase();
        const search = value.toLowerCase();

        return title.includes(search);
      })
    }
    case 'back': {
      return state.exercises.filter(item => item.category.some(el => el.includes(filter))).filter(exercise => {
        const title = exercise.title.toLowerCase();
        const search = value.toLowerCase();

        return title.includes(search);
      })
    }
    case 'leg': {
      return state.exercises.filter(item => item.category.some(el => el.includes(filter))).filter(exercise => {
        const title = exercise.title.toLowerCase();
        const search = value.toLowerCase();

        return title.includes(search);
      })
    }
    case 'triceps': {
      return state.exercises.filter(item => item.category.some(el => el.includes(filter))).filter(exercise => {
        const title = exercise.title.toLowerCase();
        const search = value.toLowerCase();

        return title.includes(search);
      })
    }
    case 'shoulders': {
      return state.exercises.filter(item => item.category.some(el => el.includes(filter))).filter(exercise => {
        const title = exercise.title.toLowerCase();
        const search = value.toLowerCase();

        return title.includes(search);
      })
    }
    case 'ass': {
      return state.exercises.filter(item => item.category.some(el => el.includes(filter))).filter(exercise => {
        const title = exercise.title.toLowerCase();
        const search = value.toLowerCase();

        return title.includes(search);
      })
    }
    default: { return state.todos }
  }
}