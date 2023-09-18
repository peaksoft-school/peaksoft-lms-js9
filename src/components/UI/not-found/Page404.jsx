import React from 'react'
import { styled } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Button } from '../button/Button'
import image404 from '../../../assets/image/404_illustration.png'

export const Page404 = () => {
   const navigate = useNavigate()
   const goBackHomeHandler = () => {
      navigate('/')
   }
   return (
      <Container>
         <div>
            <h1>Уупс этой страницы не существует</h1>
            <Button onClick={goBackHomeHandler} variant="outlined">
               Перейти на главную страницу
            </Button>
         </div>
         <img src={image404} alt="404image" />
      </Container>
   )
}
const Container = styled('div')`
   width: 100%;
   height: 100vh;
   background-color: #fff;
   display: flex;
   align-items: center;
   justify-content: space-around;
   div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      margin-left: 5rem;
   }
   img {
      width: 70rem;
   }
`
