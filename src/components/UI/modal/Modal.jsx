import { Box, Modal, styled } from '@mui/material'
import React from 'react'

export const ModalUi = ({ children, minHeight, width, ...rest }) => {
   return (
      <MyModal onClose={handleClose} open={open}>
         <ModalStyle minHeight={minHeight} width={width} {...rest}>
            {children}
         </ModalStyle>
      </MyModal>
   )
}
const ModalStyle = styled(Box)(({ width, minHeight, ...rest }) => ({
   position: 'fixed',
   left: '50%',
   backgroundColor: 'white',
   borderRadius: ' 0.625rem',
   zIndex: '30',
   width: width || rest,
   minHeight: minHeight || rest,
   top: '40%',
   transform: 'translate(-50%, -50%)',
   border: 'none',
}))
const MyModal = styled(Modal)(() => ({
   position: 'absolute',
   top: '0',
   left: '0',
   width: '100%',
   height: 'auto',
   backgroundColor: 'rgba(239, 230, 230, 0.464)',
   backdropFilter: 'blur(2px)',
   zIndex: '998',
}))
