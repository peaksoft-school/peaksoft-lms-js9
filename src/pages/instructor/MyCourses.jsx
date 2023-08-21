import React, { useEffect, useState } from 'react' // Импортируем useState
import { useDispatch, useSelector } from 'react-redux'
import { el } from 'date-fns/locale'
import { Material } from '../../components/UI/cards/Material'
import {
   deleteCourse,
   getLesson,
   postLessonThunk,
   // postLessonS,
   updateLesson,
} from '../../store/lesson/lessonThunk'
import { Header } from '../../components/UI/header/Header'
import { useToggle } from '../../utils/hooks/general'
import { ModalLessonPost } from './ins-modal/ModalLessonPostIns'
import { ModalDeleteLesson } from './ins-modal/ModalLessonDeleteIns'
import { ModalEditLesson } from './ins-modal/ModalLessonEditIns'

export const MyCoursesIns = () => {
   const { lesson } = useSelector((state) => state.lesson)
   const { isActive, setActive } = useToggle('openP')
   const { isActive: isActiveDel, setActive: setIsActiveDel } =
      useToggle('open')
   const { isActive: isActiveEdit, setActive: setIsActiveEdit } =
      useToggle('openEd')

   const [id, setId] = useState('') // delete id
   const [title, setTitle] = useState('') // delete Title
   const [value, setChangePutValue] = useState('') // edite
   const [postValue, setpostValue] = useState('')

   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(getLesson(1))
   }, [])
   const handleClose = () => {
      setIsActiveDel('')
      setIsActiveEdit('')
      setActive('')
   }

   const openModalAddLesson = () => {
      setActive(!isActive)
   }

   const openModalHandler = (data) => {
      setIsActiveDel('openP')
      setId(data.id)
      setTitle(data.lessonName)
   }
   const deleteCardHandler = () => {
      dispatch(deleteCourse(id))
      setIsActiveDel('')
   }

   // edit put
   const clickEditHandler = (data) => {
      setId(data.id)
      setTitle(data.lessonName)
      setIsActiveEdit('openEd')
   }
   const editChangeModal = (e) => {
      setChangePutValue(e.target.value)
      dispatch(updateLesson(id))
   }
   //  post
   const onChangeHPostandler = (e) => {
      setpostValue(e.target.value)
   }
   const postLessonS = (id) => {
      dispatch(postLessonThunk(id))
   }
   return (
      <>
         <Header
            titlePage="Инструктор "
            buttonContent="добавить урок"
            onClick={openModalAddLesson}
         />

         <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {lesson?.map((el) => (
               <Material
                  key={el.id}
                  el={el}
                  openModalHandler={openModalHandler}
                  clickEditHandler={clickEditHandler}
               />
            ))}
         </div>
         <ModalLessonPost
            openModal={isActive}
            handleClose={handleClose}
            postLessonS={postLessonS}
            onChangeHPostandler={onChangeHPostandler}
            value={postValue}
            lessonId={id}
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
               editChangeModal={editChangeModal}
               handleClose={handleClose}
               id={id}
            />
         )}
      </>
   )
}
