/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getCardsCourses } from './coursesThunk'

const initialState = {
   cards: [],
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
   },
})
export const coursesActions = coursesSlice.actions
