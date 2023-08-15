import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { format, isValid } from 'date-fns'
import { useForm } from 'react-hook-form'
import { Card } from '../../../../components/UI/cards/Card'
import { ModalDeleteGroup } from '../groups-modal/ModalDeleteGroup'
import { Header } from '../../../../components/UI/header/Header'
import { ModalGroup } from '../groups-modal/ModalGroup'
import { useToggle } from '../../../../utils/hooks/general'
import {
   deleteFile,
   deleteGroup,
   getCard,
   postCard,
   updateCard,
} from '../../../../store/group/groupThunk'
import { showSnackbar } from '../../../../components/UI/snackbar/Snackbar'
import { Isloading } from '../../../../components/UI/snackbar/Isloading'

export const Groups = () => {
   const dispatch = useDispatch()
   const { cards, isLoading } = useSelector((state) => state.cards)
   const [getCardId, setCardId] = useState('')
   const [getGroupName, setGroupName] = useState('')
   const [dateEditModal, setDateEditModal] = useState('')
   const [dateValue, setDateValue] = useState('')
   const [imageValue, setImageValue] = useState('')
   const [imageEditValue, setImageEditValue] = useState('')
   const { isActive, setActive } = useToggle('addedgroupmodal')
   const { setActive: setActiveModal1, isActive: isActiveModal1 } =
      useToggle('modalDelete')
   const { setActive: setActiveModal2, isActive: isActiveModal2 } =
      useToggle('modalEdit')
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
      dispatch(getCard())
   }, [])

   const isFormEmpty =
      !getValues().groupName.trim() ||
      !getValues().description.trim() ||
      !dateValue ||
      !imageValue

   const deleteOpenModal = (data) => {
      setActiveModal1(!isActiveModal1)
      setCardId(data.id)
      setGroupName(data.groupName)
   }

   const deleteHandler = () => {
      setActiveModal1('')
      dispatch(deleteGroup(getCardId))
         .unwrap()
         .then(() => showSnackbar('Группа успешно удалено!', 'success'))
         .catch((error) => showSnackbar(error, 'error'))
   }
   const editOpenModal = (data) => {
      setActiveModal2(!isActiveModal2)
      setValue('editTitle', data.groupName)
      setValue('editDescription', data.description)
      setValue('dateEditModal', data.dateOfGraduation)
      setImageEditValue(data.image)
      setImageValue(data.image)
      setCardId(data.id)
   }

   const addedHandler = () => {
      const data = {
         groupName: getValues().groupName,
         description: getValues().description,
         image: imageValue,
         dateOfGraduation: formatDate,
      }
      dispatch(postCard(data))
         .unwrap()
         .then(() => showSnackbar('Группа успешно создано!', 'success'))
         .catch((error) => showSnackbar(error, 'error'))
      setActive('')
      setValue('groupName', '')
      setValue('description', '')
   }
   const saveHandler = (data) => {
      const updatedData = {
         id: getCardId,
         groupName: data.editTitle,
         description: data.editDescription,
         dateOfGraduation: editFormatDate,
         image: imageValue,
         delImage: imageEditValue,
      }
      dispatch(deleteFile(updatedData.delImage))
      dispatch(updateCard(updatedData))
         .unwrap()
         .then(() => showSnackbar('Группа успешно редактировано!', 'success'))
         .catch((error) => showSnackbar(error, 'error'))
      setActiveModal2('')
   }

   const openModalDeleteAndEditHandler = ({ menuId, data }) => {
      if (menuId === 1) {
         editOpenModal(data)
      } else if (menuId === 2) {
         deleteOpenModal(data)
      }
   }
   const menuItems = []
   return (
      <>
         {isLoading && <Isloading />}
         <Header
            titlePage="Администратор"
            buttonContent="Создать группу"
            onClick={openModalAddedNewGroupHandler}
         />
         <ContainerItem>
            {cards && cards.length > 0 ? (
               cards.map((el) => (
                  <Card
                     key={el.id}
                     el={el}
                     image={el.image}
                     title={el.groupName}
                     date={el.create_date}
                     description={el.description}
                     onClick={openModalDeleteAndEditHandler}
                     menuItems={menuItems}
                  />
               ))
            ) : (
               <h1>ПОКА ЧТО НЕТ ГРУПП!</h1>
            )}
         </ContainerItem>
         <>
            <ModalGroup
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
            <ModalDeleteGroup
               open={isActiveModal1}
               handleClose={closeModalDeleteHandler}
               deleteCardHandler={deleteHandler}
               getGroupName={getGroupName}
            />
            <ModalGroup
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
         </>
      </>
   )
}
const ContainerItem = styled('div')`
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
`
