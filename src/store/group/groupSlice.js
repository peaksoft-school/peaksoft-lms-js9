/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { getCard } from './groupThunk'

const initialState = {
   cards: [],
   error: '',
   isLoading: false,
}
export const groupSlice = createSlice({
   name: 'cards',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getCard.fulfilled, (state, action) => {
         state.cards = action.payload
         state.isLoading = false
      })
      builder.addCase(getCard.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getCard.rejected, (state) => {
         state.isLoading = false
      })
   },
})
export const groupActions = groupSlice.actions
