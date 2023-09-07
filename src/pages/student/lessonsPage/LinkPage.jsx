import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material'
import { useParams } from 'react-router-dom'
import { getLinkLesson } from '../../../store/studentLayout/studentLayoutThunk'
import { NotFound } from '../../../components/UI/not-found/NotFound'

export const LinkPage = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const { links } = useSelector((state) => state.studentLayout)

   useEffect(() => {
      dispatch(getLinkLesson(+params.lessonId))
   }, [])

   return (
      <div>
         {links && links.length > 0 ? (
            <ContainerMap>
               {links?.map((el) => (
                  <ContentContainer key={el.id} target="_blank" href={el.link}>
                     {el.text}
                  </ContentContainer>
               ))}
            </ContainerMap>
         ) : (
            <ContainerNotFound>
               <NotFound content="Нет ссылок!" />
            </ContainerNotFound>
         )}
      </div>
   )
}

const ContainerMap = styled('div')`
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
`

const ContentContainer = styled('a')`
   flex-basis: calc(50% - 10px);
   height: 4rem;
   background-color: #bfd3f86e;
   border-radius: 5px;
   padding: 20px;
   cursor: pointer;
   border: 1px solid #d4d4d4;
   a {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
   }
`

const ContainerNotFound = styled('div')`
   margin: 0 auto;
`
