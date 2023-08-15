/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getAllInstructors, getInstructors } from './instructorThunk'

const initialState = {
   instructors: [],
   getAllIns: [],
   error: '',
   isLoading: false,
}
export const instructorsSlice = createSlice({
   name: 'instructors',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllInstructors.fulfilled, (state, action) => {
            state.getAllIns = action.payload
            state.isLoading = false
         })
         .addCase(getAllInstructors.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getAllInstructors.rejected, (state) => {
            state.isLoading = false
         })
         // ins
         .addCase(getInstructors.fulfilled, (state, action) => {
            state.instructors = action.payload
            state.isLoading = false
         })
         .addCase(getInstructors.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getInstructors.rejected, (state) => {
            state.isLoading = false
         })
   },
})
export const instructorActions = instructorsSlice.actions
