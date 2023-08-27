import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Pagination, Stack, styled } from '@mui/material'
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
         {courseStudents && courseStudents.length > 0 ? (
            <Table data={courseStudents} columns={columnsTableCourses} />
         ) : (
            <NotFound content="Нет студентов" />
         )}
         <StackStyled>
            <Stack spacing={2}>
               <Pagination
                  count={Math.ceil((courseStudents.length * 2) / 10)}
                  color="primary"
                  page={page}
                  onChange={(event, newPage) => {
                     setPage(newPage)
                     dispatch(getStudents({ id: +params.id, page: newPage }))
                  }}
               />
            </Stack>
         </StackStyled>
      </div>
   )
}
const StackStyled = styled('div')`
   position: absolute;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: end;
   margin-top: 2rem;
   bottom: 5%;
   left: 44%;
`
