import React from 'react'
import { styled } from '@mui/material'
import Search from '../../../assets/image/Magnifying-Glass-search.png'

export const NotFound = ({ content }) => {
   return (
      <Container>
         <img src={Search} alt="notfound" />
         <h2>{content}</h2>
      </Container>
   )
}
const Container = styled('div')`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   img {
      width: 20vw;
      position: relative;
   }
   h2 {
      position: absolute;
      font-size: 1.5vw;
      margin-top: 25%;
   }
`
