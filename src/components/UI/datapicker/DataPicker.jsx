import React from 'react'
import { styled } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

export default function BasicDatePicker({ onDateChange, value }) {
   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <StyledDatePicker
            value={value}
            onChange={onDateChange}
            renderInput={(props) => <input {...props} />}
         />
      </LocalizationProvider>
   )
}
const StyledDatePicker = styled(DatePicker)(({ theme, value }) => ({
   '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      height: '2.5rem',
      borderColor: 'blue',
   },
   '& .css-r28ubj-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline':
      {
         borderColor: 'rgba(0, 0, 0, 0.23)',
      },
   '& .MuiInputBase-input': {
      padding: theme.spacing(1),
      fontStyle: 'normal',
      color: value ? '#000' : '#8D949E',
      width: '5.53vw',
      fontSize: '0.9rem',
      borderRadius: '12px',
   },
   '&& :': {
      border: 'none',
   },
}))
