export const LOGIN_USER_KEY = 'PEAKSOFT_LMS_USER_KEY'

export const BASE_URL = 'http://peaksoftlms.peaksoftprojects.com'

export const USER_ROLE = {
   STUDENT: 'STUDENT',
   ADMIN: 'ADMIN',
   INSTRUCTOR: 'INSTRUCTOR',
}

export const STORAGE_KEY = {
   AUTH_KEY: 'AUTH_KEY',
}

export const columnsTableGroup = [
   { id: 'id', label: 'ID' },
   { id: 'fullName', label: 'Имя Фамилия' },
   { id: 'group', label: 'Группа' },
   { id: 'studyFormat', label: 'Формат' },
   { id: 'phoneNumber', label: 'Номер телефона' },
   { id: 'email', label: 'E-mail' },
]
export const columnsTableCourses = [
   { id: 'id', label: 'ID' },
   { id: 'fullName', label: 'Имя Фамилия' },
   { id: 'groupName', label: 'Группа' },
   { id: 'studyFormat', label: 'Формат' },
   { id: 'phoneNumber', label: 'Номер телефона' },
   { id: 'email', label: 'E-mail' },
]

export const menuItem = [
   {
      id: 1,
      value: 'videolesson',
      title: 'Видеоурок',
   },
   {
      id: 2,
      value: 'presentation',
      title: 'Презентация',
   },
   {
      id: 3,
      value: 'task',
      title: 'Задание',
   },
   {
      id: 4,
      value: 'link',
      title: 'Ссылка',
   },
   {
      id: 5,
      value: 'test',
      title: 'Тест',
   },
]

export const reusableRoutesRoles = [
   {
      admin: {
         home: 'home',
         courses: 'courses',
         teachers: 'teachers',
         students: 'students',
      },
   },
   {
      instructor: {
         myCoursesInstructor: 'mycoursesins',
      },
   },
   {
      student: {
         myCoursesStudent: 'mycoursesstu',
      },
   },
]

export const reusableRoutesLesson = {
   videolesson: 'videolesson',
   presentation: 'presentation',
   task: 'task',
   // link: '/link',
   test: 'test',
}
