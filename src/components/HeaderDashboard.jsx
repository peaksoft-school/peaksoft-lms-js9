import styled from '@emotion/styled'
import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

export const HeaderDashboard = () => {
   const [state, setState] = useState('wergre')

   const handleChange = (event) => {
      setState(event.target.value)
   }
   return (
      <Box>
         <FormControl fullWidth>
            <SelectStyled
               name="select"
               value={state}
               onChange={handleChange}
               displayEmpty
               defaultValue={state} // Добавленное значение по умолчанию
            >
               <MenuItem value="" disabled>
                  ghrthtr
               </MenuItem>
               <MenuItem value={10}>Ten</MenuItem>
            </SelectStyled>
         </FormControl>
      </Box>
   )
}

const SelectStyled = styled(Select)(() => ({
   width: '13.3rem',
   height: '2.8rem',
}))
