import React, { useEffect, useState } from 'react'
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
import { ModalEditLesson } from '../../modal/ModalLessonEditIns'
import { Isloading } from '../../../../components/UI/snackbar/Isloading'
import { showSnackbar } from '../../../../components/UI/snackbar/Snackbar'
import { NotFound } from '../../../../components/UI/not-found/NotFound'
import { ModalDelete } from '../../../admin/courses/courses-modal/ModalDelete'
import { VideoModal } from './crud/modalCrud/VideoModal'
import { PresentationModal } from './crud/modalCrud/PresentationModal'
import { LinkModal } from './crud/modalCrud/LinkModal'
import { DeleteModal } from './crud/modalCrud/DeleteModal'
import {
   deleteLinkLessonThunk,
   deletePresentationLessonThunk,
   deleteVideoLessonThunk,
} from '../../../../store/lessonCrud/lessonCrudThunk'

export const MyCoursesMaterial = () => {
   const dispatch = useDispatch()
   const params = useParams()

   const { linkId, presentationId, videoId, isLoadingCrud } = useSelector(
      (state) => state.lessonCrud
   )

   const { lesson, isLoading } = useSelector((state) => state.lesson)

   const { isActive: isActiveDel, setActive: setIsActiveDel } =
      useToggle('opendeletelesson')

   const { isActive: isActiveEdit, setActive: setIsActiveEdit } =
      useToggle('openEditlesson')

   const [id, setId] = useState('')
   const [lessonId, setLessonId] = useState('')
   const [title, setTitle] = useState('')
   const [value, setChangePutValue] = useState(title)
   const [deleteAction, setDeleteAction] = useState(null)
   const [titleCrud, setTitleCrud] = useState('')

   useEffect(() => {
      dispatch(getLesson(+params.id))
   }, [])

   const { isActive: video, setActive: setVideo } = useToggle('video')
   const { isActive: presentation, setActive: setPresentation } =
      useToggle('presentation')
   const { isActive: link, setActive: setLink } = useToggle('link')

   const { isActive: selectVideo, setActive: setSelectVideo } =
      useToggle('selectVideo')
   const { isActive: selectPresentation, setActive: setSelectPresentation } =
      useToggle('selectPresentation')
   const { isActive: selectLink, setActive: setSelectLink } =
      useToggle('selectLink')

   const { isActive: deletee, setActive: setDeletee } = useToggle('delete')

   const closeHandlerModal = () => {
      setVideo(false)
      setPresentation(false)
      setLink(false)
      setDeletee(false)
      setSelectVideo(false)
      setSelectPresentation(false)
      setSelectLink(false)
   }

   const clickSaveHandlerLessons = ({ data, lesson }) => {
      switch (data.id) {
         case 1:
            setLessonId(lesson.lessonId)
            setSelectVideo(!selectVideo)
            break
         case 2:
            setLessonId(lesson.lessonId)
            setSelectPresentation(!selectPresentation)
            break
         case 3:
            break
         case 4:
            setLessonId(lesson.lessonId)
            setSelectLink(!selectLink)
            break
         default:
      }
   }

   const clickEditHandlerLessons = ({ data, lesson }) => {
      switch (data.id) {
         case 1:
            setLessonId(lesson.lessonId)
            setVideo(!video)
            break
         case 2:
            setLessonId(lesson.lessonId)
            setPresentation(!presentation)
            break
         case 4:
            setLessonId(lesson.lessonId)
            setLink(!link)
            break
         default:
      }
   }

   const clickDeleteHandler = ({ data, actionType }) => {
      setDeleteAction(actionType)
      setTitleCrud(data)
      setDeletee(true)
   }
   const deleteHandler = () => {
      if (deleteAction === 1) {
         dispatch(
            deleteVideoLessonThunk({
               courseId: +params.id,
               videoId: videoId?.id,
               showSnackbar,
            })
         )
      } else if (deleteAction === 2) {
         dispatch(
            deletePresentationLessonThunk({
               courseId: +params.id,
               presentationId: presentationId?.id,
               showSnackbar,
            })
         )
      } else if (deleteAction === 4) {
         dispatch(
            deleteLinkLessonThunk({
               courseId: +params.id,
               linkId: linkId?.id,
               showSnackbar,
            })
         )
      }

      setDeletee(false)
   }

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
         {isLoadingCrud || isLoading ? <Isloading /> : null}
         <DivMap>
            {lesson && lesson.length > 0 ? (
               lesson.map((el) => (
                  <Material
                     el={el}
                     key={el.id}
                     clickSaveHandlerLessons={clickSaveHandlerLessons}
                     openModalDeleteHandler={openModalDeleteHandler}
                     clickEditHandler={clickEditHandler}
                     clickEditHandlerLessons={clickEditHandlerLessons}
                     clickDeleteHandler={clickDeleteHandler}
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
         <VideoModal
            lessonId={lessonId}
            isActive={video || selectVideo}
            setActive={video ? setVideo : setSelectVideo}
            closeHandlerModal={closeHandlerModal}
            buttonText={video ? 'Сохранить' : 'Добавить'}
            titleText={video ? 'Редактировать видеоурок' : 'Добавить видеоурок'}
            isVideoLesson={selectVideo}
         />
         <PresentationModal
            lessonId={lessonId}
            isActive={presentation || selectPresentation}
            setActive={presentation ? setPresentation : setSelectPresentation}
            closeHandlerModal={closeHandlerModal}
            buttonText={presentation ? 'Сохранить' : 'Добавить'}
            titleText={
               presentation
                  ? 'Редактировать презентацию'
                  : 'Добавить презентацию'
            }
            isPresentationLesson={selectPresentation}
         />
         <LinkModal
            lessonId={lessonId}
            isActive={link || selectLink}
            setActive={link ? setLink : setSelectLink}
            closeHandlerModal={closeHandlerModal}
            buttonText={link ? 'Сохранить' : 'Добавить'}
            titleText={link ? 'Редактировать ссылку' : 'Добавить ссылку'}
            isLinkLesson={selectLink}
         />

         <DeleteModal
            isActive={deletee}
            setActive={setDeletee}
            closeHandlerModal={closeHandlerModal}
            deleteHandler={deleteHandler}
            paragraph={`удалить ${
               titleCrud === 'Видеоурок'
                  ? 'видеоурок'
                  : titleCrud === 'Ссылка'
                  ? 'ссылку'
                  : titleCrud === 'Презентация'
                  ? 'презентацию'
                  : ''
            }`}
         />
      </>
   )
}

const DivMap = styled('div')(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   gap: '2rem',
}))
const ContainerNotFound = styled('div')`
   margin: 0 auto;
`
