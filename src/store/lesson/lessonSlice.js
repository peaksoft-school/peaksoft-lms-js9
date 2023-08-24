import { createSlice } from '@reduxjs/toolkit'
import { getLesson } from './lessonThunk'

const initialState = {
   lesson: [],
   isLoading: false,
}

export const lessonSlice = createSlice({
   name: 'lesson',
   initialState,
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
