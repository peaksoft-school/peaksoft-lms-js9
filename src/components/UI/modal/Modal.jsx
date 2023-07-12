import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Modal as ModalUi, styled } from '@mui/material'

export const Modal = ({ minHeight, title, children }) => {
   const [open, setOpen] = React.useState(false)
   const handleOpen = () => setOpen(true)
   const handleClose = () => setOpen(false)

   return (
      <div>
         <Button onClick={handleOpen}>Open modal</Button>
         <ModalUi open={open} onClose={handleClose}>
            <StyledModal minHeight={minHeight}>
               <Header>
                  <p>{title}</p>
               </Header>
               <Content>{children}</Content>
            </StyledModal>
         </ModalUi>
      </div>
   )
}

const Header = styled('div')(() => ({
   width: '100%',
   height: ' 4.25rem',
   background: 'var(--button, #3772FF)',
   borderRadius: ' 0.625rem 0.625rem 0rem 0rem',
   padding: '0',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   p: {
      color: '#FFF',
      textAlign: 'center',
      fontSize: '1.25rem',
      fontWeight: '400',
   },
}))

const StyledModal = styled(Box)(() => ({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '33.8125rem',
   backgroundColor: '#fff',
   border: 'none',
   minHeight: '13.1875rem',
   borderRadius: '0.625rem',
}))
const Content = styled('div')(() => ({
   padding: '1rem 1.56rem 1.56rem 1.56rem',
}))
