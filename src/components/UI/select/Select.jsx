import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import styled from '@emotion/styled'
import { InputLabel } from '@mui/material'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.6 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
}

const MultiSelect = ({ array, value = [], onChange, ...rest }) => {
   const handleChange = (event) => {
      const selectedValues = event.target.value
      onChange(selectedValues)
   }

   return (
      <FormControl sx={{ m: 1 }}>
         <InputLabel id="select-label">Назначить учителя</InputLabel>
         <Select
            sx={{ padding: '1.5rem 0' }}
            multiple
            id="select-label"
            label="Назначить учителя"
            value={value}
            onChange={handleChange}
            renderValue={(selected) => (
               <div>
                  {selected
                     .map((id) => {
                        const selectedItem = array.find(
                           (item) => item.id === id
                        )
                        return selectedItem ? selectedItem.fullName : ''
                     })
                     .join(', ')}
               </div>
            )}
            MenuProps={MenuProps}
            {...rest}
         >
            {array?.map((item) => (
               <MenuItem key={item.id} value={item.id}>
                  <Checkbox checked={value.indexOf(item.id) > -1} />
                  <StyledListItem primary={item.fullName} />
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   )
}
export default MultiSelect

const StyledListItem = styled(ListItemText)(() => ({
   '&:hover': {
      color: '#1A237E',
   },
}))
