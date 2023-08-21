import { createSlice } from '@reduxjs/toolkit'
import { getCourseStudents, getInstructor } from './instructorThunk'

const initialState = {
   courses: [],
   courseStudents: [],
   isLoading: false,
}

export const courseInstructorSlice = createSlice({
   name: 'courseIns',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getInstructor.fulfilled, (state, action) => {
            state.courses = action.payload
            state.isLoading = false
         })
         .addCase(getInstructor.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getInstructor.rejected, (state) => {
            state.isLoading = false
         })
         // course
         .addCase(getCourseStudents.fulfilled, (state, action) => {
            state.courseStudents = action.payload
            state.isLoading = false
         })
         .addCase(getCourseStudents.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getCourseStudents.rejected, (state) => {
            state.isLoading = false
         })
   },
})
export const courseInstructorSliceActions = courseInstructorSlice.actions
