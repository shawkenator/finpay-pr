import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { User } from "../../app/models/User";
import { userService } from "./users-service";

export const addUser = createAsyncThunk(
  'users/addUser',
  async(postBody: User, thunkAPI) => {
    const response = await userService.addUser(postBody);
    if (response.hasErrors) {
      throw new Error(response.errorMessage);
    }

    const store: RootStateOrAny = thunkAPI.getState();
    let usersList = JSON.parse(JSON.stringify(store.users.usersList));
    usersList.push(response.data);
    return usersList;
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async(data: {userId: number, postBody: User}, thunkAPI) => {
    const response = await userService.updateUser(data?.userId, data?.postBody);

    if (response.hasErrors) {
      throw new Error(response.errorMessage);
    }

    const store: RootStateOrAny = thunkAPI.getState();

    let usersList = JSON.parse(JSON.stringify(store.users.usersList));
    const userIndexToUpdate = usersList.findIndex((user: User) => user.id === data.userId);

    usersList.splice(userIndexToUpdate, 1, response.data)
    return usersList;
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async(userId: number, thunkAPI) => {
    const response = await userService.deleteUser(userId);

    if (response.hasErrors) {
      throw new Error(response.errorMessage);
    }

    const store: RootStateOrAny = thunkAPI.getState();

    let usersList = JSON.parse(JSON.stringify(store.users.usersList));

    const userIndexToDelete = usersList.findIndex((user: User) => user.id === userId);
    usersList.splice(userIndexToDelete, 1);
    return usersList;
  }
)


