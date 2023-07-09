import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { MdOutlineError } from 'react-icons/md'
import { HiCheckCircle } from 'react-icons/hi'
import { styled } from 'styled-components'

const ErrorIcon = styled(MdOutlineError)`
   font-size: 1.5rem;
   margin-left: 5px;
`
const SuccessIcon = styled(HiCheckCircle)`
   font-size: 1.5rem;
   margin-left: 5px;
`
const showSnackbar = (message, type = 'default') => {
   let icon = null

   switch (type) {
      case 'success':
         icon = <SuccessIcon />
         toast.success(
            <>
               {message} {icon}
            </>,
            {
               icon: false,
               style: {
                  background: '#36AC0C',
                  color: 'white',
                  fontFamily:
                     '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               },
            }
         )
         break
      case 'error':
         icon = <ErrorIcon />
         toast.error(
            <>
               {message} {icon}
            </>,
            {
               icon: false,
               style: {
                  background: '#C91E1E',
                  color: 'white',
                  fontFamily:
                     '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               },
            }
         )
         break
      default:
         toast(message)
         break
   }
}

const Snackbar = ({ message, severity }) => {
   const handleButtonClick = () => {
      showSnackbar(message, severity)
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
