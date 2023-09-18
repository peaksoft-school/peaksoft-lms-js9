/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material'
import { useParams } from 'react-router-dom'
import { getPresentationLesson } from '../../../store/studentLayout/studentLayoutThunk'
import { NotFound } from '../../../components/UI/not-found/NotFound'
import { Button } from '../../../components/UI/button/Button'
import { useToggle } from '../../../utils/hooks/general'
import { Modal } from '../../../components/UI/modal/Modal'

export const Presentation = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const { isActive, setActive } = useToggle('')
   const { presentation } = useSelector((state) => state.studentLayout)

   useEffect(() => {
      dispatch(getPresentationLesson(+params.lessonId))
   }, [])

   return (
      <div>
         <ContainerItem>
            {presentation.length > 0 ? (
               presentation.map((el, i) => (
                  <ContainerContent key={i}>
                     <div>
                        {isActive && (
                           <Modal
                              video
                              open={isActive}
                              handleClose={() => setActive('')}
                           >
                              <iframe
                                 width="960px"
                                 height="510px"
                                 src={el.linkFilePpt}
                                 title="presentation"
                              >
                                 #document
                              </iframe>
                           </Modal>
                        )}
                        <ContainerPpt>
                           <object
                              data={el.linkFilePpt}
                              type="application/pdf"
                              width="360px"
                              height="210px"
                           >
                              <p>
                                 Ваш браузер не поддерживает просмотр PDF. Вы
                                 можете
                                 <a href={el.linkFilePpt}>скачать PDF</a>
                                 вместо этого.
                              </p>
                           </object>
                           <Button onClick={() => setActive(!isActive)}>
                              Смотреть
                           </Button>
                        </ContainerPpt>
                     </div>
                     <main>
                        <h2>{el.name}</h2>
                        <p>{el.description}</p>
                     </main>
                  </ContainerContent>
               ))
            ) : (
               <ContainerNotFound>
                  <NotFound content="Нет презентаций!" />
               </ContainerNotFound>
            )}
         </ContainerItem>
      </div>
   )
}

const ContainerPpt = styled('div')`
   width: 360px;
   height: 210px;
   background-color: #fff;
   border-radius: 10px;
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   object {
      border-radius: 8px;
   }
   Button {
      position: absolute;
      background-color: #2945e2a9;
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
   main {
      margin-top: 1rem;
   }
`
