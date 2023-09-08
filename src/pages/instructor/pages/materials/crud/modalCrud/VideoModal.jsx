import React, { useEffect } from 'react'
import { styled } from '@mui/material'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../../../../../components/UI/modal/Modal'
import { Input } from '../../../../../../components/UI/input/Input'
import { Button } from '../../../../../../components/UI/button/Button'
import {
   postVideoLessonThunk,
   putVideoLessonThunk,
} from '../../../../../../store/lessonCrud/lessonCrudThunk'
import { showSnackbar } from '../../../../../../components/UI/snackbar/Snackbar'

export const VideoModal = ({
   lessonId,
   buttonText,
   titleText,
   isActive,
   setActive,
   closeHandlerModal,
   isVideoLesson,
}) => {
   const dispatch = useDispatch()
   const { videoId } = useSelector((state) => state.lessonCrud)

   const addVideoHandleSubmit = (values) => {
      setActive(false)
      dispatch(postVideoLessonThunk({ values, lessonId, showSnackbar }))
   }
   const updateVideoLesson = (values) => {
      const data = {
         name: values.name,
         description: values.description,
         link: values.link,
      }
      dispatch(
         putVideoLessonThunk({ data, videoLessonId: videoId?.id, showSnackbar })
      )
      setActive(false)
   }
   const initialValues = {
      name: videoId?.name || '',
      description: videoId?.description || '',
      link: videoId?.link || '',
   }

   const formik = useFormik({
      initialValues,
      onSubmit: (values) => {
         if (isVideoLesson) {
            addVideoHandleSubmit(values)
         } else {
            updateVideoLesson(values)
         }
      },
   })

   const handleChange = (e) => {
      formik.handleChange(e)
   }

   const disabled =
      !formik.values.name.trim() ||
      !formik.values.description.trim() ||
      !formik.values.link.trim()

   useEffect(() => {
      formik.setValues({
         name: videoId?.name || '',
         description: videoId?.description || '',
         link: videoId?.link || '',
      })
   }, [videoId])

   return (
      <div>
         <Modal
            title={titleText}
            open={isActive}
            handleClose={() => setActive('')}
         >
            <form onSubmit={formik.handleSubmit}>
               <InputContainer>
                  <InputStyled
                     name="name"
                     onChange={handleChange}
                     placeholder="Введите название видеоурока"
                     value={formik.values.name}
                  />

                  <InputStyled
                     name="description"
                     onChange={handleChange}
                     placeholder="Введите описание видеурока"
                     value={formik.values.description}
                  />

                  <InputStyled
                     name="link"
                     onChange={handleChange}
                     placeholder="Вставьте ссылку на видеоурок"
                     value={formik.values.link}
                  />
               </InputContainer>
               <ButtonContainer>
                  <ButtonStyled variant="outlined" onClick={closeHandlerModal}>
                     Отмена
                  </ButtonStyled>
                  <ButtonStyled disabled={disabled} type="submit">
                     {buttonText}
                  </ButtonStyled>
               </ButtonContainer>
            </form>
         </Modal>
      </div>
   )
}
const InputStyled = styled(Input)(() => ({
   '& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
      width: '31.9vw',
      height: '1.6rem',
   },
}))

const InputContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '0.65rem',
   marginBottom: '1.25rem',
}))

const ButtonContainer = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'end',
   gap: '0.62rem',
   width: '100%',
}))
const ButtonStyled = styled(Button)(() => ({
   height: '2.625rem',
}))
