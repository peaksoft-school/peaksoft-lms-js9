import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCourseStudents } from '../../store/instruc/instructorThunk'
import Table from '../../components/UI/table/Table'
import { IconButtons } from '../../components/UI/button/IconButtons'
import { useToggle } from '../../utils/hooks/general'
import { Trash } from '../../assets/icons'
import { ModalDeleteGroup } from '../admin/groups/groups-modal/ModalDeleteGroup'
import { NotFound } from '../not-found/NotFound'
import { Isloading } from '../../components/UI/snackbar/Isloading'

export const MyCoursesStudents = () => {
   const dispatch = useDispatch()
   const params = useParams()
   const [getName, setGetName] = useState()
   const { courseStudents, isLoading } = useSelector((state) => state.courseIns)
   const { isActive, setActive } = useToggle('modaldeleteteachers')

   useEffect(() => {
      dispatch(getCourseStudents(params.id))
   }, [])

   const openModalDelete = (data) => {
      setActive(!isActive)
      setGetName(data.name)
   }
   console.log(courseStudents)

   const handleClickDelete = () => {
      dispatch()
      setActive('')
   }
   const columns = [
      { id: 'id', label: 'N' },
      { id: 'fullName', label: 'Имя Фамилия' },
      { id: 'groupName', label: 'Группа' },
      { id: 'studyFormat', label: 'Формат обучение' },
      { id: 'phoneNumber', label: 'Номер телефона' },
      { id: 'email', label: 'E-mail' },
      { id: 'password', label: 'Пароль' },
      {
         render: (row) => (
            <IconButtons
               onClick={() =>
                  openModalDelete({ name: row.fullName, id: row.id })
               }
               style={{ margin: '0 0 0 20%' }}
            >
               <Trash />
            </IconButtons>
         ),
         label: 'Действие',
      },
   ]
   return (
      <div>
         {isLoading && <Isloading />}
         {courseStudents && courseStudents.length > 0 ? (
            <Table data={courseStudents} columns={columns} />
         ) : (
            <NotFound content="Нет студентов!" />
         )}
         <ModalDeleteGroup
            open={isActive}
            handleClose={() => setActive('')}
            deleteCardHandler={handleClickDelete}
            paragraph={`студента ${getName}`}
         />
      </div>
   )
}
