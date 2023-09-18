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
import { NotFound } from '../../../../components/UI/not-found/NotFound'

export const Groups = () => {
   const dispatch = useDispatch()
   const { cards, isLoading } = useSelector((state) => state.cards)

   const [getCardId, setCardId] = useState('')
   const [getGroupName, setGroupName] = useState('')

   const [dateAdded, setDateAdded] = useState('')
   const [dateEdit, setDateEdit] = useState('')

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
   if (dateAdded && isValid(new Date(dateAdded))) {
      formatDate = format(new Date(dateAdded), 'yyyy-MM-dd')
   }
   let editFormatDate = ''
   if (dateEdit && isValid(new Date(dateEdit))) {
      editFormatDate = format(new Date(dateEdit), 'yyyy-MM-dd')
   }

   const closeModalEditHandler = () => setActiveModal2('')
   const closeModalDeleteHandler = () => setActiveModal1('')
   const openModalAddedNewGroupHandler = () => setActive(!isActive)

   const onImageUpload = (img) => setImageValue(img)
   const dateChangeHandler = (date) => setDateAdded(date)
   const closeModalAddedNewGroupHandler = () => {
      setActive('')
      setValue('groupName', '')
      setValue('description', '')
   }

   useEffect(() => {
      dispatch(getCard())
   }, [])

   const deleteOpenModal = (data) => {
      setActiveModal1(!isActiveModal1)
      setCardId(data.id)
      setGroupName(data.groupName)
   }

   const deleteHandler = () => {
      setActiveModal1('')
      dispatch(deleteGroup({ getCardId, showSnackbar }))
   }

   const editOpenModal = (data) => {
      setActiveModal2(!isActiveModal2)
      setValue('editTitle', data.groupName)
      setValue('editDescription', data.description)
      setDateEdit(dateEdit)
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
      dispatch(postCard({ data, showSnackbar, modal: setActive, setValue }))
   }
   const saveHandler = (el) => {
      const data = {
         id: getCardId,
         groupName: el.editTitle,
         description: el.editDescription,
         dateOfGraduation: editFormatDate,
         image: imageValue,
         delImage: imageEditValue,
      }
      dispatch(deleteFile(data.delImage))
      dispatch(updateCard({ data, showSnackbar }))
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
                     date={el.dateOfGraduate}
                     description={el.description}
                     onClick={openModalDeleteAndEditHandler}
                     menuItems={menuItems}
                  />
               ))
            ) : (
               <ContainerNotFound>
                  <NotFound content="Нет групп!" />
               </ContainerNotFound>
            )}
         </ContainerItem>
         <>
            <ModalGroup
               variant={false}
               openModal={isActive}
               handleClose={closeModalAddedNewGroupHandler}
               onSubmit={addedHandler}
               onDateChange={dateChangeHandler}
               value={setDateAdded}
               register={register}
               onImageUpload={onImageUpload}
               errors={errors}
               handleSubmit={handleSubmit}
               setValue={setValue}
            />
            <ModalDeleteGroup
               open={isActiveModal1}
               handleClose={closeModalDeleteHandler}
               deleteCardHandler={deleteHandler}
               paragraph={`группу ${getGroupName}`}
            />
            <ModalGroup
               variant
               imageEditValue={imageEditValue}
               dateEditModal={dateEdit}
               openModal={isActiveModal2}
               onSubmit={saveHandler}
               handleClose={closeModalEditHandler}
               onDateChange={setDateEdit}
               register={register}
               onImageUpload={onImageUpload}
               errors={errors}
               handleSubmit={handleSubmit}
               setValue={setValue}
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
const ContainerNotFound = styled('div')`
   margin: 0 auto;
`
