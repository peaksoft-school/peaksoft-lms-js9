/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getCourseStudents, getGroupUsers } from './studentsThunk'

const initialState = {
   students: [],
   courseStudents: [],
   error: '',
   isLoading: false,
}
export const studentsSlice = createSlice({
   name: 'students',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getGroupUsers.fulfilled, (state, action) => {
         state.students = action.payload
         state.isLoading = false
      })
      builder.addCase(getGroupUsers.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getGroupUsers.rejected, (state) => {
         state.isLoading = false
      })
      // courses students
      builder.addCase(getCourseStudents.fulfilled, (state, action) => {
         state.courseStudents = action.payload
         state.isLoading = false
      })
      builder.addCase(getCourseStudents.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getCourseStudents.rejected, (state) => {
         state.isLoading = false
      })
   },
})
export const studentsActions = studentsSlice.actions
