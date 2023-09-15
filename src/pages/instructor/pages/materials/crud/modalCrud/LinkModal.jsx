import React, { useEffect } from 'react'
import { styled } from '@mui/material'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../../../../../components/UI/modal/Modal'
import { Input } from '../../../../../../components/UI/input/Input'
import { Button } from '../../../../../../components/UI/button/Button'
import {
   postLinkLessonThunk,
   updateLinkLessonThunk,
} from '../../../../../../store/lessonCrud/lessonCrudThunk'
import { showSnackbar } from '../../../../../../components/UI/snackbar/Snackbar'
import { getLesson } from '../../../../../../store/lesson/lessonThunk'

export const LinkModal = ({
   isActive,
   setActive,
   closeHandlerModal,
   lessonId,
   buttonText,
   titleText,
   isLinkLesson,
}) => {
   const dispatch = useDispatch()
   const { linkId } = useSelector((state) => state.lessonCrud)
   const params = useParams()

   useEffect(() => {
      dispatch(getLesson(+params.id))
   }, [])

   const addHandleSubmit = (values) => {
      dispatch(
         postLinkLessonThunk({
            courseId: +params.id,
            values,
            lessonId,
            showSnackbar,
            setActive,
         })
      )
   }

   const updateLinkLesson = (values) => {
      const data = {
         text: values.text,
         link: values.link,
      }
      dispatch(
         updateLinkLessonThunk({
            courseId: +params.id,
            lessonId,
            data,
            linkId: linkId?.id,
            showSnackbar,
            setActive,
         })
      )
   }
   const initialValues = {
      text: linkId?.text || '',
      link: linkId?.link || '',
   }

   const formik = useFormik({
      initialValues,
      onSubmit: (values) => {
         if (isLinkLesson) {
            addHandleSubmit(values)
         } else {
            updateLinkLesson(values)
         }
      },
   })

   const handleChange = (e) => {
      formik.handleChange(e)
   }
   const disabled = !formik.values.text.trim() || !formik.values.link.trim()
   useEffect(() => {
      formik.setValues({
         text: linkId?.text || '',
         link: linkId?.link || '',
      })
   }, [linkId])
   return (
      <div>
         <Modal
            title={titleText}
            open={isActive}
            handleClose={() => setActive(false)}
         >
            <form onSubmit={formik.handleSubmit}>
               <InputContainer>
                  <InputStyled
                     name="text"
                     onChange={handleChange}
                     placeholder="Отображаемый текст"
                     value={formik.values.text}
                  />

                  <InputStyled
                     name="link"
                     onChange={handleChange}
                     placeholder="Вставьте ссылку"
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
