import { createTheme } from '@mui/material'

export const theme = createTheme({
   palette: {
      primary: {
         main: '#1F6ED4',
         light: '#6190FF',
         dark: '#1D60FF',
      },
      error: {
         main: '#C91E1E',
         light: '#E13A3A',
         dark: '#B62727',
      },
      secondary: {
         main: '#D4D4D4',
         light: 'rgba(26, 35, 126, 0.07)',
         dark: '#b6b6b6',
      },
      success: {
         main: '#36AC0C',
         light: '#5ce457',
         dark: '#1b580f',
      },
      info: {
         main: '#FA2B56',
         light: 'rgba(235, 67, 102, 1)',
         dark: 'rgba(239, 11, 59, 1)',
      },
   },
   typography: {
      allVariants: {
         fontFamily: 'Open Sans',
         textTransform: 'none',
      },
      button: {
         textDecoration: 'none',
      },
   },
})
