import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Groups } from '../pages/admin/groups/groups-page/Groups'
import { GroupsTable } from '../pages/admin/groups/groups-page/GroupsTable'
import { Courses } from '../pages/admin/courses/courses-page/Courses'
import { Teachers } from '../pages/admin/teachers/Teachers'
import { Students } from '../pages/admin/students/Students'
import { PrivateRoute } from './PrivateRoutes'
import { AdminLayout } from '../layout/AdminLayout'
import { Page } from '../containers/Page'
import { SignInPage } from '../containers/SignInPage'
import { Layout } from '../layout/Layout'
import { MyCoursesStu } from '../pages/student/MyCourses'
import { USER_ROLE, reusableRoutesRoles } from '../utils/constants/constants'
import { CreatePassword } from '../containers/CreatePassword'
import { MyCoursesStudents } from '../pages/instructor/pages/students/MyCoursesStudents'
import { MyCoursesMaterial } from '../pages/instructor/pages/materials/MyCoursesMaterial'
import { CoursesTable } from '../pages/admin/courses/courses-page/CoursesTable'
import { TableTeachers } from '../pages/admin/courses/courses-page/TableTeachers'
import { TableStudents } from '../pages/admin/courses/courses-page/TableStudents'
import { MyCoursesIns } from '../pages/instructor/pages/homePage/MyCourses'
import { MyCoursesTable } from '../pages/instructor/pages/homePage/MyCoursesTable'

export const AppRoutes = ({ roles = 'admin' }) => {
   const routes = reusableRoutesRoles.find((route) => route[roles])
   const { home, courses, teachers, students } = routes[roles]

   const { role } = useSelector((state) => state.auth)

   const isAllowed = (roles) => {
      return roles.includes(role)
   }

   return (
      <Routes>
         <Route
            path="/"
            element={
               <PrivateRoute
                  component={
                     <Page>
                        <SignInPage />
                     </Page>
                  }
                  fallBacPath={
                     role === USER_ROLE.GUEST
                        ? '/'
                        : role === USER_ROLE.ADMIN
                        ? '/admin'
                        : role === USER_ROLE.INSTRUCTOR
                        ? '/instructor'
                        : '/student'
                  }
                  isAllowed={isAllowed([USER_ROLE.GUEST])}
               />
            }
         />
         <Route path="*" element={<h1>Такой страницы не существует!</h1>} />
         <Route
            path="/createPassword/:id"
            element={
               <Page>
                  <CreatePassword />
               </Page>
            }
         />
         <Route
            path="/admin"
            element={
               <PrivateRoute
                  fallBacPath="/"
                  isAllowed={isAllowed([USER_ROLE.ADMIN])}
                  component={<AdminLayout />}
               />
            }
         >
            <Route path="/admin" element={<Navigate to={home} />} />
            <Route index path={home} element={<Groups />} />
            <Route path={`${home}/:details`} element={<GroupsTable />} />
            <Route path={courses} element={<Courses />} />
            <Route
               path={`${courses}/:id`}
               element={<Navigate to="teachers" />}
            />
            <Route path={`${courses}/:id`} element={<CoursesTable />}>
               <Route path="students" element={<TableStudents />} />
               <Route path="teachers" element={<TableTeachers />} />
            </Route>
            <Route path={teachers} element={<Teachers />} />
            <Route path={students} element={<Students />} />
         </Route>

         <Route
            path="/student"
            element={
               <PrivateRoute
                  fallBacPath="/"
                  isAllowed={isAllowed([USER_ROLE.STUDENT])}
                  component={<Layout rolesLayout="student" />}
               />
            }
         >
            <Route path="/student" element={<Navigate to="mycoursesstu" />} />
            <Route path="mycoursesstu" element={<MyCoursesStu />} />
         </Route>
         <Route
            path="/instructor"
            element={
               <PrivateRoute
                  fallBacPath="/"
                  isAllowed={isAllowed([USER_ROLE.INSTRUCTOR])}
                  component={<Layout rolesLayout="instructor" />}
               />
            }
         >
            <Route
               path="/instructor"
               element={<Navigate to="mycoursesins" />}
            />
            <Route path="mycoursesins" element={<MyCoursesIns />} />
            <Route
               path="mycoursesins/:id"
               element={<Navigate to="materials" />}
            />
            <Route path="mycoursesins/:id" element={<MyCoursesTable />}>
               <Route path="materials" element={<MyCoursesMaterial />} />
               <Route path="students" element={<MyCoursesStudents />} />
            </Route>
         </Route>
      </Routes>
   )
}
