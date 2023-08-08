import axios from 'axios'
import { BASE_URL } from '../utils/constants/constants'
// import { store } from '../store'

export const fileAxiosInstanse = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'multipart/form-data',
   },
})

fileAxiosInstanse.interceptors.request.use(
   (config) => {
      const configUpdate = { ...config }
      //   const { token } = store.getState().auth
      const token =
         'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTE3NTEzMjYsImlhdCI6MTY5MTQ5MjEyNiwidXNlcm5hbWUiOiJhZG1pbkBnbWFpbC5jb20ifQ.6DOC3QceNEwLaRZTCrA49ADPDHvjvquA0aWUTXNOACA'
      if (token) {
         configUpdate.headers.Authorization = `Bearer ${token}`
      }

      return configUpdate
   },
   (error) => {
      return Promise.reject(error)
   }
)

fileAxiosInstanse.interceptors.response.use(
   (response) => {
      return Promise.resolve(response)
   },
   (error) => {
      if (error.response?.status === 401) {
         //  store.dispatch(postFiles())
         throw new Error('401 unauthotized')
      }
      return Promise.reject(error)
   }
)
