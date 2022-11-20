import * as yup from 'yup';

export const validationSchema = yup.object({
  email: yup
    .string()
    .min(1, 'Enter your email')
    .required('Email is required'),
  name: yup
    .string()
    .min(1, 'Enter your name')
    .required('Name is required'),
  status: yup
    .string()
    .required('Status is required'),
  gender: yup
    .string()
    .required('Gender is required'),
});
