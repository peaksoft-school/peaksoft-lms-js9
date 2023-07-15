import { Checkbox, FormControlLabel, FormGroup, styled } from '@mui/material'

export const CheckBox = ({ value, label, disabled, variant, onClick }) => {
   const handleCheckboxClick = (event) => {
      if (onClick) {
         onClick(event.target.checked)
      }
   }
   return (
      <FormGroup>
         <CheckBoxStyled
            control={
               <Checkbox checked={value} onChange={handleCheckboxClick} />
            }
            label={label}
            disabled={disabled}
            variant={variant}
         />
      </FormGroup>
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
