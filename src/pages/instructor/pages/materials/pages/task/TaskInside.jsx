import React, { useEffect } from 'react'
import { styled } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getGetByIdTaskLesson } from '../../../../../../store/studentLayout/studentLayoutThunk'
import { Isloading } from '../../../../../../components/UI/snackbar/Isloading'

export const TaskInside = () => {
   const params = useParams()
   const dispatch = useDispatch()
   const { taskById: el, isLoading } = useSelector(
      (state) => state.studentLayout
   )

   useEffect(() => {
      dispatch(getGetByIdTaskLesson(+params.taskid))
   }, [])

   return (
      <>
         {isLoading && <Isloading />}
         <ContainerItem>
            <ContainerContent hasContent={el.text !== null || el.code !== null}>
               <header>
                  <h1>{el.taskName}</h1>
                  <main>
                     <h3>Дедлайн:</h3>
                     <h4>{el.deadline}</h4>
                  </main>
               </header>
               <a target="_blank" rel="noopener noreferrer" href={el.fileLink}>
                  {el.fileName}
               </a>
               <a target="_blank" rel="noopener noreferrer" href={el.link}>
                  {el.linkName}
               </a>
               <img src={el.image} alt="" />
               {el.text && (
                  <div>
                     <p>{el.text}</p>
                  </div>
               )}
               {el.code && (
                  <div>
                     <p>{el.code}</p>
                  </div>
               )}
            </ContainerContent>
         </ContainerItem>
      </>
   )
}
const ContainerItem = styled('div')`
   background-color: #fff;
   padding: 20px;
   border-radius: 0.8rem;
`
const ContainerContent = styled('div')`
   display: flex;
   flex-direction: column;
   gap: 1rem;
   header {
      display: flex;
      justify-content: space-between;
      main {
         display: flex;
         flex-direction: column;
         align-items: end;
         gap: 8px;
         h4 {
            color: red;
         }
      }
   }
   a {
      color: #3772ff;
      text-decoration: underline;
   }
   h1 {
      color: #000;
      font-weight: 600;
      font-size: 20;
   }
   div {
      background-color: ${(props) =>
         props.hasContent ? '#eff0f4' : 'transparent'};
      border-radius: 10px;
      padding: 20px;
   }
   img {
      width: 50%;
   }
`
