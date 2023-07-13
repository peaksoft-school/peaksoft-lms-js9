import { Button as ButtonMUI, styled } from '@mui/material'
import React from 'react'

const BUTTON_VARIANTS = {
   danger: {
      default: '#C91E1E',
      active: '#E13A3A',
      hover: '#B62727',
      disabled: '#c6c5cb ',
   },
   contained: {
      default: '#3772FF',
      active: '#6190FF',
      hover: '#1D60FF',
      disabled: '#c6c5cb',
   },
   outlined: {
      default: '#fff',
      active: '#6190FF 30 %',
      hover: '#1D60FF 10 %',
      color: '#3772FF',
      disabled: '#fff',
   },
}

const getStylesByVariant = (variant = 'contained') => {
   const {
      color,
      default: defaultBgColor,
      hover,
      active,
      disabled,
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
      '&:disabled': {
         backgroundColor: disabled,
         border: '1px solid #c6c5cb',
      },
      ...restStyles,
   }
}

export const Button = ({ disabled, variant, children, onClick, ...props }) => {
   return (
      <StyledButton
         variant={variant}
         disabled={disabled}
         {...props}
         onClick={onClick}
      >
         {children}
      </StyledButton>
   )
}
const StyledButton = styled(ButtonMUI)(({ variant }) => {
   const commonStyles = {
      borderRadius: '8px',
      padding: '10px 24px',
   }
   const stylesByVariant = getStylesByVariant(variant)
   return {
      ...commonStyles,
      ...stylesByVariant,
   }
})
