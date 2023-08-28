import React from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { useFormik } from 'formik'
import { Box } from '@mui/material'
import { Modal } from '../../../components/UI/modal/Modal'
import { Input } from '../../../components/UI/input/Input'
import { Button } from '../../../components/UI/button/Button'
import { postTeacher, putTeacher } from '../../../store/teachers/teachers.thunk'
import { addTeacherValidation } from '../../../utils/constants/addTeacherModalValidation'
import { showSnackbar } from '../../../components/UI/snackbar/Snackbar'

export const ModalTeachers = ({ open, handleClose, modalData }) => {
   const dispatch = useDispatch()

   const clearFields = (handleChange) => {
      handleChange({ target: { name: 'firstName', value: '' } })
      handleChange({ target: { name: 'lastName', value: '' } })
      handleChange({ target: { name: 'phoneNumber', value: '' } })
      handleChange({ target: { name: 'email', value: '' } })
      handleChange({ target: { name: 'specialization', value: '' } })
   }

   const initialValues = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      specialization: '',
   }

   if (modalData) {
      const [firstName, lastName, patronymic] = modalData.fullName.split(' ')
      const lastNamepatronymic = `${lastName} ${patronymic}`
      initialValues.firstName = firstName
      initialValues.lastName = patronymic ? lastNamepatronymic : lastName
      initialValues.phoneNumber = modalData.phoneNumber
      initialValues.email = modalData.email
      initialValues.specialization = modalData.specialization
   }

   const {
      handleSubmit,
      handleChange,
      setErrors,
      setTouched,
      values,
      errors,
      touched,
      resetForm,
   } = useFormik({
      initialValues,
      validationSchema: addTeacherValidation,
      onSubmit: (values) => {
         if (modalData) {
            dispatch(putTeacher({ id: modalData.id, values, showSnackbar }))
         } else {
            dispatch(postTeacher({ values, showSnackbar }))
         }
         handleClose()
         clearFields(handleChange)
         resetForm()
         setTouched({})
         setErrors({})
      },
   })

   const handleCloseAndReset = () => {
      handleClose()
      resetForm(initialValues)
   }

   return (
      <Modal
         title={modalData ? 'Изменение учителя' : 'Добавление учителя'}
         open={open}
         handleClose={handleCloseAndReset}
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
               error={touched.firstName && errors.firstName}
            />
            <Error>{touched.firstName && errors.firstName}</Error>
            <InputStyle
               placeholder="Фамилия"
               type="text"
               key="lastName"
               name="lastName"
               value={values.lastName}
               onChange={handleChange}
               error={Boolean(touched.lastName && errors.lastName)}
            />
            <Error>{touched.lastName && errors.lastName}</Error>
            <InputStyle
               placeholder="+996 ___ __ __ __"
               type="tel"
               key="phoneNumber"
               name="phoneNumber"
               value={values.phoneNumber}
               onChange={handleChange}
               error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            />
            <Error>{touched.phoneNumber && errors.phoneNumber}</Error>
            <InputStyle
               placeholder="Email"
               type="email"
               key="email"
               name="email"
               value={values.email}
               onChange={handleChange}
               error={Boolean(touched.email && errors.email)}
            />
            <Error>{touched.email && errors.email}</Error>
            <InputStyle
               placeholder="Специализация"
               type="text"
               key="specialization"
               name="specialization"
               value={values.specialization}
               onChange={handleChange}
               error={Boolean(touched.specialization && errors.specialization)}
               placeholderColor="red"
            />
            <Error>{touched.specialization && errors.specialization}</Error>
            <BoxStyle>
               <ButtonStyle variant="outlined" onClick={handleCloseAndReset}>
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
   padding: '3%',
   text: 'red',
   borderColor: 'red',
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
   width: '100%',
   height: '10px',
   margin: '-14px 0 0px 0',
   textAlign: 'center',
   color: '#f00',
}))
