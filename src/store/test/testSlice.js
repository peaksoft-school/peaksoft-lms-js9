import { createSlice } from '@reduxjs/toolkit'
import {
   getTestResultForInstructor,
   getTestResultPass,
   postIsAcceptedThunk,
} from './testThunk'

const initialState = {
   testResult: [],
   passTest: {},
   isLoading: false,
}

export const testSlice = createSlice({
   name: 'test',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getTestResultForInstructor.fulfilled, (state, action) => {
         state.testResult = action.payload
         state.isLoading = false
      })
      builder.addCase(getTestResultForInstructor.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getTestResultForInstructor.rejected, (state) => {
         state.isLoading = false
      })
      builder.addCase(getTestResultPass.fulfilled, (state, action) => {
         state.passTest = action.payload
         state.isLoading = false
      })
      builder.addCase(getTestResultPass.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getTestResultPass.rejected, (state) => {
         state.isLoading = false
      })
      builder.addCase(postIsAcceptedThunk.fulfilled, (state) => {
         state.isLoading = false
      })
      builder.addCase(postIsAcceptedThunk.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(postIsAcceptedThunk.rejected, (state) => {
         state.isLoading = false
      })
   },
})
