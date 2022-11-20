import { TextField } from "@mui/material";
import { FormikShape } from "../app/models/FormikShape";

interface FormikInputFieldProps {
  id: string,
  label: string,
  formik: FormikShape,
}

export const FormikInputField = (props: FormikInputFieldProps) => {

  const  { id, label, formik } = props;

  const fieldId = id.toString();

  return (
    <>
      <TextField
        fullWidth
        id={id}
        name={id}
        inputProps={{ maxLength: 150 }}
        label={label}
        value={formik.values[fieldId]}
        onChange={formik.handleChange}
        error={formik.touched[fieldId] && Boolean(formik.errors[fieldId])}
        onBlur={formik.handleBlur}
      />
      {formik.touched[fieldId] && Boolean(formik.errors[fieldId]) && (
      <div style={{color: 'red', fontSize: '20px'}}>
        {` *${formik.errors[fieldId]?.toString()}`}
      </div>
      )}
    </>
  )
}

export default FormikInputField;
