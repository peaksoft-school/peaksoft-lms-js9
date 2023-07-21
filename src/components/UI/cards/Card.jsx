import * as React from 'react'
import { styled } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import MeatBall from '../meatBall/MeatBall'

const menuItems = []

export const Card = ({ el, onClick }) => {
   const getMenuIdAndSetCardId = (menuID) => {
      onClick({ menuId: menuID, cardId: el.id })
   }
   return (
      <ContainerCard>
         <Link to={`${el.title}`}>
            <ContainerImg>
               <img src={el.img} alt="groupfoto" />
            </ContainerImg>
            <ContainerContent>
               <ContainerHeader>
                  <p>{el.title}</p> <span>{el.date}</span>
               </ContainerHeader>
               <ContainerDescriptionStyled>
                  {el.description}
               </ContainerDescriptionStyled>
            </ContainerContent>
         </Link>
         <ContainerFooter>
            <MeatBall onClick={getMenuIdAndSetCardId} menuItems={menuItems} />
         </ContainerFooter>
      </ContainerCard>
   )
}

const ContainerCard = styled(Link)(() => ({
   width: '270px',
   height: '321px',
   flexShrink: 0,
   borderRadius: '0.625rem',
   border: '1px solid #D4D4D4',
   background: '#FFF',
   margin: '20px 0',
}))
const ContainerDescriptionStyled = styled('div')`
   height: 65px;
   overflow: hidden;
`

const ContainerImg = styled('div')`
   border-radius: 0.625rem 0.625rem 0rem 0rem;
   display: flex;
   justify-content: center;
   overflow: hidden;
   img {
      height: 171px;
   }
`

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
      padding: '0',
      margin: '-25px 5px',
   },
}))
