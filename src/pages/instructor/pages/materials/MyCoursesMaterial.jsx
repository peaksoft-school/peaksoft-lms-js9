import React, { useEffect, useState } from 'react' // Импортируем useState
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material'
import { Material } from '../../../../components/UI/cards/Material'
import {
   deleteCourse,
   getLesson,
   updateLesson,
} from '../../../../store/lesson/lessonThunk'
import { useToggle } from '../../../../utils/hooks/general'
import { ModalEditLesson } from '../../ins-modal/ModalLessonEditIns'
import { Isloading } from '../../../../components/UI/snackbar/Isloading'
import { showSnackbar } from '../../../../components/UI/snackbar/Snackbar'
import { NotFound } from '../../../../components/UI/not-found/NotFound'
import { ModalDelete } from '../../../admin/courses/courses-modal/ModalDelete'

export const MyCoursesMaterial = () => {
   const dispatch = useDispatch()
   const params = useParams()
   const { lesson, isLoading } = useSelector((state) => state.lesson)
   const { isActive: isActiveDel, setActive: setIsActiveDel } =
      useToggle('opendeletelesson')
   const { isActive: isActiveEdit, setActive: setIsActiveEdit } =
      useToggle('openEditlesson')
   const [id, setId] = useState('')
   const [title, setTitle] = useState('')
   const [value, setChangePutValue] = useState(title)

   useEffect(() => {
      dispatch(getLesson(+params.id))
   }, [])

   const changeUpdateTitle = (e) => setChangePutValue(e.target.value)

   const openModalDeleteHandler = (data) => {
      setId(data.id)
      setTitle(data.name)
      setIsActiveDel(!isActiveDel)
   }
   const clickEditHandler = (data) => {
      setIsActiveEdit(!isActiveEdit)
      setId(data.lessonId)
      setTitle(data.lessonName)
      setChangePutValue(data.lessonName)
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      const data = {
         id,
         lessonName: value,
         showSnackbar,
         courseId: +params.id,
      }
      dispatch(updateLesson(data))
      setIsActiveEdit('')
   }

   const deleteCardHandler = () => {
      dispatch(deleteCourse({ id, courseId: +params.id, showSnackbar }))
      setIsActiveDel('')
   }

   const handleClose = () => {
      setIsActiveDel('')
      setIsActiveEdit('')
   }

   return (
      <>
         {isLoading && <Isloading />}
         <DivMap>
            {lesson && lesson.length > 0 ? (
               lesson.map((el) => (
                  <Material
                     el={el}
                     key={el.id}
                     openModalDeleteHandler={openModalDeleteHandler}
                     clickEditHandler={clickEditHandler}
                  />
               ))
            ) : (
               <ContainerNotFound>
                  <NotFound content="Нет уроков" />
               </ContainerNotFound>
            )}
         </DivMap>
         <ModalDelete
            open={isActiveDel}
            deleteCardHandler={deleteCardHandler}
            handleClose={handleClose}
            paragraph={`урок ${title}`}
         />
         <ModalEditLesson
            openModal={isActiveEdit}
            value={value}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            changeUpdateTitle={changeUpdateTitle}
         />
      </>
   )
}

const DivMap = styled('div')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
}))
const ContainerNotFound = styled('div')`
   margin: 0 auto;
`
