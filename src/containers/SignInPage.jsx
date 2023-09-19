import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { styled } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { ForgotModal } from './ForgotModal'
import { Button } from '../components/UI/button/Button'
import { Input } from '../components/UI/input/Input'
import { ClosedEyePassIcon, OpenEyePassIcon } from '../assets/icons'
import { signInThunk } from '../store/signIn/signInThunk'
import { showSnackbar } from '../components/UI/snackbar/Snackbar'

const validationSchema = yup.object().shape({
   email: yup
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
   const dispatch = useDispatch()

   const handleClose = () => {
      setOpen(false)
   }

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema,
      onSubmit: (values) => {
         dispatch(signInThunk({ values, showSnackbar }))
      },
   })

   const { values, errors, touched, handleChange, submitForm } = formik

   const handleSubmit = (e) => {
      e.preventDefault()
      submitForm()
   }
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
                     <label style={{ color: '#8D949E' }} htmlFor="email">
                        Логин:
                        <LoginInput
                           size="small"
                           placeholder="Введите логин"
                           type="text"
                           id="email"
                           name="email"
                           value={values.email}
                           onChange={handleChange}
                           error={touched.email && errors.email}
                        />
                        {touched.email && errors.email && (
                           <span className="error-message">{errors.email}</span>
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
                              InputProps={{
                                 endAdornment: (
                                    <PasswordIconContainer
                                       onClick={() =>
                                          setShowPassword(!showPassword)
                                       }
                                    >
                                       {showPassword ? (
                                          <OpenEyePassIcon />
                                       ) : (
                                          <ClosedEyePassIcon />
                                       )}
                                    </PasswordIconContainer>
                                 ),
                              }}
                           />
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
                  <ForgotModal open={open} handleClose={handleClose} />
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
   backgroundColor: '#fff',
   '.error-message': {
      color: 'red',
      fontSize: ' 14px',
      margin: '0px 0px',
      padding: '0px 0px',
   },
}))

const LoginInput = styled(Input)(() => ({
   '& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
      height: '3.2vh',
   },
   '& .MuiInputBase-root': {
      width: '28.8vw',
      borderRadius: '10px',
      marginTop: '0.4rem',
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
      height: '5vh',
      borderRadius: '10px',
      marginTop: '0.4rem',
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
   height: 8vh;
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
   cursor: pointer;
`

const ForgotButtonContainer = styled('div')`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: end;
   cursor: 'pointer';
`

const ContainerSecondInput = styled('div')`
   position: relative;
`

const PasswordIconContainer = styled(IconButton)(() => ({
   svg: {
      path: {
         fill: '#9e8e8d',
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
   ' .block': {
      width: '100%',
      height: '18.5vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: '8px',
   },
}))
