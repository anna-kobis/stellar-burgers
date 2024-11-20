import {
  fetchRegisterUserThunk,
  fetchLoginUserThunk,
  fetchUserThunk,
  fetchUpdateUserThunk,
  fetchLogoutUserThunk,
  userSlice,
  initialState as userInitialState
} from './user-slice';

export const userActions = {
  ...userSlice.actions,
  fetchRegisterUserThunk,
  fetchLoginUserThunk,
  fetchUserThunk,
  fetchUpdateUserThunk,
  fetchLogoutUserThunk
};
export { userSlice, userInitialState };
