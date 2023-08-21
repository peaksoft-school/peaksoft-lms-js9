import React, { useEffect, useState } from 'react' // Импортируем useState
import { useDispatch, useSelector } from 'react-redux'
import { el } from 'date-fns/locale'
import { styled } from '@mui/material'
import { Material } from '../../components/UI/cards/Material'
import {
   deleteCourse,
   getLesson,
   postLessonThunk,
   // postLessonS,
   updateLesson,
} from '../../store/lesson/lessonThunk'
// import { Header } from '../../components/UI/header/Header'
import { useToggle } from '../../utils/hooks/general'
import { ModalLessonPost } from './ins-modal/ModalLessonPostIns'
import { ModalDeleteLesson } from './ins-modal/ModalLessonDeleteIns'
import { ModalEditLesson } from './ins-modal/ModalLessonEditIns'
import { PlusIcon } from '../../assets/icons'
import { Button } from '../../components/UI/button/Button'

export const MyCoursesIns = () => {
   const { lesson } = useSelector((state) => state.lesson)
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
   // post
   const openModalAddLesson = () => {
      setActive(!isActive)
   }
   // delet
   const openModalHandler = (data) => {
      setIsActiveDel('openP')
      setId(data.id)
      setTitle(data.lessonName)
   }
   const deleteCardHandler = () => {
      dispatch(deleteCourse(id))
      setIsActiveDel('')
      dispatch(getLesson(courseId))
   }

   // edit put
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
      }
      dispatch(updateLesson(data))
      dispatch(getLesson(courseId))
      setIsActiveEdit('')
   }
   //  post

   const onChangeHPostandler = (e) => {
      setpostValue(e.target.value)
   }
   const postLessonS = () => {
      const object = {
         courseId,
         lessonName: postValue,
      }
      dispatch(postLessonThunk(object))
      dispatch(getLesson(courseId))
   }
   return (
      <>
         <HeaderBtnDiv>
            <Button onClick={openModalAddLesson}>
               <PlusIcon />
               добавить урок
            </Button>
         </HeaderBtnDiv>

         <DivMap>
            {lesson?.map((el) => (
               <Material
                  key={el.id}
                  el={el}
                  openModalHandler={openModalHandler}
                  clickEditHandler={clickEditHandler}
               />
            ))}
         </DivMap>
         <ModalLessonPost
            openModal={isActive}
            handleClose={handleClose}
            postLessonS={postLessonS}
            onChangeHPostandler={onChangeHPostandler}
            value={postValue}
         />
         {/* delete */}
         {isActiveDel && (
            <ModalDeleteLesson
               key={el.id}
               open={isActiveDel}
               deleteCardHandler={deleteCardHandler}
               handleClose={handleClose}
               getTitle={title}
            />
         )}
         {/* edit */}
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
   color: 'green',
   display: 'flex',
   flexDirection: 'row-reverse',
   alignItems: 'flex-end',
   textAlign: 'flex-end',
}))
