import { createSlice } from '@reduxjs/toolkit'
import { getAllStudents } from './studentThunk'

const initialState = {
   students: [],
   isLoading: false,
}

export const getStudentsSlice = createSlice({
   name: 'students',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getAllStudents.fulfilled, (state, action) => {
         state.students = action.payload
         state.isLoading = false
      })
      builder.addCase(getAllStudents.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getAllStudents.rejected, (state) => {
         state.isLoading = false
      })
   },
})
