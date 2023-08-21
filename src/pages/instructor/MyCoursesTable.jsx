import React, { useEffect } from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Header } from '../../components/UI/header/Header'
import { getInstructor } from '../../store/instruc/instructorThunk'
import { ModalAddGroupToCourse } from './ModalAddGroupToCourse'
import { useToggle } from '../../utils/hooks/general'

export const MyCoursesTable = () => {
   const params = useParams()
   const location = useLocation()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { isActive, setActive } = useToggle('addgrouptocourse')
   const { courses } = useSelector((state) => state.courseIns)

   const navigateGoBackGroups = () => {
      navigate('/instructor/mycoursesins')
   }

   useEffect(() => {
      dispatch(getInstructor(8))
   }, [])

   const getCard = courses.find((el) => el.id === +params.id)

   const addGroupToCourse = () => {
      setActive(!isActive)
   }
   const createLesson = () => {
      console.log('createLesson')
   }

   const isStudentsPage =
      location.pathname === `/instructor/mycoursesins/${params.id}/students`
   return (
      <>
         <div>
            <Header
               titlePage="Инструктор"
               courses="Courses"
               labelOne="Материалы"
               toOne="materials"
               buttonContent={
                  isStudentsPage ? 'Добавить группу в курс' : 'Создать урок'
               }
               onClick={isStudentsPage ? addGroupToCourse : createLesson}
               icon={isStudentsPage}
            />
         </div>
         <SpanStyled>
            <button type="button" onClick={navigateGoBackGroups}>
               Курсы
            </button>
            \ {getCard?.courseName} \
            {isStudentsPage ? ' Студенты' : ' Материалы'}
         </SpanStyled>
         <ModalAddGroupToCourse
            open={isActive}
            handleClose={() => setActive('')}
         />
         <div>
            <Outlet />
         </div>
      </>
   )
}

const SpanStyled = styled('p')`
   font-size: 0.875rem;
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
