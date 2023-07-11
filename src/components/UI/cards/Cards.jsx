import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material'
import { cardsGroup } from '../../../utils/constants/cardsGroup'

export const Cards = () => {
   return (
      <ContainerCard>
         {cardsGroup.map((el) => (
            <>
               <ContainerImg image={el.img} />
               <ContainerContent>
                  <ContainerHeader>
                     <p>{el.title}</p> <span>{el.date}</span>
                  </ContainerHeader>
                  <div>{el.description}</div>
                  <ContainerFooter>
                     <img src={el.icon} alt={el.alt} />
                  </ContainerFooter>
               </ContainerContent>
            </>
         ))}
      </ContainerCard>
   )
}
const ContainerCard = styled(Card)(() => ({
   width: '16.875rem',
   minHeight: '19.4375rem',
   flexShrink: 0,
   borderRadius: '0.625rem',
   border: '1px solid #D4D4D4',
   background: '#FFF',
}))

const ContainerImg = styled(CardMedia)(() => ({
   width: '16.875rem',
   height: '10.6875rem',
   flexShrink: 0,
   borderRadius: '0.625rem 0.625rem 0rem 0rem',
   background: 'url(<path-to-image>), lightgray 50% / cover no-repeat',
}))

const ContainerContent = styled(CardContent)(() => ({
   paddingLeft: ' 1.12rem ',
   paddingRight: ' 1.12rem ',
   paddingTop: '1rem',
   div: {
      color: '#1D293F',
      fontFamily: 'Open Sans',
      fontSize: '1rem',
      fontStyle: ' normal',
      fontWeight: '400',
      lineHeight: '1.375rem   ',
   },
}))
const ContainerHeader = styled(Typography)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '0.50rem',
   p: {
      color: '#1D293F',
      fontFamily: 'Open Sans',
      fontSize: '1.125rem',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: 'normal',
   },
   span: {
      color: '#1D293F',
      textAlign: 'right',
      fontFamily: 'Open Sans',
      fontSize: '0.75rem',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '140.1%',
   },
}))
const ContainerFooter = styled(CardActions)(() => ({
   '&.MuiCardActions-root': {
      display: 'flex',
      justifyContent: 'end',
      paddingBottom: '0',
   },
}))
