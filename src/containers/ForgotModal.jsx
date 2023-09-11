import React from 'react'
import { styled } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { Modal } from '../components/UI/modal/Modal'
import { Button } from '../components/UI/button/Button'
import { Input } from '../components/UI/input/Input'
import { forgotPasswordThunk } from '../store/signIn/signInThunk'
import { showSnackbar } from '../components/UI/snackbar/Snackbar'

const validationSchema = yup.object().shape({
   email: yup
      .string()
      .email('Введите действительный Email')
      .matches(
         /@(gmail\.com|mail\.ru)$/,
         'Допустимы только gmail.com или mail.ru'
      )
      .required('Введите ваш Email'),
})

export const ForgotModal = ({ open, handleClose }) => {
   const dispatch = useDispatch()
   const formik = useFormik({
      initialValues: {
         email: '',
         link: 'http://localhost:3000/createPassword',
      },
      validationSchema,
      onSubmit: (values) => {
         dispatch(forgotPasswordThunk({ values, showSnackbar }))
         formik.resetForm()
         handleClose()
      },
   })

   const { values, errors, touched, handleChange, handleSubmit } = formik

   return (
      <div>
         <Modal title="Забыли пароль?" open={open} handleClose={handleClose}>
            <div>
               <ContentTitle>
                  Вам будет отправлена ссылка для сброса пароля
               </ContentTitle>
               <FormSubmit onSubmit={handleSubmit}>
                  <div>
                     <ForgotInput
                        placeholder="Введите ваш Email"
                        size="small"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && errors.email}
                     />
                     {touched.email && errors.email && (
                        <ErrorText>{errors.email}</ErrorText>
                     )}
                  </div>
                  <ForgotButton type="submit">Отправить</ForgotButton>
               </FormSubmit>
            </div>
         </Modal>
      </div>
   )
}

const ContentTitle = styled('div')(() => ({
   color: 'var(--color-dark-dark-2, #87898E)',
   fontSize: '14px',
   fontWeight: '400',
}))

const ForgotButton = styled(Button)(() => ({
   padding: '10px 24px',
   width: '100%',
   height: '5vh',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: '8px',
}))
const FormSubmit = styled('form')(() => ({
   height: '14vh',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'space-between',
}))

const ForgotInput = styled(Input)(() => ({
   '& .MuiInputBase-root': {
      width: '32vw',
      height: '5vh',
      borderRadius: '10px',
      marginTop: '0.629rem',
   },
   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1F6ED4',
   },
}))

const ErrorText = styled('div')(() => ({
   color: 'red',
   fontSize: '14px',
}))
