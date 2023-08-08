import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { BiSolidErrorCircle } from 'react-icons/bi'
import { HiCheckCircle } from 'react-icons/hi'
import { styled } from '@mui/material'

const ErrorIcon = styled(BiSolidErrorCircle)`
   font-size: 1.5rem;
   margin-top: 2px;
   margin-right: 3px;
`

const SuccessIcon = styled(HiCheckCircle)`
   font-size: 1.5rem;
   margin-top: 2px;
   margin-right: 3px;
`

const showSnackbar = (myFetch, succesMessage, errorMessage) => {
   toast.promise(
      myFetch,
      {
         loading: 'Loading',
         success: succesMessage,
         error: errorMessage,
      },
      {
         style: {
            minWidth: '250px',
         },
         success: {
            style: {
               background: '#36AC0C',
               color: 'white',
               display: 'flex',
               flexDirection: 'row-reverse',
               justifyContent: 'center',
               alignItems: 'center',
            },

            icon: <SuccessIcon />,
         },
         error: {
            style: {
               display: 'flex',
               flexDirection: 'row-reverse',
               justifyContent: 'center',
               alignItems: 'center',
               background: '#C91E1E',
               color: 'white',
            },
            icon: <ErrorIcon />,
         },
      }
   )
}

const Snackbar = () => {
   const handleButtonClick = () => {
      showSnackbar('loading...', 'success!', 'error message')
   }

   return (
      <div>
         <button type="submit" onClick={handleButtonClick}>
            Show Snackbar
         </button>
         <Toaster />
      </div>
   )
}

export default Snackbar
