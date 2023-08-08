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
   deleteGroup,
   getCard,
   postCard,
   updateCard,
} from '../../../../store/group/AdminThunk'
import Snackbar from '../../../../components/UI/snackbar/Snackbar'

export const Groups = () => {
   const dispatch = useDispatch()
   const { cards } = useSelector((state) => state.cards)
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
   console.log(imageEditValue)

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
      dispatch(deleteGroup(getCardId))
      setActiveModal1('')
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
         image: 'https://www.soyuz.ru/public/uploads/files/2/7621730/202303141402448bac77dadb.jpg',
         dateOfGraduation: formatDate,
      }
      console.log(data)
      dispatch(postCard(data))
      setActive('')
      setValue('')
   }
   console.log(editFormatDate)
   const saveHandler = (data) => {
      const updatedData = {
         id: getCardId,
         groupName: data.editTitle,
         description: data.editDescription,
         dateOfGraduation: editFormatDate,
         image: imageEditValue,
      }
      console.log(updatedData)
      dispatch(updateCard(updatedData))
      setActiveModal2('')
   }

   const openModalDeleteAndEditHandler = ({ menuId, data }) => {
      if (menuId === 1) {
         editOpenModal(data)
      } else if (menuId === 2) {
         deleteOpenModal(data)
      }
   }

   return (
      <>
         <Snackbar />
         <Header
            titlePage="Администратор"
            buttonContent="Создать группу"
            onClick={openModalAddedNewGroupHandler}
         />
         <ContainerItem>
            {cards?.map((el) => (
               <Card
                  key={el.id}
                  el={el}
                  onClick={openModalDeleteAndEditHandler}
               />
            ))}
         </ContainerItem>
         <div>
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
         </div>
      </>
   )
}
const ContainerItem = styled('div')`
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
`
