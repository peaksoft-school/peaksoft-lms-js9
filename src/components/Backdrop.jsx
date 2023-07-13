import styled from '@emotion/styled'
import { Box, Modal } from '@mui/material'

export const Backdrop = ({ open, onClose, children }) => {
   return (
      <ModalStyled
         open={open}
         onClose={onClose}
         aria-labelledby="modal-title"
         aria-describedby="modal-description"
      >
         <Container>{children}</Container>
      </ModalStyled>
   )
}

const Container = styled(Box)(() => ({
   marginLeft: '1.25rem',
   marginRight: '2.5rem',
   marginTop: '4.69rem',
}))

const ModalStyled = styled(Modal)(() => ({
   backgroundColor: '#EFF0F4',
}))
