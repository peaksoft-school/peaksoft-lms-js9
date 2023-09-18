import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Header } from '../../../../components/UI/header/Header'
import { ModalAddGroupToCourse } from '../../modal/ModalAddGroupToCourse'
import { useToggle } from '../../../../utils/hooks/general'
import { getCard } from '../../../../store/group/groupThunk'
import { showSnackbar } from '../../../../components/UI/snackbar/Snackbar'
import {
   addGroupToCourseThunk,
   deleteGroupToCourseThunk,
   getByIdInstructor,
   getCoursesById,
} from '../../../../store/courses/coursesThunk'
import { ModalDelete } from '../../../admin/courses/courses-modal/ModalDelete'
import { ModalLessonPost } from '../../ins-modal/ModalLessonPostIns'
import { postLessonThunk } from '../../../../store/lesson/lessonThunk'

export const MyCoursesTable = () => {
   const params = useParams()
   const location = useLocation()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { id } = useSelector((state) => state.auth)
   const { courses, coursesGroup } = useSelector((state) => state.courses)
   const { cards } = useSelector((state) => state.cards)
   const [selectedOption, setSelectedOption] = useState('')
   const [postValue, setpostValue] = useState('')
   const { isActive, setActive } = useToggle('addgrouptocourse')
   const { isActive: openCreateLesson, setActive: setCreateLesson } =
      useToggle('createlesson')
   const { isActive: openModal, setActive: setOpenModal } = useToggle(
      'deletegrouptocourse'
   )

   const navigateGoBackGroups = () => navigate('/instructor/mycoursesins')

   useEffect(() => {
      dispatch(getByIdInstructor(id))
      dispatch(getCoursesById(+params.id))
      dispatch(getCard())
   }, [])

   const getCards = courses.find((el) => el.id === +params.id)
   const handleSelectChange = (event) => setSelectedOption(event.target.value)
   const openAddGroupToCourse = () => setActive(!isActive)
   const openModalDeleteGroupToCourse = () => setOpenModal(!openModal)
   const openModalAddLesson = () => setCreateLesson(!openCreateLesson)

   const deleteGroupToCourse = () => {
      dispatch(
         deleteGroupToCourseThunk({
            instructorId: id,
            showSnackbar,
            groupId: coursesGroup.id,
            courseId: +params.id,
            page: 1,
         })
      )
      setOpenModal('')
   }
   const addGroupToCourseHandler = () => {
      dispatch(
         addGroupToCourseThunk({
            instructorId: id,
            groupId: selectedOption,
            courseId: +params.id,
            showSnackbar,
            page: 1,
         })
      )
      setActive('')
   }

   const onChangePostandler = (e) => {
      setpostValue(e.target.value)
   }
   const postLesson = () => {
      const data = {
         courseId: +params.id,
         lessonName: postValue,
         showSnackbar,
      }
      dispatch(postLessonThunk(data))
      setpostValue('')
   }

   const isStudentsPage =
      location.pathname === `/instructor/mycoursesins/${params.id}/students`

   return (
      <>
         <div>
            {coursesGroup.id === null ? (
               <Header
                  titlePage="Инструктор"
                  courses="Courses"
                  labelOne="Материалы"
                  toOne="materials"
                  buttonContent={
                     isStudentsPage ? 'Добавить группу в курс' : 'Создать урок'
                  }
                  onClick={
                     isStudentsPage ? openAddGroupToCourse : openModalAddLesson
                  }
                  icon={isStudentsPage}
               />
            ) : (
               <Header
                  titlePage="Инструктор"
                  courses="Courses"
                  labelOne="Материалы"
                  toOne="materials"
                  dangerButton={
                     isStudentsPage ? 'Удалить группу с курса' : 'Создать урок'
                  }
                  onClick={
                     isStudentsPage
                        ? openModalDeleteGroupToCourse
                        : openModalAddLesson
                  }
               />
            )}
         </div>
         <SpanStyled>
            <button type="button" onClick={navigateGoBackGroups}>
               Курсы
            </button>
            \ {getCards?.courseName} \
            {isStudentsPage ? ' Студенты' : ' Материалы'}
         </SpanStyled>
         <ModalAddGroupToCourse
            array={cards}
            open={isActive}
            onSubmit={addGroupToCourseHandler}
            handleClose={() => setActive('')}
            selectedOption={selectedOption}
            handleSelectChange={handleSelectChange}
         />
         <ModalLessonPost
            openModal={openCreateLesson}
            handleClose={() => setCreateLesson('')}
            postLesson={postLesson}
            onChangePostandler={onChangePostandler}
            value={postValue}
         />
         <ModalDelete
            open={openModal}
            handleClose={() => setOpenModal('')}
            paragraph={`группу ${coursesGroup.groupName} с курса ${getCards?.courseName}`}
            deleteCardHandler={deleteGroupToCourse}
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
   align-items: end;
   button {
      cursor: pointer;
      border: none;
      font-size: 1rem;
      color: #747d74;
   }
`
