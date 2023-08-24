import { configureStore } from '@reduxjs/toolkit'
import { groupSlice } from './group/groupSlice'
import { studentsSlice } from './students/studentsSlice'
import { coursesSlice } from './courses/coursesSlice'
import { instructorsSlice } from './instructor/instructorSlice'
import { signInSlice } from './signIn/signInSlice'
import { LessonSlice } from './lesson/lessonSlice'

export const store = configureStore({
   reducer: {
      [signInSlice.name]: signInSlice.reducer,
      [LessonSlice.name]: LessonSlice.reducer,
      [groupSlice.name]: groupSlice.reducer,
      [studentsSlice.name]: studentsSlice.reducer,
      [coursesSlice.name]: coursesSlice.reducer,
      [instructorsSlice.name]: instructorsSlice.reducer,
   },
})
