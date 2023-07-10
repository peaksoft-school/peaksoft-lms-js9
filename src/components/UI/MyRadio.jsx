import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'

export const MyRadio = ({ value, labelOne, labelTwo }) => {
   return (
      <div>
         <FormControl>
            <RadioGroup
               aria-labelledby="demo-radio-buttons-group-label"
               defaultValue={value}
               name="radio-buttons-group"
            >
               <FormControlLabel
                  value="one"
                  control={<Radio />}
                  label={labelOne}
               />
               <FormControlLabel
                  value="two"
                  control={<Radio />}
                  label={labelTwo}
               />
            </RadioGroup>
         </FormControl>
      </div>
   )
}
