import React, { useState } from 'react'
import { styled } from '@mui/material'
import { cardsGroup } from '../../../../utils/constants/cardsGroup'
import { Card } from '../../../../components/UI/cards/Card'
import { ModalDeleteGroup } from '../groups-modal/ModalDeleteGroup'
import { Header } from '../../../../components/UI/header/Header'
import { ModalGroup } from '../groups-modal/ModalGroup'
import { useToggle } from '../../../../utils/hooks/general'

export const Groups = ({ openModal }) => {
   const [todos, setTodos] = useState(cardsGroup)
   const [getCardId, setCardId] = useState(null)
   const [dateEditModal, setDateEditModal] = useState('')
   const [editTitle, setEditTitle] = useState('')
   const [editDescription, setEditDescription] = useState('')
   const { setActive: setActiveModal1, isActive: isActiveModal1 } = useToggle(
      'modal1',
      false
   )
   const { setActive: setActiveModal2, isActive: isActiveModal2 } = useToggle(
      'modal2',
      false
   )

   const editHandler = (data) => {
      setActiveModal2(!isActiveModal2)
      setEditTitle(data.title)
      setEditDescription(data.description)
   }
   const deleteHandler = (cardId) => {
      setActiveModal1(!isActiveModal1)
      setCardId(cardId)
   }

   const openModalDeleteAndEditHandler = ({ menuId, cardId, data }) => {
      if (menuId === 1) {
         editHandler(data)
      } else if (menuId === 2) {
         deleteHandler(cardId)
      }
   }

   const closeModalDeleteHandler = () => {
      setActiveModal1('')
   }
   const closeModalEditHandler = () => {
      setActiveModal2('')
   }
   const deleteCardHandler = () => {
      setTodos(todos.filter((el) => el.id !== getCardId))
      closeModalDeleteHandler()
   }

   const editTitleChangeHandler = (e) => setEditTitle(e.target.value)
   const editDesciptionChangeHandler = (e) => setEditDescription(e.target.value)

   const saveHandler = () => {
      const data = {
         editTitle,
         editDescription,
      }
      console.log(data)
   }
   return (
      <>
         <Header
            titlePage="Администратор"
            buttonContent="Создать группу"
            onClick={openModal}
         />
         <ContainerItem>
            {todos.map((el) => {
               return (
                  <Card
                     key={el.id}
                     el={el}
                     onClick={openModalDeleteAndEditHandler}
                  />
               )
            })}
         </ContainerItem>
         <div>
            <ModalDeleteGroup
               open={isActiveModal1}
               handleClose={closeModalDeleteHandler}
               deleteCardHandler={deleteCardHandler}
            />

            <ModalGroup
               variant
               openModal={isActiveModal2}
               handleClose={closeModalEditHandler}
               onDateChange={setDateEditModal}
               value={dateEditModal}
               onSubmit={saveHandler}
               editTitleChangeHandler={editTitleChangeHandler}
               editDesciptionChangeHandler={editDesciptionChangeHandler}
               editDescription={editDescription}
               editTitle={editTitle}
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
