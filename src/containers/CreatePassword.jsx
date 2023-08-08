import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { IconButton, styled } from '@mui/material'
import { Input } from '../components/UI/input/Input'
import { Button } from '../components/UI/button/Button'
import { OpenEyePassIcon, ClosedEyePassIcon } from '../assets/icons'

const schema = yup.object().shape({
   newPassword: yup
      .string()
      .required('Введите новый пароль')
      .min(8, 'Пароль должен содержать минимум 8 символов'),
   confirmPassword: yup
      .string()
      .required('Подтвердите пароль')
      .oneOf([yup.ref('newPassword'), null], 'Пароли должны совпадать'),
})

export const CreatePassword = () => {
   const [showFirstPassword, setShowFirstPassword] = useState(false)
   const [showSecondPassword, setShowSecondPassword] = useState(false)

   const formik = useFormik({
      initialValues: {
         newPassword: '',
         confirmPassword: '',
      },
      validationSchema: schema,
      onSubmit: (values) => {
         console.log(values)
      },
   })

   const { values, errors, touched, handleChange, handleSubmit } = formik

   const handleTogglePasswordVisibility = (field) => {
      if (field === 'newPassword') {
         setShowFirstPassword(!showFirstPassword)
      } else if (field === 'confirmPassword') {
         setShowSecondPassword(!showSecondPassword)
      }
   }

   return (
      <Container>
         <ContainerTitle>Создать пароль</ContainerTitle>
         <form onSubmit={handleSubmit}>
            <ContainerInput>
               <div className="block">
                  <ContainerFirstInputConfirmPassword>
                     <label style={{ color: '#8D949E' }} htmlFor="newPassword">
                        Новый пароль:
                        <InputContainer>
                           <LoginInput
                              size="small"
                              placeholder="Введите новый пароль"
                              type={showFirstPassword ? 'text' : 'password'}
                              id="newPassword"
                              name="newPassword"
                              value={values.newPassword}
                              onChange={handleChange}
                              error={touched.newPassword && errors.newPassword}
                              InputProps={{
                                 endAdornment: (
                                    <PasswordIconContainerFirst
                                       onClick={() =>
                                          handleTogglePasswordVisibility(
                                             'newPassword'
                                          )
                                       }
                                    >
                                       {showFirstPassword ? (
                                          <OpenEyePassIcon />
                                       ) : (
                                          <ClosedEyePassIcon />
                                       )}
                                    </PasswordIconContainerFirst>
                                 ),
                              }}
                           />
                        </InputContainer>
                        {touched.newPassword && errors.newPassword && (
                           <div className="error-message">
                              {errors.newPassword}
                           </div>
                        )}
                     </label>
                  </ContainerFirstInputConfirmPassword>
                  <ContainerSecondInputConfirmPassword>
                     <label
                        style={{ color: '#8D949E' }}
                        htmlFor="confirmPassword"
                     >
                        Подтверждение:
                        <InputContainer>
                           <LoginInput
                              size="small"
                              placeholder="Подтвердите пароль"
                              type={showSecondPassword ? 'text' : 'password'}
                              id="confirmPassword"
                              name="confirmPassword"
                              value={values.confirmPassword}
                              onChange={handleChange}
                              error={
                                 touched.confirmPassword &&
                                 errors.confirmPassword
                              }
                              InputProps={{
                                 endAdornment: (
                                    <PasswordIconContainerSecond
                                       onClick={() =>
                                          handleTogglePasswordVisibility(
                                             'confirmPassword'
                                          )
                                       }
                                    >
                                       {showSecondPassword ? (
                                          <OpenEyePassIcon />
                                       ) : (
                                          <ClosedEyePassIcon />
                                       )}
                                    </PasswordIconContainerSecond>
                                 ),
                              }}
                           />
                        </InputContainer>
                        {touched.confirmPassword && errors.confirmPassword && (
                           <div className="error-message">
                              {errors.confirmPassword}
                           </div>
                        )}
                     </label>
                  </ContainerSecondInputConfirmPassword>
               </div>
            </ContainerInput>
            <div className="buttonContainer">
               <Button
                  style={{ width: '13rem', marginTop: '2rem' }}
                  type="submit"
               >
                  Войти
               </Button>
            </div>
         </form>
      </Container>
   )
}
const PasswordIconContainerFirst = styled(IconButton)(() => ({
   svg: {
      path: {
         fill: '#9e8e8d',
      },
   },
}))
const PasswordIconContainerSecond = styled(IconButton)(() => ({
   svg: {
      path: {
         fill: '#9e8e8d',
      },
   },
}))

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   height: '100vh',
   '.buttonContainer': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
   },
}))

const InputContainer = styled('div')(() => ({
   position: 'relative',
   margin: '0px 0px',
   padding: '0px 0px',
}))

const LoginInput = styled(Input)(() => ({
   '& .MuiInputBase-root': {
      width: '28.8vw',
      height: '42px',
      borderRadius: '10px',
      marginTop: '0.629rem',
   },
   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1F6ED4',
   },
}))

const ContainerTitle = styled('div')(() => ({
   color: '#1F1F1F',
   textAlign: 'center',
   fontSize: '1.5rem',
   fontWeight: '600',
   marginBottom: '3.5rem',
}))

const ContainerInput = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '20px',
   '.block': {
      justifyContent: 'space-between',
      width: '100%',
      height: '23vh',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '2.13rem',
   },
}))

const ContainerSecondInputConfirmPassword = styled('div')(() => ({
   height: '10vh',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'flex-end',
   '.error-message': {
      color: 'red',
      fontSize: '14px',
      margin: '0',
      padding: '0',
   },
}))

const ContainerFirstInputConfirmPassword = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'flex-end',
   gap: '7px',
   position: 'relative',
   '.error-message': {
      color: 'red',
      fontSize: '14px',
      margin: '0',
      padding: '0',
   },
}))
