import { configureStore } from '@reduxjs/toolkit'
import { groupSlice } from './group/groupSlice'
import { studentsSlice } from './students/studentsSlice'
import { coursesSlice } from './courses/coursesSlice'
import { instructorsSlice } from './instructor/instructorSlice'
import { signInSlice } from './signIn/signInSlice'
import { teachersSlice } from './teachers/teachers.slice'

export const store = configureStore({
   reducer: {
      [signInSlice.name]: signInSlice.reducer,
<<<<<<< HEAD
      [groupSlice.name]: groupSlice.reducer,
      [studentsSlice.name]: studentsSlice.reducer,
      [coursesSlice.name]: coursesSlice.reducer,
      [instructorsSlice.name]: instructorsSlice.reducer,
=======
      [teachersSlice.name]: teachersSlice.reducer,
>>>>>>> 69f05a2 (save feature/adminTeacher)
   },
})
