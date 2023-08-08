import axios from 'axios'
import { BASE_URL } from '../utils/constants/constants'

const logoutAction = () => {}
const headers = {
   'Content-Type': 'application/json',
}

const axiosInstance = axios.create({
   baseURL: BASE_URL,
   headers,
})

let store
export const injectStore = (_store) => {
   store = _store
}

axiosInstance.interceptors.request.use((config) => {
   const updatedConfig = { ...config }
   // const { token } = store.getState().auth
   const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTE3NTEzMjYsImlhdCI6MTY5MTQ5MjEyNiwidXNlcm5hbWUiOiJhZG1pbkBnbWFpbC5jb20ifQ.6DOC3QceNEwLaRZTCrA49ADPDHvjvquA0aWUTXNOACA'
   if (token) {
      updatedConfig.headers.Authorization = `Bearer ${token}`
   }
   return updatedConfig
})

axiosInstance.interceptors.response.use(
   (response) => {
      return response
   },
   (error) => {
      if (error.response.status === 401) {
         store.dispatch(logoutAction())
      }
      return Promise.reject(error)
   }
)

export { axiosInstance }
