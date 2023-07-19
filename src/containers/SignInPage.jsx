import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { styled } from '@mui/material'
import { ForgotModal } from './ForgotModal'
import { Button } from '../components/UI/button/Button'
import { Input } from '../components/UI/input/Input'
import { ClosedEyePassIcon, OpenEyePassIcon } from '../assets/icons'

const validationSchema = yup.object().shape({
   login: yup
      .string()
      .required('Введите логин')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Не валидный электронный адрес!'),
   password: yup
      .string()
      .required('Введите пароль')
      .min(8, 'Введите не менее 8 символов!'),
})

export const SignInPage = () => {
   const [showPassword, setShowPassword] = useState(false)
   const [open, setOpen] = useState(false)

   const handleClose = () => {
      setOpen(false)
   }

   const formik = useFormik({
      initialValues: {
         login: '',
         password: '',
      },
      validationSchema,
      onSubmit: (values) => {
         // Логика для отправки формы
         console.log(values)
      },
   })

   const { values, errors, touched, handleChange, handleSubmit } = formik

   return (
      <Container>
         <ContainerTitle>
            <span>Добро пожаловать</span>
            <br />
            <span style={{ marginLeft: '15px' }}>в </span>
            <span style={{ color: 'red' }}>PEAKSOFT LMS </span>
            <span>!</span>
         </ContainerTitle>
         <form onSubmit={handleSubmit}>
            <FormBlock>
               <div className="block">
                  <ContainertConfirmLogin>
                     <label style={{ color: '#8D949E' }} htmlFor="login">
                        Логин:
                        <LoginInput
                           size="small"
                           placeholder="Введите логин"
                           type="text"
                           id="login"
                           name="login"
                           value={values.login}
                           onChange={handleChange}
                           error={touched.login && errors.login}
                        />
                        {touched.login && errors.login && (
                           <span className="error-message">{errors.login}</span>
                        )}
                     </label>
                  </ContainertConfirmLogin>
                  <ContainertConfirmPassword>
                     <label style={{ color: '#8D949E' }} htmlFor="password">
                        Пароль:
                        <ContainerSecondInput>
                           <LoginSecondInput
                              size="small"
                              placeholder="Введите пароль"
                              type={showPassword ? 'text' : 'password'}
                              id="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              error={touched.password && errors.password}
                           />
                           <PasswordIconContainer
                              onClick={() => setShowPassword(!showPassword)}
                           >
                              {showPassword ? (
                                 <OpenEyePassIcon />
                              ) : (
                                 <ClosedEyePassIcon />
                              )}
                           </PasswordIconContainer>
                        </ContainerSecondInput>
                        {touched.password && errors.password && (
                           <span className="error-message">
                              {errors.password}
                           </span>
                        )}
                     </label>
                  </ContainertConfirmPassword>
               </div>
               <ForgotButtonContainer>
                  {open ? (
                     <ForgotModal open={open} handleClose={handleClose} />
                  ) : null}
                  <ForgotButton onClick={() => setOpen(true)} type="button">
                     Забыли пароль?
                  </ForgotButton>
               </ForgotButtonContainer>
            </FormBlock>

            <ContainerButton>
               <Button
                  style={{ width: '13rem', marginTop: '2rem' }}
                  type="submit"
               >
                  Войти
               </Button>
            </ContainerButton>
         </form>
      </Container>
   )
}

const Container = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   height: '100vh',
   '.error-message': {
      color: 'red',
      fontSize: ' 14px',
      margin: '0px 0px',
      padding: '0px 0px',
   },
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
   textlign: 'center',
   fontSize: '1.5rem',
   fontWeight: '600',
   marginBottom: '3.5rem',
}))

const LoginSecondInput = styled(Input)(() => ({
   '& .MuiInputBase-root': {
      width: '28.8vw',
      height: '42px',
      borderRadius: '10px',
      marginTop: '0.629rem',
      position: 'relative',
   },
   '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1F6ED4',
   },
}))

const ContainertConfirmLogin = styled('div')`
   display: flex;
   flex-direction: column;
   align-items: end;
`

const ContainertConfirmPassword = styled('div')`
   height: 10vh;
   display: flex;
   flex-direction: column;
   align-items: end;
`

const ForgotButton = styled('button')`
   color: #3772ff;
   font-size: 16px;
   font-weight: 400;
   background-color: white;
   border: none;
   margin-left: auto;
`

const ForgotButtonContainer = styled('div')`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: end;
`

const ContainerSecondInput = styled('div')`
   position: relative;
`

const PasswordIconContainer = styled('div')(() => ({
   position: 'absolute',
   top: '57%',
   right: '20px',
   transform: 'translateY(-35%)',
   cursor: 'pointer',
   border: 0,
   svg: {
      path: {
         fill: '#8D949E',
      },
   },
}))
const ContainerButton = styled('div')(() => ({
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   marginTop: '0.5rem',
}))

const FormBlock = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
   ' .block': {
      width: '100%',
      height: '23vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: '8px',
   },
}))
