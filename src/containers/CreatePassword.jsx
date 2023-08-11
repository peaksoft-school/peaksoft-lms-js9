import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { IconButton, styled } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { Input } from '../components/UI/input/Input'
import { Button } from '../components/UI/button/Button'
import { OpenEyePassIcon, ClosedEyePassIcon } from '../assets/icons'
import { createPasswordThunk } from '../store/signIn/signInThunk'

const schema = yup.object().shape({
   password: yup
      .string()
      .required('Введите новый пароль')
      .min(8, 'Пароль должен содержать минимум 8 символов'),
   repeatPassword: yup
      .string()
      .required('Подтвердите пароль')
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
})

export const CreatePassword = () => {
   const [showPassword, setShowPassword] = useState(false)
   const [showRepeatPassword, setShowRepeatPassword] = useState(false)

   const dispatch = useDispatch()
   const { id } = useParams()
   const navigate = useNavigate()

   const formik = useFormik({
      initialValues: {
         password: '',
         repeatPassword: '',
      },
      validationSchema: schema,
      onSubmit: (values) => {
         values.userId = id
         dispatch(createPasswordThunk(values))
         navigate('/')
         console.log(values, 'kkkk')
      },
   })

   const { values, errors, touched, handleChange, handleSubmit } = formik

   const handleTogglePasswordVisibility = (field) => {
      if (field === 'password') {
         setShowPassword(!showPassword)
      } else if (field === 'repeatPassword') {
         setShowRepeatPassword(!showRepeatPassword)
      }
   }

   return (
      <Container>
         <ContainerTitle>Создать пароль</ContainerTitle>
         <form onSubmit={handleSubmit}>
            <ContainerInput>
               <div className="block">
                  <ContainerFirstInputConfirmPassword>
                     <label style={{ color: '#8D949E' }} htmlFor="password">
                        Новый пароль:
                        <InputContainer>
                           <LoginInput
                              size="small"
                              placeholder="Введите новый пароль"
                              type={showPassword ? 'text' : 'password'}
                              id="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              error={touched.password && errors.password}
                              InputProps={{
                                 endAdornment: (
                                    <PasswordIconContainerFirst
                                       onClick={() =>
                                          handleTogglePasswordVisibility(
                                             'password'
                                          )
                                       }
                                    >
                                       {showPassword ? (
                                          <OpenEyePassIcon />
                                       ) : (
                                          <ClosedEyePassIcon />
                                       )}
                                    </PasswordIconContainerFirst>
                                 ),
                              }}
                           />
                        </InputContainer>
                        {touched.password && errors.password && (
                           <div className="error-message">
                              {errors.password}
                           </div>
                        )}
                     </label>
                  </ContainerFirstInputConfirmPassword>
                  <ContainerSecondInputConfirmPassword>
                     <label
                        style={{ color: '#8D949E' }}
                        htmlFor="repeatPassword"
                     >
                        Подтверждение:
                        <InputContainer>
                           <LoginInput
                              size="small"
                              placeholder="Подтвердите пароль"
                              type={showRepeatPassword ? 'text' : 'password'}
                              id="repeatPassword"
                              name="repeatPassword"
                              value={values.repeatPassword}
                              onChange={handleChange}
                              error={
                                 touched.repeatPassword && errors.repeatPassword
                              }
                              InputProps={{
                                 endAdornment: (
                                    <PasswordIconContainerSecond
                                       onClick={() =>
                                          handleTogglePasswordVisibility(
                                             'repeatPassword'
                                          )
                                       }
                                    >
                                       {showRepeatPassword ? (
                                          <OpenEyePassIcon />
                                       ) : (
                                          <ClosedEyePassIcon />
                                       )}
                                    </PasswordIconContainerSecond>
                                 ),
                              }}
                           />
                        </InputContainer>
                        {touched.repeatPassword && errors.repeatPassword && (
                           <div className="error-message">
                              {errors.repeatPassword}
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
