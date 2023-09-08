import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from '../../../../components/UI/cards/Card'
import { Header } from '../../../../components/UI/header/Header'
import { NotFound } from '../../../../components/UI/not-found/NotFound'
import { Isloading } from '../../../../components/UI/snackbar/Isloading'
import { DeleteIcon, StudentsIcon } from '../../../../assets/icons'
import { ModalAddGroupToCourse } from '../../modal/ModalAddGroupToCourse'
import { useToggle } from '../../../../utils/hooks/general'
import { showSnackbar } from '../../../../components/UI/snackbar/Snackbar'
import { getCard } from '../../../../store/group/groupThunk'
import {
   addGroupToCourseThunk,
   deleteGroupToCourseThunk,
   getByIdInstructor,
} from '../../../../store/courses/coursesThunk'
import { ModalDelete } from '../../../admin/courses/courses-modal/ModalDelete'

export const MyCoursesIns = () => {
   const dispatch = useDispatch()
   const { cards } = useSelector((state) => state.cards)
   const { courses, isLoading } = useSelector((state) => state.courses)
   const { id } = useSelector((state) => state.auth)
   const [selectedOption, setSelectedOption] = useState('')
   const [getIdCourse, setIdCourse] = useState()
   const [getName, setNameCourse] = useState('')
   const { isActive, setActive } = useToggle('addgrouptocourse')
   const { isActive: openModal, setActive: setOpenModal } = useToggle(
      'deletegrouptocourse'
   )

   useEffect(() => {
      dispatch(getByIdInstructor(id))
      dispatch(getCard())
   }, [dispatch, id])

   const handleSelectChange = (event) => setSelectedOption(event.target.value)

   const openModalHandler = (data) => {
      if (data.menuId === 1) {
         setActive(!isActive)
         setIdCourse(data.data.id)
      } else if (data.menuId === 2) {
         setOpenModal(!openModal)
         setNameCourse(data.data)
         setIdCourse(data.data.id)
      }
   }
   const addGroupToCourseHandler = () => {
      dispatch(
         addGroupToCourseThunk({
            instructorId: id,
            courseId: getIdCourse,
            groupId: selectedOption,
            showSnackbar,
            page: 1,
         })
      )
      setActive('')
   }
   const deleteGroupToCourse = () => {
      dispatch(
         deleteGroupToCourseThunk({
            instructorId: id,
            courseId: getIdCourse,
            showSnackbar,
            groupId: getName.groupId,
            page: 1,
         })
      )
      setOpenModal('')
   }

   return (
      <>
         {isLoading && <Isloading />}
         <div>
            <Header titlePage="Инструктор" buttonContent="" />
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
                     onClick={openModalHandler}
                     menuItems={
                        el.groupId === null
                           ? [
                                {
                                   id: 1,
                                   title: 'Добавить группу в курс',
                                   img: <StudentsIcon />,
                                },
                             ]
                           : [
                                {
                                   id: 2,
                                   title: `Удалить группу ${el.groupName} с курса`,
                                   img: <DeleteIcon />,
                                },
                             ]
                     }
                  />
               ))
            ) : (
               <ContainerNotFound>
                  <NotFound content="Нет курсов!" />
               </ContainerNotFound>
            )}
         </ContainerItem>
         <ModalAddGroupToCourse
            array={cards}
            open={isActive}
            onSubmit={addGroupToCourseHandler}
            handleClose={() => setActive('')}
            selectedOption={selectedOption}
            handleSelectChange={handleSelectChange}
         />
         <ModalDelete
            open={openModal}
            handleClose={() => setOpenModal('')}
            paragraph={`группу ${getName.groupName} с курса ${getName.courseName}`}
            deleteCardHandler={deleteGroupToCourse}
         />
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
