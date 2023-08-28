import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../../../../components/UI/header/Header'
import { useToggle } from '../../../../utils/hooks/general'
import { showSnackbar } from '../../../../components/UI/snackbar/Snackbar'
import { ModalSelect } from '../courses-modal/ModalSelect'
import {
   assignInstructor,
   getAllInstructors,
} from '../../../../store/instructor/instructorThunk'
import { getCardsCourses } from '../../../../store/courses/coursesThunk'

export const CoursesTable = () => {
   const params = useParams()
   const location = useLocation()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const { getAllIns, instructors } = useSelector((state) => state.instructors)
   const { cards } = useSelector((state) => state.courses)
   const { isActive, setActive } = useToggle('modalSelect')
   const [selectedItems, setSelectedItems] = useState([])

   useEffect(() => {
      dispatch(getCardsCourses())
      dispatch(getAllInstructors())
   }, [])

   const handleMultiSelectChange = (newSelectedItems) => {
      setSelectedItems(newSelectedItems)
   }
   const getGroupName = cards.find((item) => item.id === +params.id)

   const navigateGoBackGroups = () => {
      navigate('/admin/courses')
   }
   const appointHandler = () => {
      dispatch(
         assignInstructor({
            courseId: getGroupName.id,
            instructorsId: selectedItems,
            showSnackbar,
         })
      )
      setActive('')
   }
   // console.log(getGroupName)
   return (
      <>
         <div>
            <Header
               titlePage="Администратор"
               courses="Courses"
               conditionButton
               buttonContent={
                  location.pathname === `/admin/courses/${params.id}/teachers`
                     ? 'Назначить учителя'
                     : ''
               }
               onClick={() => setActive(!isActive)}
            />
         </div>
         <ModalSelect
            coursesIns={instructors}
            array={getAllIns}
            openModal={isActive}
            handleClose={() => setActive('')}
            onClick={appointHandler}
            selectedItems={selectedItems}
            handleMultiSelectChange={handleMultiSelectChange}
            courseId={getGroupName}
         />
         <SpanStyled>
            <button type="button" onClick={navigateGoBackGroups}>
               Группы
            </button>
            \ {getGroupName?.courseName} \{' '}
            {location.pathname === `/admin/courses/${params.id}/students`
               ? 'Студенты'
               : 'Учителя'}
         </SpanStyled>
         <div>
            <Outlet />
         </div>
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
      font-size: 0.875rem;
      border: none;
      color: #747d74;
   }
`
