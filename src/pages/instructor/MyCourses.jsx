import React, { useEffect } from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getInstructor } from '../../store/instruc/instructorThunk'
import { Card } from '../../components/UI/cards/Card'
import { Header } from '../../components/UI/header/Header'
import { NotFound } from '../not-found/NotFound'
import { Isloading } from '../../components/UI/snackbar/Isloading'

export const MyCoursesIns = () => {
   const dispatch = useDispatch()
   const { courses, isLoading } = useSelector((state) => state.courseIns)

   useEffect(() => {
      dispatch(getInstructor(8))
   }, [])

   const menuItems = []

   return (
      <>
         {isLoading && <Isloading />}
         <div>
            <Header titlePage="Инструктор" />
         </div>
         <ContainerItem>
            {courses && courses.length > 0 ? (
               courses?.map((el) => (
                  <Card
                     key={el.id}
                     el={el}
                     image={el.image}
                     title={el.courseName}
                     date={el.dateOfGraduation}
                     description={el.description}
                     // onClick={openModalDeleteAndEditHandler}
                     menuItems={menuItems}
                  />
               ))
            ) : (
               <ContainerNotFound>
                  <NotFound content="Нет курсов!" />
               </ContainerNotFound>
            )}
         </ContainerItem>
      </>
   )
}
const ContainerItem = styled('div')`
   display: flex;
   flex-wrap: wrap;
   gap: 20px;
`
const ContainerNotFound = styled('div')`
   margin: 0 auto;
`
