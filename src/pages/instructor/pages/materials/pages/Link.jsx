import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { NotFound } from '../../../../../components/UI/not-found/NotFound'
import { getLinkLesson } from '../../../../../store/studentLayout/studentLayoutThunk'
import { Isloading } from '../../../../../components/UI/snackbar/Isloading'

export const LinkPageIns = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const { links, isLoading } = useSelector((state) => state.studentLayout)

   useEffect(() => {
      dispatch(getLinkLesson(params.lessonid))
   }, [])

   return (
      <>
         {isLoading && <Isloading />}
         <Container>
            {links && links.length > 0 ? (
               <ContainerMap>
                  {links?.map((el) => (
                     <ContentContainer
                        key={el.id}
                        target="_blank"
                        href={el.link}
                     >
                        {el.text}
                     </ContentContainer>
                  ))}
               </ContainerMap>
            ) : (
               <ContainerNotFound>
                  <NotFound content="Нет ссылок!" />
               </ContainerNotFound>
            )}
         </Container>
      </>
   )
}
const Container = styled('div')`
   background-color: #fff;
   padding: 20px;
   border-radius: 0.8rem;
   position: absolute;
   right: 1%;
   left: 16rem;
   bottom: 1%;
   top: 7rem;
`
const ContainerMap = styled('div')`
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
`

const ContentContainer = styled('a')`
   flex-basis: calc(50% - 10px);
   background-color: #bfd3f86e;
   border-radius: 5px;
   padding: 2rem;
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
