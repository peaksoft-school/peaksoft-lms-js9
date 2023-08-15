import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { useForm } from 'react-hook-form'
import { format, isValid } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { Header } from '../../../../components/UI/header/Header'
import { Card } from '../../../../components/UI/cards/Card'
import { useToggle } from '../../../../utils/hooks/general'
import { ModalCourses } from '../courses-modal/ModalCourses'
import { ModalDelete } from '../courses-modal/ModalDelete'
import { AppointIcon, DeleteIcon, EditIcon } from '../../../../assets/icons'
import {
   deleteFile,
   deleteGroup,
   getCardsCourses,
   postCard,
   updateCard,
} from '../../../../store/courses/coursesThunk'
import { ModalSelect } from '../courses-modal/ModalSelect'
import {
   assignInstructor,
   getAllInstructors,
} from '../../../../store/instructor/instructorThunk'
import { showSnackbar } from '../../../../components/UI/snackbar/Snackbar'
import { Isloading } from '../../../../components/UI/snackbar/Isloading'

export const Courses = () => {
   const dispatch = useDispatch()
   const { cards, isLoading } = useSelector((state) => state.courses)
   const { getAllIns, instructors } = useSelector((state) => state.instructors)
   const [getCardId, setCardId] = useState('')
   const [getCourseName, setCourseName] = useState('')
   const [dateEditModal, setDateEditModal] = useState('')
   const [dateValue, setDateValue] = useState('')
   const [imageValue, setImageValue] = useState('')
   const [imageEditValue, setImageEditValue] = useState('')
   const { isActive, setActive } = useToggle('addedmodal')
   const { setActive: setActiveModal1, isActive: isActiveModal1 } =
      useToggle('modalDelete')
   const { setActive: setActiveModal2, isActive: isActiveModal2 } =
      useToggle('modalEdit')
   const { setActive: setActiveModal3, isActive: isActiveModal3 } =
      useToggle('modalSelect')
   const {
      handleSubmit,
      setValue,
      register,
      getValues,
      formState: { errors },
   } = useForm({
      defaultValues: {
         groupName: '',
         description: '',
         editTitle: '',
         editDescription: '',
      },
   })

   let formatDate = ''
   if (dateValue && isValid(new Date(dateValue))) {
      formatDate = format(new Date(dateValue), 'yyyy-MM-dd')
   }
   let editFormatDate = ''
   if (dateEditModal && isValid(new Date(dateEditModal))) {
      editFormatDate = format(new Date(dateEditModal), 'yyyy-MM-dd')
   }

   const closeModalEditHandler = () => setActiveModal2('')
   const closeModalDeleteHandler = () => setActiveModal1('')
   const openModalAddedNewGroupHandler = () => setActive(!isActive)
   const onImageUpload = (img) => setImageValue(img)
   const dateChangeHandler = (date) => setDateValue(date)
   const closeModalAddedNewGroupHandler = () => {
      setActive('')
      setValue('groupName', '')
      setValue('description', '')
   }

   useEffect(() => {
      dispatch(getCardsCourses())
      dispatch(getAllInstructors())
   }, [])

   const isFormEmpty =
      !getValues().groupName.trim() ||
      !getValues().description.trim() ||
      !dateValue ||
      !imageValue

   const deleteOpenModal = (data) => {
      setActiveModal1(!isActiveModal1)
      setCardId(data.id)
      setCourseName(data.courseName)
   }

   const deleteHandler = () => {
      dispatch(deleteGroup(getCardId))
         .unwrap()
         .then(() => showSnackbar('Курс успешно удален', 'success'))
         .catch((error) => showSnackbar(error, 'error'))
      setActiveModal1('')
   }
   const editOpenModal = (data) => {
      setActiveModal2(!isActiveModal2)
      setValue('editTitle', data.courseName)
      setValue('editDescription', data.description)
      setValue('dateEditModal', data.dateOfGraduation)
      setImageEditValue(data.image)
      setImageValue(data.image)
      setCardId(data.id)
   }

   const addedHandler = () => {
      const data = {
         courseName: getValues().groupName,
         description: getValues().description,
         image: imageValue,
         DateOfGraduation: formatDate,
      }
      dispatch(postCard(data))
         .unwrap()
         .then(() => showSnackbar('Курс успешно создан!', 'success'))
         .catch((error) => showSnackbar(error, 'error'))
      setActive('')
      setValue('groupName', '')
      setValue('description', '')
   }
   const saveHandler = (data) => {
      const updatedData = {
         id: getCardId,
         courseName: data.editTitle,
         description: data.editDescription,
         DateOfGraduation: editFormatDate,
         image: imageValue,
         delImage: imageEditValue,
      }
      dispatch(deleteFile(updatedData.delImage))
      dispatch(updateCard(updatedData))
         .unwrap()
         .then(() => showSnackbar('Курс успешно редактирован!', 'success'))
         .catch((error) => showSnackbar(error, 'error'))
      setActiveModal2('')
   }

   const appointHandler = () => {
      dispatch(assignInstructor(getCardId))
   }
   const appointOpenModal = (data) => {
      setCardId(data.id)
      setActiveModal3(!isActiveModal3)
   }
   console.log(getAllIns)

   const openModalDeleteAndEditHandler = ({ menuId, data }) => {
      if (menuId === 1) {
         editOpenModal(data)
      } else if (menuId === 2) {
         deleteOpenModal(data)
      } else if (menuId === 3) {
         appointOpenModal(data)
      }
   }
   const menuItems = [
      {
         id: 3,
         img: <AppointIcon />,
         title: 'Назначить учителя',
      },
      {
         id: 1,
         img: <EditIcon />,
         title: 'Редактировать',
      },
      {
         id: 2,
         img: <DeleteIcon />,
         title: 'Удалить',
      },
   ]

   return (
      <div>
         {isLoading && <Isloading />}
         <div>
            <Header
               onClick={openModalAddedNewGroupHandler}
               titlePage="Администратор"
               buttonContent="Создать курс"
            />
         </div>
         <ContainerItem>
            {cards && cards.length > 0 ? (
               cards.map((el) => (
                  <Card
                     key={el.id}
                     el={el}
                     image={el.image}
                     title={el.courseName}
                     date={el.dateOfGraduation}
                     description={el.description}
                     onClick={openModalDeleteAndEditHandler}
                     menuItems={menuItems}
                  />
               ))
            ) : (
               <h1>ПОКА ЧТО НЕТ КУРСОВ!</h1>
            )}
         </ContainerItem>
         <div>
            <ModalSelect
               coursesIns={instructors}
               array={getAllIns}
               openModal={isActiveModal3}
               handleClose={() => setActiveModal3('')}
               onClick={appointHandler}
            />
            <ModalCourses
               variant={false}
               openModal={isActive}
               handleClose={closeModalAddedNewGroupHandler}
               onSubmit={addedHandler}
               onDateChange={dateChangeHandler}
               value={dateValue}
               register={register}
               onImageUpload={onImageUpload}
               errors={errors}
               handleSubmit={handleSubmit}
               setValue={setValue}
               isFormEmpty={isFormEmpty}
            />
            <ModalDelete
               open={isActiveModal1}
               handleClose={closeModalDeleteHandler}
               deleteCardHandler={deleteHandler}
               getCourseName={getCourseName}
            />
            <ModalCourses
               variant
               imageEditValue={imageEditValue}
               dateEditModal={dateEditModal}
               openModal={isActiveModal2}
               onSubmit={saveHandler}
               handleClose={closeModalEditHandler}
               onDateChange={setDateEditModal}
               register={register}
               onImageUpload={onImageUpload}
               errors={errors}
               handleSubmit={handleSubmit}
               setValue={setValue}
               isFormEmpty={isFormEmpty}
            />
         </div>
      </div>
   )
}
const ContainerItem = styled('div')`
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
`
