import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Pagination, styled } from '@mui/material'
import Table from '../../../../components/UI/table/Table'
import { columnsTableCourses } from '../../../../utils/constants/constants'
import { getStudents } from '../../../../store/students/studentsThunk'
import { Isloading } from '../../../../components/UI/snackbar/Isloading'
import { NotFound } from '../../../../components/UI/not-found/NotFound'

export const TableStudents = () => {
   const dispatch = useDispatch()
   const params = useParams()
   const [page, setPage] = useState(1)
   const { courseStudents, isLoading } = useSelector((state) => state.students)

   useEffect(() => {
      dispatch(getStudents({ id: +params.id, page }))
   }, [])

   return (
      <div>
         {isLoading && <Isloading />}
         {courseStudents.studentResponses &&
         courseStudents.studentResponses?.length > 0 ? (
            <Table
               data={courseStudents.studentResponses}
               columns={columnsTableCourses}
            />
         ) : (
            <NotFound content="Нет студентов" />
         )}
         <StackStyled>
            <Pagination
               count={Math.ceil(courseStudents.quantityOfStudents / 10)}
               color="primary"
               page={page}
               onChange={(event, newPage) => {
                  setPage(newPage)
                  dispatch(getStudents({ id: +params.id, page: newPage }))
               }}
            />
         </StackStyled>
      </div>
   )
}
const StackStyled = styled('div')`
   position: absolute;
   bottom: 1%;
   left: 50%;
`
