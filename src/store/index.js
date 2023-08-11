import { configureStore } from '@reduxjs/toolkit'
import { signInSlice } from './signIn/signInSlice'

export const store = configureStore({
   reducer: {
      [signInSlice.name]: signInSlice.reducer,
   },
})
