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
import { MyCoursesStu } from '../pages/student/home-page/MyCourses'
import { USER_ROLE, reusableRoutesRoles } from '../utils/constants/constants'
import { CreatePassword } from '../containers/CreatePassword'
import { MyCoursesStudents } from '../pages/instructor/pages/students/MyCoursesStudents'
import { MyCoursesMaterial } from '../pages/instructor/pages/materials/MyCoursesMaterial'
import { CoursesTable } from '../pages/admin/courses/courses-page/CoursesTable'
import { TableTeachers } from '../pages/admin/courses/courses-page/TableTeachers'
import { TableStudents } from '../pages/admin/courses/courses-page/TableStudents'
import { MyCoursesIns } from '../pages/instructor/pages/homePage/MyCourses'
import { MyCoursesTable } from '../pages/instructor/pages/homePage/MyCoursesTable'
import { StudentLesson } from '../pages/student/home-page/StudentLesson'
import { VideoLesson } from '../pages/student/lessonsPage/VideoLesson'
import { Presentation } from '../pages/student/lessonsPage/Presentation'
import { Task } from '../pages/student/lessonsPage/task/Task'
import { LinkPage } from '../pages/student/lessonsPage/LinkPage'
import { Test } from '../pages/student/lessonsPage/test/Test'
import { LessonLayout } from '../pages/student/home-page/LessonLayout'
import { TaskSend } from '../pages/student/lessonsPage/task/TaskLayout'
import { TestLayout } from '../pages/student/lessonsPage/test/TestLayout'
import { Page404 } from '../components/UI/not-found/Page404'
import { CreateTestPage } from '../pages/instructor/pages/materials/createTaskTest/CreateTestPage'
import { Video } from '../pages/instructor/pages/materials/pages/Video'
import { LinkPageIns } from '../pages/instructor/pages/materials/pages/Link'
import { PresentationIns } from '../pages/instructor/pages/materials/pages/Presentation'
import { TaskIns } from '../pages/instructor/pages/materials/pages/Task'
import { LessonLayoutInstrutor } from '../pages/instructor/pages/materials/pages/LessonLayoutInstrutor'
import { TaskInside } from '../pages/instructor/pages/materials/pages/TaskInside'
import { TaskTestLayout } from '../pages/instructor/pages/materials/createTaskTest/TaskTestLayout'
import CreateTask from '../pages/instructor/pages/materials/crud/create-task/CreateTask'

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
         <Route path="*" element={<Page404 />} />
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
            <Route path="mycoursesstu/:id" element={<StudentLesson />} />

            <Route
               path="mycoursesstu/:id/:lessonId"
               element={<Navigate to="videolessonStudent" />}
            />
            <Route path="mycoursesstu/:id/:lessonId" element={<LessonLayout />}>
               <Route path="videolessonStudent" element={<VideoLesson />} />
               <Route path="presentationStudent" element={<Presentation />} />
               <Route path="taskStudent" element={<Task />} />
               <Route path="linkStudent" element={<LinkPage />} />
               <Route path="testStudent" element={<Test />} />
            </Route>
            <Route
               path="mycoursesstu/:id/:lessonId/taskStudent/:taskid"
               element={<TaskSend />}
            />
            <Route
               path="mycoursesstu/:id/:lessonId/testStudent/:testid"
               element={<TestLayout />}
            />
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
            <Route
               path="/instructor/mycoursesins/:id"
               element={<TaskTestLayout />}
            >
               <Route
                  path="materials/createtest/:lessonid"
                  element={<CreateTestPage />}
               />
               <Route
                  path="materials/createtask/:lessonid"
                  element={<CreateTask />}
               />
            </Route>
            <Route
               path="/instructor/mycoursesins/:id"
               element={<LessonLayoutInstrutor />}
            >
               <Route
                  path="/instructor/mycoursesins/:id/materials/1/:lessonid"
                  element={<Video />}
               />
               <Route
                  path="/instructor/mycoursesins/:id/materials/2/:lessonid"
                  element={<PresentationIns />}
               />
               <Route
                  path="/instructor/mycoursesins/:id/materials/3/:lessonid"
                  element={<TaskIns />}
               />
               <Route
                  path="/instructor/mycoursesins/:id/materials/3/:lessonid/:taskid"
                  element={<TaskInside />}
               />
               <Route
                  path="/instructor/mycoursesins/:id/materials/4/:lessonid"
                  element={<LinkPageIns />}
               />
               <Route
                  path="/instructor/mycoursesins/:id/materials/5/:lessonid"
                  element={<h1>test inside</h1>}
               />
            </Route>
            <Route path="students" element={<MyCoursesStudents />} />
         </Route>
      </Routes>
   )
}
