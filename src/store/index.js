import { configureStore } from '@reduxjs/toolkit'
import { signInSlice } from './signIn/signInSlice'
import { courseInstructorSlice } from './instruc/instrutorSlice'

export const store = configureStore({
   reducer: {
      [signInSlice.name]: signInSlice.reducer,
      [courseInstructorSlice.name]: courseInstructorSlice.reducer,
   },
})
