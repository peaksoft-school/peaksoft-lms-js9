import * as Yup from 'yup'

export const addTeacherValidation = Yup.object().shape({
   firstName: Yup.string()
      .min(2, 'Слишком короткий :(')
      .max(50, 'Cлишком длинный :(')
      .matches(
         /^.*((?=.*[A-Z]){1}).*$/,
         'Имя должно содержать одну заглавную букву '
      )
      .required('Нужно указать имя'),

   lastName: Yup.string()
      .min(2, 'Слишком короткий :(')
      .max(20, 'Cлишком длинный :(')
      .matches(
         /^.*((?=.*[A-Z]){1}).*$/,
         'Фамилия должна содержать одну заглавную букву'
      )
      .required('Фамилия обязательна'),

   phoneNumber: Yup.string()
      .min(5, 'Требуется номер телефона')
      .max(13, 'Номер слишком длинный')
      .required('Требуется номер телефона'),

   email: Yup.string().email().required('Требуется электронная почта'),

   specialization: Yup.string()
      .min(1, 'Слишком короткий :(')
      .max(50, 'Cлишком длинный :(')
      .required('Укажите свою специализацию'),
})
