import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { styled } from '@mui/material'

export default function BasicDatePicker({ onDateChange, value }) {
   const changeDatePicker = (newDate) => {
      onDateChange(newDate)
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
   borderRadius: '10px',
   fontSize: '9px',
   width: '9.70vw',
   height: '2.73vw',
   flexShrink: '0',
   padding: 0,
   '& .MuiInputBase-input': {
      padding: theme.spacing(1),
      fontStyle: 'normal',
      color: value ? '#000' : '#8D949E',
      width: '5.53vw',
      fontSize: '0.84vw',
   },
}))
