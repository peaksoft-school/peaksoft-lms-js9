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

export const materialsLesson = [
   {
      id: 1,
      lesson: 'Lesson-1',
      lessonVideo: 'Видеоурок',
      presentation: 'Презентация',
      task: 'Задания',
      link: 'Ссылка',
      test: 'Тест',
   },
   {
      id: 2,
      lesson: 'Lesson-2',
      lessonVideo: 'Видеоурок',
      presentation: 'Презентация',
      task: 'Задания',
      link: 'Ссылка',
      test: 'Тест',
   },
   {
      id: 3,
      lesson: 'Lesson-3',
      lessonVideo: 'Видеоурок',
      presentation: 'Презентация',
      task: 'Задания',
      link: 'Ссылка',
      test: 'Тест',
   },
   {
      id: 4,
      lesson: 'Lesson-4',
      lessonVideo: 'Видеоурок',
      presentation: 'Презентация',
      task: 'Задания',
      link: 'Ссылка',
      test: 'Тест',
   },
]
export const menuItem = [
   {
      value: 'videolesson',
      title: 'Видеоурок',
   },
   {
      value: 'presentation',
      title: 'Прентация',
   },
   {
      value: 'task',
      title: 'Задание',
   },
   {
      value: 'link',
      title: 'Ссылка',
   },
   {
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
   videolesson: '/videolesson',
   presentation: '/presentation',
   task: '/task',
   link: '/link',
   test: '/test',
}
export const dataBell = []
