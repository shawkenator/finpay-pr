import { Box, Divider, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { User } from "../../../app/models/User"
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from "react";
import { userIdNameEmailHeaders, statusGenderHeaders } from "./user-headers";
import FormikInputField from "../../../common-components/formik-field";
import { useFormik } from "formik";
import { GENDERS, STATUSES } from "../../../constants";
import { useDispatch } from "react-redux";
import { deleteUser, updateUser } from "../users-thunk";
import { validationSchema } from "../../../app/commonSchemas.ts/schemas";

// icons
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

interface userListItemProps {
  user: User;
  ShouldBeShaded: boolean;
}

export const UserListItem = (props: userListItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  const dispatch = useDispatch();
  const { user, ShouldBeShaded } = props;

  const initialValuesEdit = {
    email: '',
    name: '',
    status: '',
    gender: '',
  };

  const checkIfIsValid = (value: any) =>
    validationSchema.validate(value)
    .then(() => setIsSaveButtonEnabled(true))
    .catch(() => setIsSaveButtonEnabled(false));

  const formik = useFormik({
    initialValues: initialValuesEdit,
    validationSchema,
    validate: checkIfIsValid,
    onSubmit: () => {},
  });

  const handleSaveEditUser = async () => {
    const postBody = {
      name: formik.values?.name,
      email: formik.values?.email,
      gender: formik.values?.gender,
      status: formik.values?.status,
    } as any

    dispatch(updateUser({userId: user.id, postBody }))
    setIsEdit(false);
  };

  const usersList = (
    <div style={{margin: '50px'}}>
      {user?.id && (
        <Box padding={2} paddingBottom={4}>
          <div>
            <Grid container spacing={1}>
              {userIdNameEmailHeaders}
              <Grid item xs={4}>
                <Typography>
                  {user.id}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  {user.email}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  {user.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              {statusGenderHeaders}
              <Grid item xs={6}>
                <Typography>
                  {user.status}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {user.gender}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Box>
      )}
    </div>
  )

  const editUserView = (
    <div>
      {user?.id && (
        <Box padding={2} paddingBottom={4}>
            <Grid item xs={12} paddingBottom={4}>
              <Typography>
                Edit User
              </Typography>
            </Grid>
          <Paper elevation={4}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography>
                  User ld
                </Typography>
                <Typography>
                  {user.id}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <FormikInputField id={"email"} label={"Email"} formik={formik}/>
              </Grid>
              <Grid item xs={4}>
                <FormikInputField id={"name"} label={"Name"} formik={formik}/>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="status"
                  name="status"
                  select
                  fullWidth
                  label="Status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.status && formik.errors.status}
                >
                  {STATUSES.map((option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="gender"
                  name="gender"
                  select
                  fullWidth
                  label="Gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.gender && formik.errors.gender}
                >
                  {GENDERS.map((option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      )}
    </div>
  )

  const usersControl = (
    <Grid container>
      <Grid item xs={isEdit ? 6 : 12}>
        <IconButton disableRipple disableFocusRipple={true} onClick={() => {!isEdit ? setIsEdit(true) : setIsEdit(false)}}>
          {!isEdit
          ? <EditIcon fontSize="large" />
          : <CloseIcon fontSize="large" />
          }
        </IconButton>
      </Grid>
      {isEdit && (
        <Grid item xs={isEdit ? 6 : 12}>
          <IconButton disableRipple disableFocusRipple={true} disabled={!isSaveButtonEnabled} onClick={() => handleSaveEditUser()}>
            <CheckIcon fontSize="large" />
          </IconButton>
        </Grid>
      )}
      <Grid item xs={12} paddingTop={3}>
        <IconButton  disableRipple onClick={() => dispatch(deleteUser(user.id))}>
          <DeleteForeverIcon fontSize="large"/>
        </IconButton>
      </Grid>
    </Grid>
  )

  return (
    <Paper style={{backgroundColor: ShouldBeShaded ? '#BEBEBE	' : ''}}>
      <Grid container>
        <Grid item xs={12} paddingBottom={3}>
          <Divider />
        </Grid>
        <Grid item xs={10}>
          {isEdit ? editUserView : usersList}
        </Grid>
        <Grid item xs={2}>
          {usersControl}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default UserListItem;
