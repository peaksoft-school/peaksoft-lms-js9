import React from 'react'
import { styled } from '@mui/material'
import { Modal } from '../../../components/UI/modal/Modal'
import { NotFound } from '../../../components/UI/not-found/NotFound'

export const NotificationModal = ({ open, handleClose, data }) => {
   return (
      <Modal video open={open} handleClose={handleClose}>
         <Container>
            <ModalStyled>
               <header>
                  <h3>Ваши уведомления</h3>
               </header>
               <main>
                  {data && data.length > 0 ? (
                     data.map((el) => (
                        <NotificationItem>
                           <h4>{el.title}</h4>
                           <p>{el.who}</p>
                           <p>{el.date}</p>
                        </NotificationItem>
                     ))
                  ) : (
                     <ContainerNotFound>
                        <NotFound />
                        <h2>Пока нет уведомлений</h2>
                     </ContainerNotFound>
                  )}
               </main>
            </ModalStyled>
         </Container>
      </Modal>
   )
}

const Container = styled('div')`
   overflow: hidden;
   height: 60vh;
   width: 25vw;
   border-radius: 0.6rem;
`

const ModalStyled = styled('div')`
   overflow-y: scroll;
   height: 60vh;
   header {
      position: fixed;
      border-bottom: 1px solid #d4d4d4;
      background-color: #fff;
      width: 100%;
      border-top-left-radius: 0.6rem;
      border-top-right-radius: 0.6rem;
      h3 {
         margin: 1rem;
         color: #727272;
      }
   }
   main {
      margin-top: 4rem;
   }
`

const NotificationItem = styled('div')`
   background-color: rgb(224, 229, 246);
   height: 7rem;
   padding: 1rem 0.8rem;
   margin-top: 0.2rem;
   display: flex;
   flex-direction: column;
   gap: 0.5rem;
   &:last-child {
      margin-bottom: 1rem;
   }
`
const ContainerNotFound = styled('div')`
   margin: 0 auto;
   text-align: center;
   h2 {
      font-size: 2vh;
   }
`
