import React, { useEffect } from 'react'
import { styled } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getGetByIdTaskLesson } from '../../../../../store/studentLayout/studentLayoutThunk'
import { Isloading } from '../../../../../components/UI/snackbar/Isloading'

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
            <ContainerContent>
               <h2>{el.taskName}</h2>
               <a target="_blank" rel="noopener noreferrer" href={el.fileName}>
                  {el.fileName}
               </a>
               <div>
                  <p>{el.text}</p>
               </div>
            </ContainerContent>
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
   display: flex;
   flex-direction: column;
   gap: 1rem;
   a {
      color: #3772ff;
      text-decoration: underline;
   }
   h2 {
      color: #212121;
      font-weight: 400;
      font-size: 20;
   }
   div {
      background-color: #eff0f4;
      border-radius: 10px;
      padding: 20px;
   }
`
