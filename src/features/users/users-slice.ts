import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../app/models/User';
import { deleteUser, addUser, updateUser } from './users-thunk';

interface user {
  selectedUser: User,
  usersList: User[],
  errorMessage: string,
  isLoading: boolean,
};

const initialState: user = {
  selectedUser: {} as User,
  usersList: [],
  errorMessage: '',
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearError: (state) => {
      state.errorMessage = "";
    },
    setUsers: (state, action) => {
      state.usersList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.usersList = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.usersList = action.payload;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.usersList = [];
    })
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;

