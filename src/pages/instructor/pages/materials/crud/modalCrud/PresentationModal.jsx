import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material'
import { Modal } from '../../../../../../components/UI/modal/Modal'
import { Input } from '../../../../../../components/UI/input/Input'
import { Button } from '../../../../../../components/UI/button/Button'
import {
   postPresentationLessonThunk,
   putPresentationLessonThunk,
} from '../../../../../../store/lessonCrud/lessonCrudThunk'
import { showSnackbar } from '../../../../../../components/UI/snackbar/Snackbar'
import { getLesson } from '../../../../../../store/lesson/lessonThunk'

export const PresentationModal = ({
   lessonId,
   isActive,
   setActive,
   closeHandlerModal,
   buttonText,
   titleText,
   isPresentationLesson,
}) => {
   const dispatch = useDispatch()
   const { presentationId } = useSelector((state) => state.lessonCrud)
   const [file, setFile] = useState()
   const params = useParams()

   useEffect(() => {
      dispatch(getLesson(+params.id))
   }, [])

   const addPresentationHandleSubmit = (values) => {
      const data = {
         name: values.name,
         description: values.description,
         linkFilePpt: file,
      }
      dispatch(
         postPresentationLessonThunk({
            courseId: +params.id,
            data,
            lessonId,
            showSnackbar,
            setActive,
         })
      )
      values.name = ''
      values.description = ''
      values.linkFilePpt = ''
   }
   const updatePresentationLesson = (values) => {
      const data = {
         name: values.name,
         description: values.description,
         linkFilePpt: file,
      }
      dispatch(
         putPresentationLessonThunk({
            courseId: +params.id,
            data,
            lessonId,
            presentationId: presentationId?.id,
            showSnackbar,
            setActive,
         })
      )
   }
   const formik = useFormik({
      initialValues: {
         name: presentationId?.name || '',
         description: presentationId?.description || '',
         linkFilePpt: presentationId?.linkFilePpt || 'm',
      },
      onSubmit: (values) => {
         if (isPresentationLesson) {
            addPresentationHandleSubmit(values)
         } else {
            updatePresentationLesson(values)
         }
      },
   })

   const openFileInput = () => {
      const fileInput = document.getElementById('presentationFileInput')
      fileInput.click()
   }

   const handleChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
         const d = e.target.files[0]
         setFile(d)
      }
      formik.handleChange(e)
   }

   const disabled =
      !formik.values.name.trim() ||
      !formik.values.linkFilePpt.trim() ||
      !formik.values.description.trim()

   useEffect(() => {
      formik.setValues({
         name: presentationId?.name || '',
         description: presentationId?.description || '',
         linkFilePpt: presentationId?.linkFilePpt || '',
      })
   }, [presentationId])
   return (
      <div>
         <Modal
            title={titleText}
            handleClose={() => setActive(!isActive)}
            open={isActive}
         >
            <form onSubmit={formik.handleSubmit}>
               <InputContainer>
                  <InputStyled
                     name="name"
                     onChange={handleChange}
                     placeholder="Введите название презентации"
                     value={formik.values.name}
                  />
                  <InputStyled
                     name="description"
                     onChange={handleChange}
                     placeholder="Введите описание презентации"
                     value={formik.values.description}
                  />
                  <InputSecondContainer>
                     <InputStyledThird
                        name="linkFilePpt"
                        id="presentationFileInput"
                        type="file"
                        accept=".ppt, .pptx, .pdf"
                        onChange={handleChange}
                        style={{ display: 'none' }}
                     />
                     <InputSpan>
                        {formik.values.linkFilePpt ? (
                           formik.values.linkFilePpt
                        ) : (
                           <p>Выберите файл в формате pdf</p>
                        )}
                     </InputSpan>
                     <ButtonStyledFirst
                        variant="outlined"
                        component="span"
                        onClick={openFileInput}
                     >
                        Обзор...
                     </ButtonStyledFirst>
                  </InputSecondContainer>
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
const InputSpan = styled('span')(() => ({
   border: '1px solid #c3c1c1',
   width: '25.8vw',
   height: '2.7rem',
   borderRadius: '10px',
   paddingTop: '10px',
   paddingLeft: '10px',
   overflow: 'hidden',
   lineHeight: '1.6rem',
   p: {
      color: '#c3c1c1',
   },
   color: '#000',
}))

const InputStyled = styled(Input)(() => ({
   '& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
      width: '31.9vw',
      height: '1.6rem',
   },
}))
const ButtonStyled = styled(Button)(() => ({
   height: '2.625rem',
}))
const ButtonStyledFirst = styled(Button)(() => ({
   height: '2.625rem',
   width: '7vw',
   backgroundColor: 'rgba(26, 35, 126, 0.07)',
}))
const InputStyledThird = styled(Input)(() => ({
   '& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
      width: '24vw',
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

const InputSecondContainer = styled('div')(() => ({
   display: 'flex',
   gap: '0.85rem',
   marginLeft: '-13px',
}))
