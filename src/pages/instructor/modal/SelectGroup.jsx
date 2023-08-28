import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

export const CustomSelect = ({
   options,
   selectedOption,
   handleSelectChange,
}) => {
   return (
      <FormControl fullWidth>
         <InputLabel id="select-label">Группы</InputLabel>
         <Select
            sx={{ borderRadius: '10px', padding: '0' }}
            labelId="select-label"
            id="select"
            value={selectedOption}
            label="Группа"
            onChange={handleSelectChange}
         >
            {options.map((option) => (
               <MenuItem key={option.id} value={option.id}>
                  {option.groupName}
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   )
}
