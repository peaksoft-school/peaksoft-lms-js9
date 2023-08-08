import { configureStore } from '@reduxjs/toolkit'
import { AdminSlice } from './group/AdminSlice'

export const store = configureStore({
   reducer: {
      [AdminSlice.name]: AdminSlice.reducer,
   },
})
