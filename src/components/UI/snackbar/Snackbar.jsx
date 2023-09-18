import React from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { styled } from '@mui/material'
import { BiSolidErrorCircle } from 'react-icons/bi'
import { HiCheckCircle } from 'react-icons/hi'

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

const CustomSnackbar = styled('div')`
   border-radius: 8px;
   background: ${({ status }) =>
      status === 'success' ? '#36AC0C' : '#C91E1E'};
   color: white;
   display: flex;
   padding-left: 1rem;
   flex-direction: row-reverse;
   justify-content: end;
   align-items: center;
   height: 60px;
   gap: 1rem;
   cursor: pointer;
`

export const showSnackbar = (message, status) => {
   const icons = status === 'success' ? <SuccessIcon /> : <ErrorIcon />

   const id = toast(
      () => (
         <CustomSnackbar status={status} onClick={() => toast.dismiss(id)}>
            {icons}
            {message}
         </CustomSnackbar>
      ),
      {
         style: {
            borderRadius: '8px',
            background: status === 'success' ? '#36AC0C' : '#C91E1E',
            color: 'white',
            padding: 0,
            height: '60px',
         },
         position: 'top-right',
         duration: 3000,
      }
   )
}

const Snackbar = () => {
   return <Toaster />
}

export default Snackbar
