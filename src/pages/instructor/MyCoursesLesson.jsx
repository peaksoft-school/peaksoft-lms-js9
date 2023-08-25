import React, { useEffect, useState } from 'react' // Импортируем useState
import { useDispatch, useSelector } from 'react-redux'
import { el } from 'date-fns/locale'
import { styled } from '@mui/material'
import { Material } from '../../components/UI/cards/Material'
import {
   deleteCourse,
   getLesson,
   postLessonThunk,
   updateLesson,
} from '../../store/lesson/lessonThunk'
import { useToggle } from '../../utils/hooks/general'
import { ModalLessonPost } from './ins-modal/ModalLessonPostIns'
import { ModalDeleteLesson } from './ins-modal/ModalLessonDeleteIns'
import { ModalEditLesson } from './ins-modal/ModalLessonEditIns'
import { PlusIcon } from '../../assets/icons'
import { Button } from '../../components/UI/button/Button'
import { Isloading } from '../../components/UI/snackbar/Isloading'
import { showSnackbar } from '../../components/UI/snackbar/Snackbar'

export const MyCoursesLesson = () => {
   const { lesson, isLoading } = useSelector((state) => state.lesson)
   const { isActive, setActive } = useToggle('openP')
   const { isActive: isActiveDel, setActive: setIsActiveDel } =
      useToggle('open')
   const { isActive: isActiveEdit, setActive: setIsActiveEdit } =
      useToggle('openEd')

   const [id, setId] = useState('')
   const [title, setTitle] = useState('')
   const [value, setChangePutValue] = useState(title)
   const [postValue, setpostValue] = useState('')
   const [courseId, setCourseId] = useState(1)

   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(getLesson(courseId))
      setCourseId(1)
   }, [])
   const handleClose = () => {
      setIsActiveDel('')
      setIsActiveEdit('')
      setActive('')
   }
   const openModalAddLesson = () => {
      setActive(!isActive)
   }
   const openModalDeleteHandler = (data) => {
      setId(data.id)
      setIsActiveDel('openP')
      setTitle(data.name)
   }
   const deleteCardHandler = () => {
      dispatch(deleteCourse({ id, showSnackbar }))
      setIsActiveDel('')
   }
   const clickEditHandler = (data) => {
      setId(data.lessonId)
      setIsActiveEdit('openEd')
      setTitle(data.lessonName)
      setChangePutValue(data.lessonName)
   }

   const changeUpdateTitle = (e) => {
      setChangePutValue(e.target.value)
   }
   const handleSubmit = (e) => {
      e.preventDefault()
      const data = {
         id,
         lessonName: value,
         showSnackbar,
      }
      dispatch(updateLesson(data))
      setIsActiveEdit('')
   }
   const onChangePostandler = (e) => {
      setpostValue(e.target.value)
   }
   const postLesson = () => {
      const data = {
         courseId,
         lessonName: postValue,
         showSnackbar,
      }
      setpostValue('')
      dispatch(postLessonThunk(data))
   }
   return (
      <>
         {isLoading && <Isloading />}
         <HeaderBtnDiv>
            <Button onClick={openModalAddLesson}>
               <PlusIcon />
               добавить урок
            </Button>
         </HeaderBtnDiv>
         <DivMap>
            {lesson && lesson.length > 0 ? (
               lesson.map((el) => (
                  <Material
                     key={el.id}
                     el={el}
                     openModalDeleteHandler={openModalDeleteHandler}
                     clickEditHandler={clickEditHandler}
                  />
               ))
            ) : (
               <h1>ПОКА ЧТО НЕТ УРОКОВ!</h1>
            )}
         </DivMap>
         <ModalLessonPost
            openModal={isActive}
            handleClose={handleClose}
            postLesson={postLesson}
            onChangePostandler={onChangePostandler}
            value={postValue}
         />
         {isActiveDel && (
            <ModalDeleteLesson
               key={el.id}
               open={isActiveDel}
               deleteCardHandler={deleteCardHandler}
               handleClose={handleClose}
               getTitle={title}
            />
         )}
         {isActiveEdit && (
            <ModalEditLesson
               key={el.id}
               openModal={isActiveEdit}
               value={value}
               handleClose={handleClose}
               handleSubmit={handleSubmit}
               changeUpdateTitle={changeUpdateTitle}
            />
         )}
      </>
   )
}

const DivMap = styled('div')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
}))
const HeaderBtnDiv = styled('div')(() => ({
   display: 'flex',
   color: 'green',
   flexDirection: 'row-reverse',
   alignItems: 'flex-end',
   textAlign: 'flex-end',
}))
