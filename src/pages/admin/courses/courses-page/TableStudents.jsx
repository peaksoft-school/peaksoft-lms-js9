import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Table from '../../../../components/UI/table/Table'
import { columnsTableCourses } from '../../../../utils/constants/constants'
import { getCourseStudents } from '../../../../store/students/studentsThunk'
import { Isloading } from '../../../../components/UI/snackbar/Isloading'

export const TableStudents = () => {
   const dispatch = useDispatch()
   const params = useParams()
   const { courseStudents, isLoading } = useSelector((state) => state.students)

   useEffect(() => {
      dispatch(getCourseStudents(params.id))
   }, [])

   return (
      <div>
         {isLoading && <Isloading />}
         {courseStudents && courseStudents.length > 0 ? (
            <Table data={courseStudents} columns={columnsTableCourses} />
         ) : (
            <h1>Пока что нет студентов!</h1>
         )}
      </div>
   )
}
