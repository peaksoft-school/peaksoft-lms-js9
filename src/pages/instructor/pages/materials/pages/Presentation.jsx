import { styled } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPresentationLesson } from '../../../../../store/studentLayout/studentLayoutThunk'
import { NotFound } from '../../../../../components/UI/not-found/NotFound'
import { Isloading } from '../../../../../components/UI/snackbar/Isloading'

export const PresentationIns = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const { presentation, isLoading } = useSelector(
      (state) => state.studentLayout
   )

   useEffect(() => {
      dispatch(getPresentationLesson(+params.lessonid))
   }, [])

   return (
      <>
         {isLoading && <Isloading />}
         <ContainerItem>
            {presentation.length > 0 ? (
               presentation.map((el) => (
                  <ContainerContent key={el.id}>
                     <div>
                        <object
                           data={el.linkFilePpt}
                           type="application/pdf"
                           width="100%"
                           height="100%"
                        >
                           <p>
                              Ваш браузер не поддерживает просмотр PDF. Вы
                              можете
                              <a href={el.linkFilePpt}>скачать PDF</a>
                              вместо этого.
                           </p>
                        </object>
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
const ContainerNotFound = styled('div')`
   margin: 0 auto;
`
const ContainerContent = styled('div')`
   div {
      width: 50vw;
      height: 58.5vh;
   }
   main {
      margin: 2rem 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
   }
`
