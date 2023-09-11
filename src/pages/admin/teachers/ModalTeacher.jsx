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
      phoneNumber: '+996',
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

   const fieldsForTeachers = [
      {
         key: 'firstName',
         placeholder: 'Имя',
         type: 'text',
      },
      {
         key: 'lastName',
         placeholder: 'Фамилия',
         type: 'text',
      },
      {
         key: 'phoneNumber',
         placeholder: '+996 ___ __ __ __',
         type: 'text',
      },
      {
         key: 'email',
         placeholder: 'Email',
         type: 'text',
      },
      {
         key: 'specialization',
         placeholder: 'Специализация',
         type: 'text',
      },
   ]
   return (
      <Modal
         title={modalData ? 'Изменение учителя' : 'Добавление учителя'}
         open={open}
         handleClose={handleCloseAndReset}
      >
         <FormStyle onSubmit={handleSubmit}>
            {fieldsForTeachers.map((field) => (
               <React.Fragment key={field.key}>
                  <InputStyle
                     placeholder={field.placeholder}
                     type={field.type}
                     name={field.key}
                     value={values[field.key]}
                     onChange={handleChange}
                     error={touched[field.key] && errors[field.key]}
                  />
                  <Error>{touched[field.key] && errors[field.key]}</Error>
               </React.Fragment>
            ))}

            <BoxStyle>
               <ButtonStyle variant="outlined" onClick={handleCloseAndReset}>
                  Отмена
               </ButtonStyle>
               <Button type="submit" variant="contained">
                  Добавить
               </Button>
            </BoxStyle>
         </FormStyle>
      </Modal>
   )
}

const InputStyle = styled(Input)(() => ({
   width: '62vh',
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

const FormStyle = styled('form')(() => ({
   display: 'flex',
   flexDirection: 'column',
}))
