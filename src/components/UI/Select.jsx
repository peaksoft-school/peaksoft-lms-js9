import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import styled from '@emotion/styled'

const ReusableSelect = ({ label, options, value, onChange }) => {
   return (
      <FormControl fullWidth>
         <InputLabel>{label}</InputLabel>
         <StyledSelect value={value} onChange={onChange}>
            {options.map((option) => (
               <StyledMenuItem key={option.value} value={option.value}>
                  {option.label}
               </StyledMenuItem>
            ))}
         </StyledSelect>
      </FormControl>
   )
}
export default ReusableSelect

const StyledSelect = styled(Select)(() => ({
   borderRadius: '10px',
}))

const StyledMenuItem = styled(MenuItem)(() => ({
   boxSizing: 'border-box',
   left: '0.5px',
   border: '1px solid #ececec',
   ':focus': {
      backgroundColor: 'rgba(26, 35, 126, 0.07)',
      color: '#3772FF',
   },
}))
