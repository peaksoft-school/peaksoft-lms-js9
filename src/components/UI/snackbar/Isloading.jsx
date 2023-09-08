import { Box, CircularProgress, styled } from '@mui/material'
import React from 'react'

export const Isloading = () => {
   return (
      <Container>
         <Box>
            <IsLoading />
         </Box>
      </Container>
   )
}
const IsLoading = styled(CircularProgress)`
   position: fixed;
   z-index: 1000;
   top: 50%;
   left: 50%;
   transform: translateX(-50%);
`
const Container = styled('div')(() => ({
   backgroundColor: '#0e09093a',
   width: '100%',
   height: '100vh',
   position: 'absolute',
   top: '0',
   left: '0',
   zIndex: '999',
   backdropFilter: 'blur(2px)',
}))
