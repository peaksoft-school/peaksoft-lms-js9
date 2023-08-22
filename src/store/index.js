import { configureStore } from '@reduxjs/toolkit'
import { signInSlice } from './signIn/signInSlice'
import { LessonSlice } from './lesson/lessonSlice'

export const store = configureStore({
   reducer: {
      [LessonSlice.name]: LessonSlice.reducer,
      [signInSlice.name]: signInSlice.reducer,
   },
})
