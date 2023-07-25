import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { reusableRoutesRoles } from '../../utils/constants/routes'
import { Groups } from '../../layout/admin/groups/groups-page/Groups'
import { Courses } from '../../layout/admin/courses/Courses'
import { Teachers } from '../../layout/admin/teachers/Teachers'
import { Students } from '../../layout/admin/students/Students'
import { GroupsTable } from '../../layout/admin/groups/groups-page/GroupsTable'

export const AdminRoutes = ({ roles, openModal }) => {
   const routes = reusableRoutesRoles.find((route) => route[roles])
   const { home, courses, teachers, students } = routes[roles]
   return (
      <Routes>
         <Route path="/" element={<Navigate to={home} />} />
         <Route path={home} element={<Groups openModal={openModal} />} />
         <Route path={`${home}/:details`} element={<GroupsTable />} />
         <Route path={courses} element={<Courses />} />
         <Route path={teachers} element={<Teachers />} />
         <Route path={students} element={<Students />} />
      </Routes>
   )
}
