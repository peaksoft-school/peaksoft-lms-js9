import React, { forwardRef } from 'react'
import { TextField } from '@mui/material'
import styled from '@emotion/styled'

export const Input = forwardRef(
   ({ placeholder, size, onChange, type, value, error, ...rest }, ref) => {
      return (
         <div>
            <TextInput
               size={size}
               value={value}
               onChange={onChange}
               variant="outlined"
               type={type}
               placeholder={placeholder}
               ref={ref}
               error={Boolean(error)}
               {...rest}
            />
         </div>
      )
   }
)

const TextInput = styled(TextField)`
   fieldset {
      border-radius: 10px;
      padding: 10px 8px 10px 18px;
   }
   input:focus {
      border-radius: 10px;
      border: none;
   }
   input:invalid {
      border-radius: 10px;
      border: 2px solid #c91e1e;
   }
`
