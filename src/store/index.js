import { configureStore } from '@reduxjs/toolkit'
import { groupSlice } from './group/groupSlice'
import { studentsSlice } from './students/studentsSlice'
import { coursesSlice } from './courses/coursesSlice'
import { instructorsSlice } from './instructor/instructorSlice'
import { signInSlice } from './signIn/signInSlice'
import { lessonSlice } from './lesson/lessonSlice'

export const store = configureStore({
   reducer: {
      [studentsSlice.name]: studentsSlice.reducer,
      [signInSlice.name]: signInSlice.reducer,
      [groupSlice.name]: groupSlice.reducer,
      [instructorsSlice.name]: instructorsSlice.reducer,
      [lessonSlice.name]: lessonSlice.reducer,
      [coursesSlice.name]: coursesSlice.reducer,
   },
})
