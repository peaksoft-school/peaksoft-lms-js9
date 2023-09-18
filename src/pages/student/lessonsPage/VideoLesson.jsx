import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material'
import { useParams } from 'react-router-dom'
import { getVideoLesson } from '../../../store/studentLayout/studentLayoutThunk'
import { NotFound } from '../../../components/UI/not-found/NotFound'
import { Button } from '../../../components/UI/button/Button'
import { useToggle } from '../../../utils/hooks/general'
import { Modal } from '../../../components/UI/modal/Modal'

export const VideoLesson = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const { video } = useSelector((state) => state.studentLayout)
   const { isActive, setActive } = useToggle('videoopenmodal')

   useEffect(() => {
      dispatch(getVideoLesson(+params.lessonId))
   }, [])

   return (
      <div>
         <ContainerItem>
            {video.length > 0 ? (
               video?.map((el) => (
                  <ContainerContent key={el.id}>
                     <header>
                        {!isActive ? (
                           <СontainerPlayer>
                              <ReactPlayer
                                 url={el.link}
                                 controls={Boolean(true)}
                                 width="360px"
                                 height="210px"
                              />
                              <div>
                                 <Button onClick={() => setActive(!isActive)}>
                                    Смотреть
                                 </Button>
                              </div>
                           </СontainerPlayer>
                        ) : (
                           <Modal
                              video
                              open={isActive}
                              handleClose={() => setActive('')}
                           >
                              <ReactPlayer
                                 url={el.link}
                                 controls={Boolean(true)}
                                 width="65.5vw"
                                 height="76.5vh"
                              />
                           </Modal>
                        )}
                     </header>
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
      </div>
   )
}

const СontainerPlayer = styled('div')`
   position: relative;
   div {
      position: absolute;
      background-color: #00000062;
   }
   Button {
      top: 38%;
      left: 34%;
      z-index: 9;
      height: 3.1rem;
   }
`
const ContainerItem = styled('div')`
   display: flex;
   flex-direction: column;
   gap: 50px;
`
const ContainerNotFound = styled('div')`
   margin: 0 auto;
`
const ContainerContent = styled('div')`
   display: flex;
   gap: 20px;
   background-color: #eff0f4;
   padding: 20px 10px;
   border-radius: 10px;
   width: 100%;
   height: auto;
   div {
      width: 360px;
      height: 210px;
   }
   main {
      margin-top: 1rem;
   }
`
