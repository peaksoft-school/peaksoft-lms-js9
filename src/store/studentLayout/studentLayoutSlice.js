import { createSlice } from '@reduxjs/toolkit'
import {
   getCardsStudentLayout,
   getGetByIdTaskLesson,
   getGetResultTaskLesson,
   getLinkLesson,
   getPresentationLesson,
   getTaskLesson,
   getTestLesson,
   getTestNameLesson,
   getTestResultLesson,
   getVideoLesson,
   postTaskLesson,
} from './studentLayoutThunk'

const initialState = {
   cards: [],
   video: [],
   tasks: [],
   taskResult: {},
   taskById: {},
   taskAnswer: {},
   links: [],
   tests: [],
   testsName: [],
   testResult: [],
   presentation: [],
   error: '',
   isLoading: false,
}
export const studentLayoutSlice = createSlice({
   name: 'studentLayout',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getCardsStudentLayout.fulfilled, (state, action) => {
         state.cards = action.payload
         state.isLoading = false
      })
      builder.addCase(getCardsStudentLayout.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getCardsStudentLayout.rejected, (state) => {
         state.isLoading = false
      })
      // video
      builder.addCase(getVideoLesson.fulfilled, (state, action) => {
         state.video = action.payload
         state.isLoading = false
      })
      builder.addCase(getVideoLesson.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getVideoLesson.rejected, (state) => {
         state.isLoading = false
      })
      // task
      builder.addCase(getTaskLesson.fulfilled, (state, action) => {
         state.tasks = action.payload
         state.isLoading = false
      })
      builder.addCase(getTaskLesson.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getTaskLesson.rejected, (state) => {
         state.isLoading = false
      })
      // taskanswer
      builder.addCase(postTaskLesson.fulfilled, (state, action) => {
         state.taskAnswer = action.payload
         state.isLoading = false
      })
      builder.addCase(postTaskLesson.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(postTaskLesson.rejected, (state) => {
         state.isLoading = false
      })
      // getByIdTask
      builder.addCase(getGetByIdTaskLesson.fulfilled, (state, action) => {
         state.taskById = action.payload
         state.isLoading = false
      })
      builder.addCase(getGetByIdTaskLesson.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getGetByIdTaskLesson.rejected, (state) => {
         state.isLoading = false
      })
      // test result
      builder.addCase(getGetResultTaskLesson.fulfilled, (state, action) => {
         state.taskResult = action.payload
         state.isLoading = false
      })
      builder.addCase(getGetResultTaskLesson.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getGetResultTaskLesson.rejected, (state) => {
         state.isLoading = false
      })
      // link
      builder.addCase(getLinkLesson.fulfilled, (state, action) => {
         state.links = action.payload
         state.isLoading = false
      })
      builder.addCase(getLinkLesson.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getLinkLesson.rejected, (state) => {
         state.isLoading = false
      })
      // test
      builder.addCase(getTestLesson.fulfilled, (state, action) => {
         state.tests = action.payload
         state.isLoading = false
      })
      builder.addCase(getTestLesson.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getTestLesson.rejected, (state) => {
         state.isLoading = false
      })
      // testName
      builder.addCase(getTestNameLesson.fulfilled, (state, action) => {
         state.testsName = action.payload
         state.isLoading = false
      })
      builder.addCase(getTestNameLesson.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getTestNameLesson.rejected, (state) => {
         state.isLoading = false
      })
      // test result
      builder.addCase(getTestResultLesson.fulfilled, (state, action) => {
         state.testResult = action.payload
         state.isLoading = false
      })
      builder.addCase(getTestResultLesson.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getTestResultLesson.rejected, (state) => {
         state.isLoading = false
      })
      // presentation
      builder.addCase(getPresentationLesson.fulfilled, (state, action) => {
         state.presentation = action.payload
         state.isLoading = false
      })
      builder.addCase(getPresentationLesson.pending, (state) => {
         state.isLoading = true
      })
      builder.addCase(getPresentationLesson.rejected, (state) => {
         state.isLoading = false
      })
   },
})
export const studentLayoutActions = studentLayoutSlice.actions
