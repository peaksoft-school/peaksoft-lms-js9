import { configureStore } from '@reduxjs/toolkit'
import { LessonSlice } from './lesson/lessonSlice'

export const store = configureStore({
   reducer: {
      [LessonSlice.name]: LessonSlice.reducer,
   },
})
