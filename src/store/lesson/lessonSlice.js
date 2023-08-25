import { createSlice } from '@reduxjs/toolkit'
import { getLesson } from './lessonThunk'

const initialState = {
   isLoading: false,
   lesson: [],
}
export const lessonSlice = createSlice({
   name: 'lesson',
   reducers: {},
   initialState,
   extraReducers: (builder) => {
      builder
         .addCase(getLesson.fulfilled, (state, action) => {
            state.isLoading = false
            state.lesson = action.payload
         })
         .addCase(getLesson.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getLesson.rejected, (state) => {
            state.isLoading = false
         })
   },
})
