import { axiosInstance } from '../../config/axiosInstance'

export const postTeacherLMS = (teacherData) => {
   return axiosInstance.post('/api/instructors', teacherData)
}

export const getTeacherLMS = () => {
   return axiosInstance.get('/api/instructors')
}
export const editTeacherLMS = (id, data) => {
   return axiosInstance.put(`/api/instructors/${id}`, data)
}

export const deleteTeacherLMS = (id) => {
   return axiosInstance.delete(`/api/instructors/${id}`)
}
