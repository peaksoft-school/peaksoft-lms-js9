import React, { useState } from 'react'
import { styled } from '@mui/material'
import { ModalGroup } from './groups-modal/ModalGroup'
import { AdminRoutes } from '../../../routes/adminRoutes/AdminRoutes'
import { Sidebar } from '../../sidebar/Sidebar'
import { useToggle } from '../../../utils/hooks/general'

export const GroupAdminPage = () => {
   const { isActive, setActive } = useToggle('addedgroupmodal')
   const [dateValue, setDateValue] = useState(null)
   const [imageValue, setImageValue] = useState(null)
   const [description, setDescription] = useState('')
   const [title, setTitle] = useState('')

   const isFormEmpty =
      !title.trim() || !description.trim() || !dateValue || !imageValue

   const descriptionChangeHandler = (e) => {
      setDescription(e.target.value)
   }
   const titleChangeHandler = (e) => {
      setTitle(e.target.value)
   }
   const dateChangeHandler = (date) => {
      setDateValue(date)
   }
   const onImageUpload = (img) => {
      setImageValue(img)
   }
   const openModalAddedNewGroupHandler = () => {
      setActive(!isActive)
   }

   const closeModalAddedNewGroupHandler = () => {
      setActive('')
   }
   const addedNewGroupHandler = (e) => {
      e.preventDefault()
      const data = {
         title,
         description,
         date: dateValue.toString(),
         img: imageValue,
      }
      console.log(data)
      setTitle('')
      setDescription('')
      setDateValue(null)
      setImageValue(null)
   }

   return (
      <>
         <SidebarStyled>
            <Sidebar roles="admin" />
         </SidebarStyled>
         <ContainerModalGroup>
            <ModalGroup
               variant
               handleClose={closeModalAddedNewGroupHandler}
               openModal={isActive}
               onSubmit={addedNewGroupHandler}
               onDateChange={dateChangeHandler}
               value={dateValue}
               description={description}
               title={title}
               descriptionChangeHandler={descriptionChangeHandler}
               titleChangeHandler={titleChangeHandler}
               isFormEmpty={isFormEmpty}
               onImageUpload={onImageUpload}
            />

            <AdminRoutes
               openModal={openModalAddedNewGroupHandler}
               roles="admin"
            />
         </ContainerModalGroup>
      </>
   )
}

const SidebarStyled = styled('div')`
   position: fixed;
`
const ContainerModalGroup = styled('div')`
   margin-left: 13%;
   padding: 0 1.2rem;
`
