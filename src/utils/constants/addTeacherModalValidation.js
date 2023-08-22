import * as Yup from 'yup'

export const addTeacherValidation = Yup.object().shape({
   firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(
         /^.*((?=.*[A-Z]){1}).*$/,
         'First name must contain one uppercase'
      )
      .required('Firstname is required'),

   lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(/^.*((?=.*[A-Z]){1}).*$/, 'Last name must contain one uppercase')
      .required('Lastname is required'),

   phoneNumber: Yup.string().required('Phone number is required'),

   email: Yup.string().email().required('Email is required'),

   specialization: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Enter your specialization'),
})
