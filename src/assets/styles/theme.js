import { createTheme } from '@mui/material'

export const theme = createTheme({
   palette: {
      primary: {
         main: '#EFF0F4',
         light: '#ffffff',
         blue: '#1F6ED4',
      },
      secondary: {
         main: '#C91E1E',
         light: '#D4D4D4',
         pink: '#FA2B56',
         green: '#36AC0C',
         border: '#BFC4CE',
         borderSelect: '#EBEBEB',
      },
      error: {
         main: '#C91E1E',
      },
      success: {
         main: '#36AC0C',
      },
   },
   typography: {
      fontFamily: 'Open Sans',
   },
})
