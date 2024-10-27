import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { userActions } from '@slices';
import { userSelectors } from '@selectors';
import { TRegisterData } from '@api';

export const Profile: FC = () => {
  const user = useSelector(userSelectors.selectUser);
  const isLoading = useSelector(userSelectors.selectIsLoading);
  const error = useSelector(userSelectors.selectError);
  const [errorText, setErrorText] = useState<string | null>(null);
  const dispatch = useDispatch();

  const userFormValue: TRegisterData = {
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  };

  const [formValue, setFormValue] = useState(userFormValue);

  useEffect(() => {
    setFormValue(userFormValue);
  }, [user]);

  const isNameChanged = formValue.name !== user?.name;
  const isEmailChanged = formValue.email !== user?.email;
  const isPasswordChanged = !!formValue.password;
  const isFormChanged = isNameChanged || isEmailChanged || isPasswordChanged;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const newValues: Partial<TRegisterData> = {};

    if (isNameChanged) {
      if (!formValue.name) {
        setErrorText('Пожалуйста, введите имя');
        return;
      } else newValues.name = formValue.name;
    }

    if (isEmailChanged) {
      if (!formValue.email) {
        setErrorText('Пожалуйста, введите почту');
        return;
      } else newValues.email = formValue.email;
    }

    if (isPasswordChanged) newValues.password = formValue.password;

    dispatch(userActions.fetchUpdateUserThunk(newValues))
      .unwrap()
      .catch(() => setErrorText(error));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText(null);
    setFormValue(userFormValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorText(null);
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={errorText || ''}
      isLoading={isLoading}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
