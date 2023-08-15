import { configureStore } from '@reduxjs/toolkit'
import { groupSlice } from './group/groupSlice'
import { studentsSlice } from './students/studentsSlice'
import { coursesSlice } from './courses/coursesSlice'
import { instructorsSlice } from './instructor/instructorSlice'

export const store = configureStore({
   reducer: {
      [groupSlice.name]: groupSlice.reducer,
      [studentsSlice.name]: studentsSlice.reducer,
      [coursesSlice.name]: coursesSlice.reducer,
      [instructorsSlice.name]: instructorsSlice.reducer,
   },
})
