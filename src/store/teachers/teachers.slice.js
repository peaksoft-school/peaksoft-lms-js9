import { createSlice } from '@reduxjs/toolkit'
import { getTeachers } from './teachers.thunk'

const initialState = {
   data: [],
   isLoading: true,
   error: '',
}

export const teachersSlice = createSlice({
   name: 'teachers',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getTeachers.pending, (state) => {
            return {
               ...state,
               isLoading: true,
            }
         })
         .addCase(getTeachers.fulfilled, (state, action) => {
            return {
               ...state,
               data: action.payload,
               isLoading: false,
            }
         })
         .addCase(getTeachers.rejected, (state, action) => {
            return {
               ...state,
               isLoading: false,
               error: action.payload,
            }
         })
   },
})
