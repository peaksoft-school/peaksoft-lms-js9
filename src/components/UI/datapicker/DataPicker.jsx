import React from 'react'
import { styled } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

export default function BasicDatePicker({ onDateChange, value }) {
   const changeDatePicker = (newDate) => {
      onDateChange(newDate)
      onDateChange('')
   }
   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <StyledDatePicker
            value={value}
            onChange={changeDatePicker}
            renderInput={(props) => <input {...props} />}
         />
      </LocalizationProvider>
   )
}
const StyledDatePicker = styled(DatePicker)(({ theme, value }) => ({
   '& .css-r28ubj-MuiInputBase-root-MuiOutlinedInput-root': {
      borderRadius: '10px',
      height: '4.5vh',
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
      color: 'red',
   },
}))
