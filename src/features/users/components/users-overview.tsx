import { Box, Divider, Grid, IconButton, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../../app/models/User";
import { RootState } from "../../../app/store";
import { addUser } from "../users-thunk";
import { UserListItem } from "./user-list-item";
import { useFormik } from "formik";
import FormikInputField from "../../../common-components/formik-field";
import { STATUSES, GENDERS } from "../../../constants";
import { validationSchema } from "../../../app/commonSchemas.ts/schemas";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import axios, { AxiosResponse } from "axios";
import { config } from "../../../axiosHelpers/axiosPutHelper";
import { setUsers } from "../users-slice";


export const UsersOverview = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [localUsersData, setLocalUsersData] = useState([])
  const usersList = useSelector((state: RootState) => state.users.usersList);

  const dispatch = useDispatch();

  const getUsers = async (): Promise<AxiosResponse> => {
    let result = {} as AxiosResponse;

    return await axios.get('https://gorest.co.in/public/v2/users', config)
    .then(function (response) {
      result.data = response.data;
      setLocalUsersData(response.data);
      return result;
    });
  }

  useEffect(() => {
    if (localUsersData?.length === 0 || usersList?.length === 0) {
      getUsers();
    }

  }, [localUsersData, usersList])

  useEffect(() => {

    if (localUsersData?.length > 0) {
      dispatch(setUsers(localUsersData));
    }
    }, [dispatch, localUsersData])

  const initialValuesAdd = {
    email: '',
    name: '',
    status: '',
    gender: 'male',
  };

  const checkIfIsValid = (value: any) =>
    validationSchema.validate(value)
    .then(() => setIsSaveButtonEnabled(true))
    .catch(() => setIsSaveButtonEnabled(false));

  const formik = useFormik({
    initialValues: initialValuesAdd,
    validationSchema,
    validate: checkIfIsValid,
    onSubmit: () => {},
  });

  const handleSaveNewUser = () => {
    const postBody = {
      name: formik.values?.name,
      email: formik.values?.email,
      gender: formik.values?.gender,
      status: formik.values?.status,
    } as User

    dispatch(addUser(postBody))
    setIsAdd(false);
  }

  const addNewUserView = (
    <div>
      <Box padding={2} paddingBottom={4}>
        <Paper elevation={4}>
          <Grid container spacing={2} paddingLeft={1} paddingRight={1}>
            <Grid item xs={12}>
              <Typography>
                Add
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormikInputField id={"email"} label={"Email"} formik={formik}/>
            </Grid>
            <Grid item xs={6}>
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
    </div>
  )


  const addUserControl = (
    <Grid container>
      <Grid item xs={12}>
        <IconButton onClick={() => {setIsAdd(false)}}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </Grid>
      {isAdd && (
        <Grid item xs={12} paddingTop={3}>
          <IconButton disabled={!isSaveButtonEnabled} onClick={() => handleSaveNewUser()}>
            <CheckIcon fontSize="large" />
          </IconButton>
        </Grid>
      )}
    </Grid>
  )

  return (
    <Box paddingTop={5}>
    <div>
        <>
          <Box paddingBottom={5}>
            {!isAdd ? (
              <>
                <Typography>
                  add
                </Typography>
                <IconButton onClick={() => {setIsAdd(true)}}>
                  <AddIcon fontSize="large" />
                </IconButton>
              </ >
            ) : (
              <Paper>
                <Grid container paddingTop={2}>
                  <Grid item xs={10}>
                    {addNewUserView}
                  </Grid>
                  <Grid item xs={2}>
                    {addUserControl}
                  </Grid>
                </ Grid>
              </Paper>
            )}
          </Box>
        {usersList?.length > 0 ? (
          usersList.map((user: User, index: number) => (
            <UserListItem user={user} ShouldBeShaded={index % 2 === 0} />
          ))) : (
            <div>
              Sorry, no users found.
            </div>
          )}
        </>
    </div>
    </Box>
  )
}

export default UsersOverview;
