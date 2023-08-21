import { configureStore } from '@reduxjs/toolkit'
import { signInSlice } from './signIn/signInSlice'
import { LessonSlice } from './lesson/lessonSlice'

export const store = configureStore({
   reducer: {
      [signInSlice.name]: signInSlice.reducer,
      [LessonSlice.name]: LessonSlice.reducer,
   },
})
