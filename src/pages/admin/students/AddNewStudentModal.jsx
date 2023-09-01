/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react'
import styled from '@emotion/styled'
import Select from 'react-select/creatable'
import { useFormik } from 'formik'
import PhoneInput from 'react-phone-input-2'
import { Modal } from '../../../components/UI/modal/Modal'
import { Input } from '../../../components/UI/input/Input'
import { Button } from '../../../components/UI/button/Button'
import useGetAllGroup from '../../../utils/hooks/getAllGroup'

const onlyCountries = ['kg', 'ru', 'kz']

const optionsFormat = [
   { value: 'ONLINE', label: 'ONLINE' },
   { value: 'OFFLINE', label: 'OFFLINE' },
]
const AddNewStudentModal = ({ open, onClose, addNewData }) => {
   const { groupOptions, selectedGroupID, setSelectedGroupID } =
      useGetAllGroup()
   const [studyFormat, setStudyFormat] = useState(null)

   const onSubmitHandler = (values) => {
      const newData = {
         firstName: values.firstName,
         lastName: values.lastName,
         phoneNumber: values.phoneNumber,
         email: values.email,
         password: values.password,
         groupId: String(selectedGroupID.value),
         studyFormat: studyFormat.value,
      }
      addNewData(newData)
      onClose()
   }
   const formik = useFormik({
      initialValues: {
         firstName: '',
         lastName: '',
         email: '',
         password: 'Здесь будет линк create password',
         phoneNumber: '',
      },
      onSubmit: onSubmitHandler,
   })
   const { handleChange, handleSubmit, values, setFieldValue } = formik

   const isEmailValid = () => {
      return (
         values.email.length === 0 ||
         (values.email.length > 0 && values.email.includes('@'))
      )
   }
   const handlePhoneChange = (value) => {
      setFieldValue('phoneNumber', value)
   }
   return (
      <div>
         <Modal open={open} handleClose={onClose} title="Добавить студента">
            <Container onSubmit={handleSubmit}>
               <StyledInput
                  placeholder="Имя"
                  value={values.firstName || ''}
                  onChange={handleChange}
                  name="firstName"
               />
               <StyledInput
                  placeholder="Фамилия"
                  value={values.lastName || ''}
                  onChange={handleChange}
                  name="lastName"
               />
               <StyledPhoneInput
                  specialLabel=""
                  country="kg"
                  onlyCountries={onlyCountries}
                  value={values.phoneNumber}
                  onChange={handlePhoneChange}
                  name="phoneNumber"
                  type="tel"
               />
               <StyledInput
                  placeholder="Email"
                  type="email"
                  error={!isEmailValid()}
                  value={values.email}
                  onChange={handleChange}
                  name="email"
               />
               <StyledInput
                  style={{ display: 'none' }}
                  placeholder="Пароль"
                  type="password"
                  value={values.password || ''}
                  onChange={handleChange}
                  name="password"
               />
               <StyledSelect
                  options={groupOptions}
                  value={selectedGroupID}
                  placeholder="Группа"
                  onChange={(selectedOption) => {
                     setSelectedGroupID(selectedOption)
                  }}
               />
               <StyledSelect
                  options={optionsFormat}
                  value={studyFormat}
                  placeholder="Формат обучения"
                  onChange={(selectedOption) => {
                     setStudyFormat(selectedOption)
                  }}
               />
               <BtnContainer>
                  <Button variant="outlined" onClick={onClose}>
                     Отмена
                  </Button>
                  <Button variant="contained" type="submit">
                     Добавить
                  </Button>
               </BtnContainer>
            </Container>
         </Modal>
      </div>
   )
}

export default AddNewStudentModal

const StyledInput = styled(Input)`
   width: 100%;
   margin-top: 10px;
   gap: 10px;
`
const Container = styled('form')`
   display: flex;
   flex-direction: column;
   align-items: space-between;
   width: 400px;
`
const StyledPhoneInput = styled(PhoneInput)`
   .react-tel-input.form-control:active {
      color: #bdb6b6;
      border: 1px solid #c2bcbc;
   }

   .form-control {
      color: #bdb6b6;
      padding: 10px 8px 10px 10px;
      border-radius: 10px;
      font-size: 1rem;
      border: 1px solid #c2bcbc;
      height: 40px;
      margin-top: 10px;
      width: 100%;
      height: 42px;
   }
`
const StyledSelect = styled(Select)`
   .css-1jqq78o-placeholder {
      color: #bdb6b6;
      font-size: 1rem;
   }
   .css-1u9des2-indicatorSeparator {
      width: 0px;
   }
   .css-13cymwt-control {
      width: 100%;
      padding: 2px 8px 2px 1px;
      font-size: 16px;
      border-radius: 10px;
      margin-top: 10px;
   }
   .css-t3ipsp-control {
      border-radius: 10px;
      margin-top: 10px;
   }
`
const BtnContainer = styled('div')`
   display: flex;
   justify-content: flex-end;
   gap: 10px;
   margin-top: 10px;
`
