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
   // deleteFile,
   deleteGroup,
   getCardsCourses,
   postCard,
   updateCard,
} from '../../../../store/courses/coursesThunk'
import { ModalSelect } from '../courses-modal/ModalSelect'
import {
   assignInstructor,
   getAllInstructors,
   getInstructors,
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
   const [selectedItems, setSelectedItems] = useState([])
   const handleMultiSelectChange = (newSelectedItems) => {
      setSelectedItems(newSelectedItems)
   }
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

   const ddd = 'Fri Sep 08 2023 00:00:00 GMT+0600 (Киргизия)'

   console.log(ddd)
   console.log(dateValue, 'value')
   // const isFormEmpty =
   //    !getValues().groupName.trim() ||
   //    !getValues().description.trim() ||
   //    !dateValue ||
   //    !imageValue

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

   const deleteOpenModal = (data) => {
      setActiveModal1(!isActiveModal1)
      setCardId(data.id)
      setCourseName(data.courseName)
   }

   const deleteHandler = () => {
      dispatch(deleteGroup({ id: getCardId, showSnackbar }))
      setActiveModal1('')
   }

   const editOpenModal = (data) => {
      setActiveModal2(!isActiveModal2)
      setValue('editTitle', data.courseName)
      setValue('editDescription', data.description)
      setImageEditValue(data.image)
      setImageValue(data.image)
      setCardId(data.id)
   }

   const addedHandler = () => {
      const data = {
         courseName: getValues().groupName,
         description: getValues().description,
         image: imageValue,
         dateOfGraduation: formatDate,
      }
      dispatch(postCard({ data, showSnackbar, modal: setActive, setValue }))
   }
   const saveHandler = (el) => {
      const data = {
         id: getCardId,
         courseName: el.editTitle,
         description: el.editDescription,
         dateOfGraduation: editFormatDate,
         image: imageValue,
         delImage: imageEditValue,
      }
      console.log(data)
      // dispatch(deleteFile(data.delImage))
      dispatch(updateCard({ data, showSnackbar }))
      setActiveModal2('')
   }

   const appointHandler = () => {
      dispatch(
         assignInstructor({
            courseId: getCardId,
            instructorsId: selectedItems,
            showSnackbar,
         })
      )
      setActiveModal3('')
   }
   const appointOpenModal = (data) => {
      setActiveModal3(!isActiveModal3)
      setCardId(data.id)
      dispatch(getInstructors(data.id))
   }

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
               selectedItems={selectedItems}
               handleMultiSelectChange={handleMultiSelectChange}
               courseId={{ id: getCardId }}
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
               // isFormEmpty={isFormEmpty}
            />
            <ModalDelete
               open={isActiveModal1}
               handleClose={closeModalDeleteHandler}
               deleteCardHandler={deleteHandler}
               paragraph={`курс ${getCourseName}`}
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
            />
         </div>
      </div>
   )
}
const ContainerItem = styled('div')`
   gap: 20px;
   display: flex;
   flex-wrap: wrap;
`
