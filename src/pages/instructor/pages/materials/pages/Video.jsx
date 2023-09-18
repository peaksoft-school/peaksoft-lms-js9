import React, { useEffect } from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { getVideoLesson } from '../../../../../store/studentLayout/studentLayoutThunk'
import { NotFound } from '../../../../../components/UI/not-found/NotFound'
import { Isloading } from '../../../../../components/UI/snackbar/Isloading'

export const Video = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const { video, isLoading } = useSelector((state) => state.studentLayout)

   useEffect(() => {
      dispatch(getVideoLesson(+params.lessonid))
   }, [])

   return (
      <>
         {isLoading && <Isloading />}
         <ContainerItem>
            {video.length > 0 ? (
               video?.map((el) => (
                  <ContainerContent key={el.id}>
                     <ReactPlayer
                        url={el.link}
                        controls={Boolean(true)}
                        width="50vw"
                        height="58.5vh"
                     />
                     <main>
                        <h2>{el.name}</h2>
                        <p>{el.description}</p>
                     </main>
                  </ContainerContent>
               ))
            ) : (
               <ContainerNotFound>
                  <NotFound content="Нет видеоуроков!" />
               </ContainerNotFound>
            )}
         </ContainerItem>
      </>
   )
}
const ContainerItem = styled('div')`
   background-color: #fff;
   padding: 20px;
   border-radius: 0.8rem;
   position: absolute;
   right: 1%;
   left: 16rem;
   bottom: 1%;
   top: 7rem;
`
const ContainerContent = styled('div')`
   main {
      margin: 2rem 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
   }
`

const ContainerNotFound = styled('div')`
   margin: 0 auto;
`
