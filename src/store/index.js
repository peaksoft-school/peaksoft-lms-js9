import { configureStore } from '@reduxjs/toolkit'
import { getStudentsSlice } from './student/studentSlice'
import { groupSlice } from './group/groupSlice'
import { studentsSlice } from './students/studentsSlice'
import { coursesSlice } from './courses/coursesSlice'
import { instructorsSlice } from './instructor/instructorSlice'
import { signInSlice } from './signIn/signInSlice'
import { teachersSlice } from './teachers/teachers.slice'
import { lessonSlice } from './lesson/lessonSlice'

export const store = configureStore({
   reducer: {
      [studentsSlice.name]: studentsSlice.reducer,
      [signInSlice.name]: signInSlice.reducer,
      [getStudentsSlice.name]: getStudentsSlice.reducer,
      [groupSlice.name]: groupSlice.reducer,
      [instructorsSlice.name]: instructorsSlice.reducer,
      [teachersSlice.name]: teachersSlice.reducer,
      [lessonSlice.name]: lessonSlice.reducer,
      [coursesSlice.name]: coursesSlice.reducer,
   },
})
