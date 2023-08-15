import React from 'react'
import { styled } from '@mui/material'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Header } from '../../../../components/UI/header/Header'

export const CoursesTable = () => {
   const params = useParams()
   const location = useLocation()
   console.log(location)
   const navigate = useNavigate()
   const { cards } = useSelector((state) => state.courses)
   const getGroupName = cards.find((item) => item.id === +params.id)

   const navigateGoBackGroups = () => {
      navigate('/admin/courses')
   }

   return (
      <>
         <div>
            <Header titlePage="Администратор" courses="Courses" />
         </div>
         <SpanStyled>
            <button type="button" onClick={navigateGoBackGroups}>
               Группы
            </button>
            \ {getGroupName?.courseName} \{' '}
            {location.pathname === `/admin/courses/${params.id}/students`
               ? 'Студенты'
               : 'Учителя'}
         </SpanStyled>
         <Outlet />
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
      border: none;
      font-size: 0.875rem;
      color: #747d74;
   }
`
