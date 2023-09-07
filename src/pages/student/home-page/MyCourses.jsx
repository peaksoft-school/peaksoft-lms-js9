import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material'
import { Header } from '../../../components/UI/header/Header'
import { Card } from '../../../components/UI/cards/Card'
import { getCardsStudentLayout } from '../../../store/studentLayout/studentLayoutThunk'
import { NotFound } from '../../../components/UI/not-found/NotFound'
import { useToggle } from '../../../utils/hooks/general'
import { NotificationModal } from './NotificationModal'
import { dataBell } from '../../../utils/constants/constants'

export const MyCoursesStu = () => {
   const dispatch = useDispatch()
   const { id } = useSelector((state) => state.auth)
   const { cards } = useSelector((state) => state.studentLayout)
   const { isActive, setActive } = useToggle('openmodalbellstudent')
   const openModalBellStudent = () => {
      setActive(!isActive)
   }

   useEffect(() => {
      dispatch(getCardsStudentLayout(id))
   }, [])

   const menuItems = []
   return (
      <div>
         <Header
            titlePage="Студент"
            clickBellStudent={openModalBellStudent}
            bellTotal={dataBell?.length}
         />
         <ContainerItem>
            {cards && cards.length > 0 ? (
               cards?.map((el) => (
                  <Card
                     key={el.id}
                     el={el}
                     image={el.image}
                     title={el.courseName}
                     date={el.dateOfGraduation}
                     description={el.description}
                     menuItems={menuItems}
                     studentRole
                  />
               ))
            ) : (
               <ContainerNotFound>
                  <NotFound content="Нет курсов!" />
               </ContainerNotFound>
            )}
         </ContainerItem>
         <NotificationModal
            open={isActive}
            handleClose={() => setActive('')}
            data={dataBell}
         />
      </div>
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
