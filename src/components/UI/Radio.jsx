import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'

export const MyRadio = ({ value, label, onChange }) => {
   const handleChange = (event) => {
      if (onChange) {
         onChange(event.target.value)
      }
   }

   return (
      <div>
         <FormControl>
            <RadioGroup
               aria-labelledby="demo-radio-buttons-group-label"
               defaultValue={value}
               name="radio-buttons-group"
               onChange={handleChange}
            >
               <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={label}
               />
            </RadioGroup>
         </FormControl>
      </div>
   )
}
