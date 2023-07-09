import {
   Checkbox,
   FormControl,
   FormControlLabel,
   FormGroup,
   Radio,
   RadioGroup,
   styled,
} from '@mui/material'

export const CheckBox = ({
   type,
   valueRadio,
   valueCheck,
   label,
   disabled,
   variant,
   onClick,
   labelOne,
   labelTwo,
}) => {
   const handleCheckboxClick = (event) => {
      if (onClick) {
         onClick(event.target.checked)
      }
   }
   return (
      <div>
         {(() => {
            switch (type) {
               case 'radio':
                  return (
                     <FormControl>
                        <RadioGroup
                           aria-labelledby="demo-radio-buttons-group-label"
                           defaultValue={valueRadio}
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
                  )
               case 'checkbox':
                  return (
                     <FormGroup>
                        <CheckBoxStyled
                           control={
                              <Checkbox
                                 checked={valueCheck}
                                 onChange={handleCheckboxClick}
                              />
                           }
                           label={label}
                           disabled={disabled}
                           variant={variant}
                        />
                     </FormGroup>
                  )
               default:
                  return null
            }
         })()}
      </div>
   )
}

const CheckBoxStyled = styled(FormControlLabel)(({ variant }) => {
   return {
      '& .css-i4bv87-MuiSvgIcon-root': {
         color: (() => {
            switch (variant) {
               case 'black':
                  return '#000'
               case 'outlined':
                  return '#3772FF'
               case 'contained':
                  return '#1F6ED4'
               case 'disabled':
                  return '#1c1b1f8f'
               default:
                  return ''
            }
         })(),
      },
   }
})
