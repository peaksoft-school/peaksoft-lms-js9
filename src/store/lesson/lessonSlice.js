import { createSlice } from '@reduxjs/toolkit'
import { getLesson } from './lessonThunk'

const initialState = {
   lesson: [],
}

export const LessonSlice = createSlice({
   name: 'lesson',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getLesson.fulfilled, (state, action) => {
         // eslint-disable-next-line no-param-reassign
         state.lesson = action.payload
      })
   },
})
