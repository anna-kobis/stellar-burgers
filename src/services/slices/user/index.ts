import {
  fetchRegisterUserThunk,
  fetchLoginUserThunk,
  fetchUserThunk,
  fetchUpdateUserThunk,
  fetchLogoutUserThunk,
  userSlice
} from './user-slice';

export const userActions = {
  ...userSlice.actions,
  fetchRegisterUserThunk,
  fetchLoginUserThunk,
  fetchUserThunk,
  fetchUpdateUserThunk,
  fetchLogoutUserThunk
};
export { userSlice };
