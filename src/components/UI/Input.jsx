import React, { forwardRef } from 'react'
import { TextField } from '@mui/material'
import styled from '@emotion/styled'

export const Input = forwardRef((props, ref) => {
   const { placeholder, onChange, type, value, ...restprops } = props
   return (
      <div>
         <TextInput
            value={value}
            onChange={onChange}
            variant="outlined"
            fullWidth
            type={type}
            placeholder={placeholder}
            ref={ref}
            {...restprops}
         />
      </div>
   )
})

const TextInput = styled(TextField)((props) => ({
   input: {
      color: props.error ? '#f00' : '#757575',
   },
   'MuiOutlinedInput-root': {
      '&:hover fieldset': {
         borderColor: props.error ? '#f00' : '#3a10e5',
      },
   },
}))
