import { createSlice } from '@reduxjs/toolkit'
import {
   getByIdInstructor,
   getCardsCourses,
   getCoursesById,
} from './coursesThunk'

const initialState = {
   cards: [],
   courses: [],
   coursesGroup: {},
   error: '',
   isLoading: false,
}
export const coursesSlice = createSlice({
   name: 'courses',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getCardsCourses.fulfilled, (state, action) => {
            state.cards = action.payload
            state.isLoading = false
         })
         .addCase(getCardsCourses.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getCardsCourses.rejected, (state) => {
            state.isLoading = false
         })
         // ins get by id
         .addCase(getByIdInstructor.fulfilled, (state, action) => {
            state.courses = action.payload
            state.isLoading = false
         })
         .addCase(getByIdInstructor.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getByIdInstructor.rejected, (state) => {
            state.isLoading = false
         })
         .addCase(getCoursesById.fulfilled, (state, action) => {
            state.coursesGroup = action.payload
         })
   },
})
export const coursesActions = coursesSlice.actions
