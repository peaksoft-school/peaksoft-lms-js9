import { Button, styled } from '@mui/material'
import React from 'react'

const BUTTON_VARIANTS = {
   danger: {
      default: '#C91E1E',
      active: '#E13A3A',
      hover: '#B62727',
   },
   contained: {
      default: '#3772FF',
      active: '#6190FF',
      hover: '#1D60FF',
   },
   outlined: {
      default: '#fff',
      active: '#6190FF 30 %',
      hover: '#1D60FF 10 %',
      color: '#3772FF',
   },
}

const getStylesByVariant = (variant = 'contained') => {
   const {
      color,
      default: defaultBgColor,
      hover,
      active,
      ...restStyles
   } = BUTTON_VARIANTS[variant] || {}
   return {
      color: color || '#fff',
      backgroundColor: defaultBgColor,
      '&:hover': {
         backgroundColor: hover,
      },
      '&:active': {
         backgroundColor: active,
      },
      ...restStyles,
   }
}

export const MyButton = ({ variant, children, onClick, ...props }) => {
   return (
      <StyledButton
         variant={variant}
         {...props}
         onClick={onClick}
         classes={{ disabled: 'custom_disabled' }}
      >
         {children}
      </StyledButton>
   )
}
const StyledButton = styled(Button)(({ variant }) => {
   const commonStyles = {
      borderRadius: '8px',
      padding: '10px 24px',
   }
   const stylesByVariant = getStylesByVariant(variant)
   return {
      ...commonStyles,
      ...stylesByVariant,
      '&.custom_disabled': {
         backgroundColor: '#1C1B1F 12 %',
         cursor: 'not-allowed',
         color: '#1C1B1F',
         border: 'none',
      },
   }
})
