import { BiSolidErrorCircle } from 'react-icons/bi'
import { HiCheckCircle } from 'react-icons/hi'

import React from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { styled } from '@mui/material'

export const showSnackbar = (message, status) => {
   const icons = status === 'success' ? <SuccessIcon /> : <ErrorIcon />

   toast(message, {
      icon: icons,
      style: {
         borderRadius: '8px',
         background: status === 'success' ? '#36AC0C' : '#C91E1E',
         color: 'white',
         minWidth: '250px',
         display: 'flex',
         flexDirection: 'row-reverse',
         justifyContent: 'center',
         alignItems: 'center',
      },
      position: 'top-right',
      closeOnClick: true,
      pauseOnHover: true,
   })
}

const Snackbar = () => {
   return <Toaster />
}

export default Snackbar
const SuccessIcon = styled(HiCheckCircle)`
   font-size: 1.5rem;
   margin-top: 2px;
   margin-right: 3px;
`
const ErrorIcon = styled(BiSolidErrorCircle)`
   font-size: 1.5rem;
   margin-top: 2px;
   margin-right: 3px;
`
