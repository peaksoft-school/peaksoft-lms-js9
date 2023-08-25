import { configureStore } from '@reduxjs/toolkit'
import { groupSlice } from './group/groupSlice'
import { studentsSlice } from './students/studentsSlice'
import { coursesSlice } from './courses/coursesSlice'
import { instructorsSlice } from './instructor/instructorSlice'
import { signInSlice } from './signIn/signInSlice'
import { lessonSlice } from './lesson/lessonSlice'

export const store = configureStore({
   reducer: {
      [signInSlice.name]: signInSlice.reducer,
      [groupSlice.name]: groupSlice.reducer,
      [studentsSlice.name]: studentsSlice.reducer,
      [instructorsSlice.name]: instructorsSlice.reducer,
      [coursesSlice.name]: coursesSlice.reducer,
      [lessonSlice.name]: lessonSlice.reducer,
   },
})
