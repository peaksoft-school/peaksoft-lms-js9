import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstance } from '../../config/axiosInstance'
import { postFile } from '../group/groupThunk'

export const getInstructors = createAsyncThunk(
   'instructors/getInstructor',
   async (id, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            `/api/courses/getInstructors/${id}`
         )
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const getAllInstructors = createAsyncThunk(
   'instructors/getInstructors',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get('api/instructors')
         return response.data
      } catch (error) {
         return rejectWithValue(error.message)
      }
   }
)
export const assignInstructor = createAsyncThunk(
   'instructors/assignInstructor',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.post(`api/courses/assign/${payload.courseId}`, {
            instructorsId: payload.instructorsId,
         })
         payload.showSnackbar('Учители успешно добавлены в курс!', 'success')
         return dispatch(getInstructors(payload.courseId))
      } catch (error) {
         payload.showSnackbar(error.response.data.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)

export const deleteTeacherCourse = createAsyncThunk(
   'instructors/deleteTeacherCourse',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(
            `api/courses/instructor/${payload.courseId}/${payload.instructorId}`
         )
         payload.showSnackbar('Учитель успешно удален с курса!', 'success')
         return dispatch(getInstructors(payload.courseId))
      } catch (error) {
         payload.showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)

export const deleteAllTeacherCourse = createAsyncThunk(
   'instructors/deleteAllTeacherCourse',
   async (payload, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`api/courses/instructors/${payload.id}`)
         payload.showSnackbar('Учители успешно удалены с курса!', 'success')
         return dispatch(getInstructors(payload.id))
      } catch (error) {
         payload.showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)

export const postNewTask = createAsyncThunk(
   'instructors/postTask',
   async (
      { newTask, lessonId, showSnackbar, navigate },
      { rejectWithValue, dispatch }
   ) => {
      try {
         let getFile = null
         let getDoc = null

         if (newTask.image !== null) {
            getFile = await dispatch(postFile(newTask.image)).unwrap()
         }

         if (newTask.fileLink !== '') {
            getDoc = await dispatch(postFile(newTask.fileLink)).unwrap()
         }

         await axiosInstance.post(`/api/tasks/${lessonId}`, {
            ...newTask,
            image: getFile,
            fileLink: getDoc,
         })
         showSnackbar('Задание успешно создано !', 'success')
         return navigate(-1)
      } catch (error) {
         showSnackbar(error.response.data.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)

export const putNewTask = createAsyncThunk(
   'instructors/putTask',
   async (
      { newTask, taskId, showSnackbar, navigate },
      { rejectWithValue, dispatch }
   ) => {
      try {
         const getFile = await dispatch(postFile(newTask.image))
         const getDoc = await dispatch(postFile(newTask.fileLink))
         await axiosInstance.put(`/api/tasks/${taskId}`, {
            ...newTask,
            image:
               getFile.payload === 'Request failed with status code 403'
                  ? newTask.image
                  : getFile.payload,
            fileLink:
               getDoc.payload === 'Request failed with status code 403'
                  ? newTask.fileLink.fileLink
                  : getDoc.payload,
         })
         showSnackbar('Задание успешно редактировано !', 'success')
         return navigate(-1)
      } catch (error) {
         showSnackbar(error.message, 'error')
         return rejectWithValue(error.message)
      }
   }
)
