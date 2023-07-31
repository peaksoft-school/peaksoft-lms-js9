import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { reusableRoutesRoles } from '../utils/constants/routes'
import { Groups } from '../pages/admin/groups/groups-page/Groups'
import { GroupsTable } from '../pages/admin/groups/groups-page/GroupsTable'
import { Courses } from '../pages/admin/courses/Courses'
import { Teachers } from '../pages/admin/teachers/Teachers'
import { Students } from '../pages/admin/students/Students'
import { PrivateRoute } from './PrivateRoutes'
import { AdminLayout } from '../layout/AdminLayout'
import { Page } from '../containers/Page'
import { SignInPage } from '../containers/SignInPage'
import { StudentLayout } from '../layout/StudentLayout'
import { MyCoursesStu } from '../pages/student/MyCourses'
import { MyCoursesIns } from '../pages/instructor/MyCourses'
import { InstructorLayout } from '../layout/InstructorLayout'

export const AppRoutes = ({ roles }) => {
   const routes = reusableRoutesRoles.find((route) => route[roles])
   const { home, courses, teachers, students } = routes[roles]

   const role = 'ADMIN'

   const isAllowed = (userRole) => {
      return userRole.includes(role)
   }

   const USER_ROLE = {
      STUDENT: 'STUDENT',
      ADMIN: 'ADMIN',
      INSTRUCTOR: 'INSTRUCTOR',
   }

   return (
      <Routes>
         {/*         sign in         */}
         <Route
            path="/"
            element={
               <Page>
                  <SignInPage />
               </Page>
            }
         />
         <Route path="*" element={<h1>Такой страницы не существует!</h1>} />
         {/*          admin           */}
         <Route
            path="/admin"
            element={
               <PrivateRoute
                  fallBacPath="/"
                  isAllowed={isAllowed(USER_ROLE.ADMIN)}
                  component={<AdminLayout />}
               />
            }
         >
            <Route path="/admin" element={<Navigate to={home} />} />
            <Route index path={home} element={<Groups />} />
            <Route path={`${home}/:details`} element={<GroupsTable />} />
            <Route path={courses} element={<Courses />} />
            <Route path={teachers} element={<Teachers />} />
            <Route path={students} element={<Students />} />
         </Route>
         {/*        students         */}
         <Route
            path="/student"
            element={
               <PrivateRoute
                  fallBacPath="/"
                  isAllowed={isAllowed(USER_ROLE.STUDENT)}
                  component={<StudentLayout />}
               />
            }
         >
            <Route path="/student" element={<Navigate to="mycoursesstu" />} />
            <Route path="mycoursesstu" element={<MyCoursesStu />} />
         </Route>
         {/*      instructor       */}
         <Route
            path="/instructor"
            element={
               <PrivateRoute
                  fallBacPath="/"
                  isAllowed={isAllowed(USER_ROLE.INSTRUCTOR)}
                  component={<InstructorLayout />}
               />
            }
         >
            <Route
               path="/instructor"
               element={<Navigate to="mycoursesins" />}
            />
            <Route path="mycoursesins" element={<MyCoursesIns />} />
         </Route>
      </Routes>
   )
}
