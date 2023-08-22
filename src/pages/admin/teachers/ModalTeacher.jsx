import React from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { useFormik } from 'formik'
import { Box } from '@mui/material'
import { Modal } from '../../../components/UI/modal/Modal'
import { Input } from '../../../components/UI/input/Input'
import { Button } from '../../../components/UI/button/Button'
import { postTeacher } from '../../../store/teachers/teachers.thunk'
import { addTeacherValidation } from '../../../utils/constants/addTeacherModalValidation'

export const ModalTeachers = ({ open, handleClose }) => {
   const dispatch = useDispatch()
   const submitHandler = (values) => {
      dispatch(postTeacher(values))

      handleClose()
      console.log(values)
   }

   const { handleSubmit, handleChange, values, errors, touched } = useFormik({
      initialValues: {
         firstName: '',
         lastName: '',
         phoneNumber: '',
         email: '',
         specialization: '',
      },
      validationSchema: addTeacherValidation,
      onSubmit: (values) => {
         console.log(values)
         submitHandler(values)
      },
   })
   return (
      <Modal
         title="Добавление учителя"
         open={open}
         handleClose={handleClose}
         //  minHeight="700px"
      >
         <form
            style={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
            }}
            onSubmit={handleSubmit}
         >
            <InputStyle
               placeholder="Имя"
               type="text"
               key="firstName"
               name="firstName"
               value={values.firstName}
               onChange={handleChange}
            />
            <Error>{touched.firstName && errors.firstName}</Error>
            <InputStyle
               placeholder="Фамилия"
               type="text"
               key="lastName"
               name="lastName"
               value={values.lastName}
               onChange={handleChange}
            />
            <Error>{touched.lastName && errors.lastName}</Error>
            <InputStyle
               placeholder="+996 ___ __ __ __"
               type="tel"
               key="phoneNumber"
               name="phoneNumber"
               value={values.phoneNumber}
               onChange={handleChange}
            />
            <Error>{touched.phoneNumber && errors.phoneNumber}</Error>
            <InputStyle
               placeholder="Email"
               type="email"
               key="email"
               name="email"
               value={values.email}
               onChange={handleChange}
            />
            <Error>{touched.email && errors.email}</Error>
            <InputStyle
               placeholder="Специализация"
               type="text"
               key="specialization"
               name="specialization"
               value={values.specialization}
               onChange={handleChange}
            />
            <Error>{touched.specialization && errors.specialization}</Error>
            <BoxStyle>
               <ButtonStyle variant="outlined" onClick={handleClose}>
                  Отмена
               </ButtonStyle>
               <Button type="submit" variant="contained">
                  Добавить
               </Button>
            </BoxStyle>
         </form>
      </Modal>
   )
}

const InputStyle = styled(Input)(() => ({
   width: '50vh',
   padding: '1%',
}))

const ButtonStyle = styled(Button)(() => ({
   marginRight: '1rem',
}))

const BoxStyle = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'flex-end',
   alignItems: 'center',
   marginTop: '1.25rem',
}))

const Error = styled('p')(() => ({
   width: '240px',
   height: 'auto',
   margin: '0 0 1px 0',
   color: '#f00',
   textAlign: 'center',
}))
