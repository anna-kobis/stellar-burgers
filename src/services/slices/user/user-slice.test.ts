import { describe, test, expect } from '@jest/globals';
import { userApiMock } from '../apiMock';
import { TUserSliceState } from './user-slice';
import { userActions, userSlice, userInitialState } from '.';

describe('[userSlice] проверка редьюсеров слайса', () => {
  const initialState: TUserSliceState = userInitialState;
  const error = new Error('test error');
  const blankError = new Error('');
  const registerData = { ...userApiMock, password: 'GvD40L4gt8' };
  const loginData = { email: userApiMock.email, password: 'GvD40L4gt8' };
  const updateData = {
    name: 'Test Name',
    email: 'test@yandex.ru',
    password: 'W16C1LPRm2'
  };

  test('[#1] обработка экшена регистрации пользователя: pending', () => {
    const expectedState: TUserSliceState = { ...initialState, isLoading: true };

    const newState = userSlice.reducer(
      { ...initialState, error: error.message },
      userActions.fetchRegisterUserThunk.pending('', registerData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#2] обработка экшена регистрации пользователя: rejected c ошибкой', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = userSlice.reducer(
      { ...initialState, isLoading: true },
      userActions.fetchRegisterUserThunk.rejected(error, '', registerData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#3] обработка экшена регистрации пользователя: rejected без ошибки', () => {
    const expectedState: TUserSliceState = initialState;

    const newState = userSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      userActions.fetchRegisterUserThunk.rejected(blankError, '', registerData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#4] обработка экшена регистрации пользователя: fulfilled', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      user: userApiMock
    };

    const newState = userSlice.reducer(
      { ...initialState, isLoading: true },
      userActions.fetchRegisterUserThunk.fulfilled(
        { user: userApiMock },
        '',
        registerData
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#5] обработка экшена авторизации пользователя: pending', () => {
    const expectedState: TUserSliceState = { ...initialState, isLoading: true };

    const newState = userSlice.reducer(
      { ...initialState, error: error.message },
      userActions.fetchLoginUserThunk.pending('', loginData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#6] обработка экшена авторизации пользователя: rejected c ошибкой', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = userSlice.reducer(
      { ...initialState, isLoading: true },
      userActions.fetchLoginUserThunk.rejected(error, '', loginData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#7] обработка экшена авторизации пользователя: rejected без ошибки', () => {
    const expectedState: TUserSliceState = initialState;

    const newState = userSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      userActions.fetchLoginUserThunk.rejected(blankError, '', loginData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#8] обработка экшена авторизации пользователя: fulfilled', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      user: userApiMock
    };

    const newState = userSlice.reducer(
      { ...initialState, isLoading: true },
      userActions.fetchLoginUserThunk.fulfilled(
        { user: userApiMock },
        '',
        loginData
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#9] обработка экшена получения пользователя: pending', () => {
    const expectedState: TUserSliceState = { ...initialState, isLoading: true };

    const newState = userSlice.reducer(
      { ...initialState, error: error.message },
      userActions.fetchUserThunk.pending('')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#10] обработка экшена получения пользователя: rejected c ошибкой', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      error: error.message
    };

    const newState = userSlice.reducer(
      { ...initialState, isLoading: true },
      userActions.fetchUserThunk.rejected(error, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#11] обработка экшена получения пользователя: rejected без ошибки', () => {
    const expectedState: TUserSliceState = initialState;

    const newState = userSlice.reducer(
      { ...initialState, isLoading: true, error: error.message },
      userActions.fetchUserThunk.rejected(blankError, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#12] обработка экшена получения пользователя: fulfilled', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      user: userApiMock
    };

    const newState = userSlice.reducer(
      { ...initialState, isLoading: true },
      userActions.fetchUserThunk.fulfilled({ user: userApiMock }, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#13] обработка экшена обновления пользователя: pending', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      isLoading: true,
      user: userApiMock
    };

    const newState = userSlice.reducer(
      { ...initialState, error: error.message, user: userApiMock },
      userActions.fetchUpdateUserThunk.pending('', updateData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#14] обработка экшена обновления пользователя: rejected c ошибкой', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      error: error.message,
      user: userApiMock
    };

    const newState = userSlice.reducer(
      { ...initialState, isLoading: true, user: userApiMock },
      userActions.fetchUpdateUserThunk.rejected(error, '', updateData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#15] обработка экшена обновления пользователя: rejected без ошибки', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      user: userApiMock
    };

    const newState = userSlice.reducer(
      {
        ...initialState,
        isLoading: true,
        error: error.message,
        user: userApiMock
      },
      userActions.fetchUpdateUserThunk.rejected(blankError, '', updateData)
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#16] обработка экшена обновления пользователя: fulfilled', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      user: { name: updateData.name, email: updateData.email }
    };

    const newState = userSlice.reducer(
      { ...initialState, isLoading: true, user: userApiMock },
      userActions.fetchUpdateUserThunk.fulfilled(
        { user: { name: updateData.name, email: updateData.email } },
        '',
        updateData
      )
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#17] обработка экшена выхода пользователя: pending', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      isLoading: true,
      user: userApiMock
    };

    const newState = userSlice.reducer(
      { ...initialState, error: error.message, user: userApiMock },
      userActions.fetchLogoutUserThunk.pending('')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#18] обработка экшена выхода пользователя: rejected c ошибкой', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      error: error.message,
      user: userApiMock
    };

    const newState = userSlice.reducer(
      { ...initialState, isLoading: true, user: userApiMock },
      userActions.fetchLogoutUserThunk.rejected(error, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#19] обработка экшена выхода пользователя: rejected без ошибки', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      user: userApiMock
    };

    const newState = userSlice.reducer(
      {
        ...initialState,
        isLoading: true,
        error: error.message,
        user: userApiMock
      },
      userActions.fetchLogoutUserThunk.rejected(blankError, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#20] обработка экшена выхода пользователя: fulfilled', () => {
    const expectedState: TUserSliceState = initialState;

    const newState = userSlice.reducer(
      { ...initialState, isLoading: true, user: userApiMock },
      userActions.fetchLogoutUserThunk.fulfilled(undefined, '')
    );

    expect(newState).toEqual(expectedState);
  });

  test('[#21] обработка экшена проверки пользователя', () => {
    const expectedState: TUserSliceState = {
      ...initialState,
      user: userApiMock,
      isUserChecked: true
    };

    const newState = userSlice.reducer(
      { ...initialState, user: userApiMock },
      userActions.userCheck()
    );

    expect(newState).toEqual(expectedState);
  });
});
