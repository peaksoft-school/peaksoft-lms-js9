import { IconButton, styled } from '@mui/material'
import React from 'react'

export const IconButtons = ({
   variant,
   children,
   onClick,
   disabled,
   ...restProps
}) => {
   return (
      <div>
         <StyledButton
            disabled={disabled}
            variant={variant}
            onClick={onClick}
            {...restProps}
         >
            {children}
         </StyledButton>
      </div>
   )
}
const StyledButton = styled(IconButton)(({ variant }) => {
   switch (variant) {
      case 'round':
         return {
            '&.MuiIconButton-root': {
               backgroundColor: '#FA2B56',
               color: 'white',
               borderRadius: '99%',
               padding: '15px',
               '&:hover': {
                  backgroundColor: '#EF0B3B',
               },
               '&:active': {
                  backgroundColor: '#EB4366',
               },
               '&:disabled': {
                  backgroundColor: '#c6c5cb',
                  color: '#9f9ea4',
               },
            },
         }
      default:
         break
   }
   return {}
})
