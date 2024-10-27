import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RejectedAction, isActionPending, isActionRejected } from '../utils';
import { TUser } from '@utils-types';
import {
  TRegisterData,
  registerUserApi,
  TLoginData,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { TThunkSliceState } from '../types';
import { USER_SLICE_NAME } from '../slice-names';

export const fetchRegisterUserThunk = createAsyncThunk<
  { user: TUser },
  TRegisterData
>(`${USER_SLICE_NAME}/fetchRegisterUser`, registerUserApi);

export const fetchLoginUserThunk = createAsyncThunk<
  { user: TUser },
  TLoginData
>(`${USER_SLICE_NAME}/fetchLoginUser`, loginUserApi);

export const fetchUserThunk = createAsyncThunk<{ user: TUser }>(
  `${USER_SLICE_NAME}/fetchUser`,
  getUserApi
);

export const fetchUpdateUserThunk = createAsyncThunk<
  { user: TUser },
  Partial<TRegisterData>
>(`${USER_SLICE_NAME}/fetchUpdateUser`, updateUserApi);

export const fetchLogoutUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchLogoutUser`,
  logoutApi
);

type TUserSliceState = TThunkSliceState & {
  user: TUser | null;
  isUserChecked: boolean;
};

const initialState: TUserSliceState = {
  user: null,
  isUserChecked: false,
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    userCheck: (state) => {
      state.isUserChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchLoginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchUpdateUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(fetchLogoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addMatcher(isActionPending(USER_SLICE_NAME), (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(
        isActionRejected(USER_SLICE_NAME),
        (state, action: RejectedAction) => {
          state.isLoading = false;
          state.error = action.error.message ?? null;
        }
      );
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsUserChecked: (state) => state.isUserChecked,
    selectIsLoading: (state) => state.isLoading,
    selectError: (state) => state.error
  }
});
