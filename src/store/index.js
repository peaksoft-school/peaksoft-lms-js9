import { configureStore } from '@reduxjs/toolkit'
import { signInSlice } from './signIn/signInSlice'
import { teachersSlice } from './teachers/teachers.slice'

export const store = configureStore({
   reducer: {
      [signInSlice.name]: signInSlice.reducer,
      [teachersSlice.name]: teachersSlice.reducer,
   },
})
