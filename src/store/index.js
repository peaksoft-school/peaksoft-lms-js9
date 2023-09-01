import { configureStore } from '@reduxjs/toolkit'
import { getStudentsSlice } from './student/studentSlice'
import { signInSlice } from './signIn/signInSlice'

export const store = configureStore({
   reducer: {
      [signInSlice.name]: signInSlice.reducer,
      [getStudentsSlice.name]: getStudentsSlice.reducer,
   },
})
