import React, { useEffect } from 'react'
import { styled } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Table from '../../../../components/UI/table/Table'
import { Header } from '../../../../components/UI/header/Header'
import { columnsTableGroup } from '../../../../utils/constants/constants'
import { getGroupUsers } from '../../../../store/students/studentsThunk'
import { Isloading } from '../../../../components/UI/snackbar/Isloading'
import { getCard } from '../../../../store/group/groupThunk'
import { NotFound } from '../../../../components/UI/not-found/NotFound'

export const GroupsTable = () => {
   const params = useParams()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { cards } = useSelector((state) => state.cards)
   const { students, isLoading } = useSelector((state) => state.students)
   const getGroupName = cards.find((item) => item.id === +params.details)

   const navigateGoBackGroups = () => {
      navigate('/admin/home')
   }
   useEffect(() => {
      dispatch(getGroupUsers(params.details))
      dispatch(getCard())
   }, [])

   return (
      <>
         {isLoading && <Isloading />}
         <div>
            <Header titlePage="Администратор" />
         </div>
         <SpanStyled>
            <button type="button" onClick={navigateGoBackGroups}>
               Группы
            </button>
            \ {getGroupName?.groupName}
         </SpanStyled>
         {students && students.length > 0 ? (
            <Table data={students} columns={columnsTableGroup} />
         ) : (
            <NotFound content="Нет студентов" />
         )}
      </>
   )
}

const SpanStyled = styled('p')`
   font-size: 0.875rem;
   margin-top: 2.75rem;
   margin-bottom: 1.5rem;
   display: flex;
   gap: 0.3125rem;
   align-items: center;
   button {
      cursor: pointer;
      border: none;
      font-size: 0.875rem;
      color: #747d74;
   }
`
