import React from 'react'
import { styled } from '@mui/material'
import { Modal } from '../../../components/UI/modal/Modal'

export const NotificationModal = ({ open, handleClose, data }) => {
   return (
      <Modal video open={open} handleClose={handleClose}>
         <Container>
            <ModalStyled>
               <header>
                  <h3>Ваши уведомления</h3>
               </header>
               <div>
                  {data?.map((el) => (
                     <main>
                        <h4>{el.title}</h4>
                        <p>{el.who}</p>
                        <p>{el.date}</p>
                     </main>
                  ))}
               </div>
            </ModalStyled>
         </Container>
      </Modal>
   )
}
const Container = styled('div')`
   overflow: hidden;
   height: 30rem;
   border-radius: 0.6rem;
`
const ModalStyled = styled('div')`
   overflow-y: scroll;
   height: 30rem;
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
   div {
      margin-top: 4rem;
   }
   main {
      background-color: rgb(224, 229, 246);
      width: 25rem;
      height: 7rem;
      padding: 1rem 0.8rem;
      margin-top: 0.2rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      &:last-child {
         margin-bottom: 1rem;
      }
   }
`
