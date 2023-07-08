import React from 'react'
import { Button, styled } from '@mui/material'

export const IconButton = ({ children, variant, onClick }) => {
   return (
      <StyledButton variant={variant} onClick={onClick}>
         {children}
      </StyledButton>
   )
}

const StyledButton = styled(Button)(({ variant }) => {
   switch (variant) {
      case 'round':
         return {
            '&.MuiButton-root': {
               backgroundColor: '#FA2B56',
               color: 'white',
               borderRadius: '50%',
               padding: '22px 22px',
               '&:hover': {
                  backgroundColor: '#EF0B3B',
               },
               '&:active': {
                  backgroundColor: '#EB4366',
               },
               '&:disabled': {
                  backgroundColor: '#1C1B1F 12 %',
               },
            },
         }
      default:
         break
   }
   return {}
})
