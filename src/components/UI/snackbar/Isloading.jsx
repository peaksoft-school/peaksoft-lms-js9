import React from 'react'
import { PulseLoader } from 'react-spinners'
import { Box, styled } from '@mui/material'

export const Isloading = () => {
   return (
      <Container>
         <IsLoading>
            <PulseLoader color="#3772FF" />
         </IsLoading>
      </Container>
   )
}
const IsLoading = styled(Box)`
   position: fixed;
   z-index: 1000;
   top: 50%;
   left: 47%;
   transform: translateX(-50%);
   .MuiBox-root css-1y9m79x {
      div {
         span {
            span {
               width: 200px;
            }
         }
      }
   }
`
const Container = styled('div')(() => ({
   backgroundColor: '#0e09093a',
   width: '100%',
   height: '100vh',
   position: 'absolute',
   top: '0',
   left: '0',
   bottom: '0',
   right: '0',
   zIndex: '999',
   backdropFilter: 'blur(2px)',
}))
