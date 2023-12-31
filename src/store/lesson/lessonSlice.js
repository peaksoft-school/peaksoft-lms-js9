import { createSlice } from '@reduxjs/toolkit'
import { getLesson } from './lessonThunk'

const initialState = {
   isLoading: false,
   lesson: [],
}
export const lessonSlice = createSlice({
   initialState,
   name: 'lesson',
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getLesson.fulfilled, (state, action) => {
            state.lesson = action.payload
            state.isLoading = false
         })
         .addCase(getLesson.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getLesson.rejected, (state) => {
            state.isLoading = false
         })
   },
})
