import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { userActions } from '@slices';
import { userSelectors } from '@selectors';
import { LoginUI } from '@ui-pages';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState<string | null>(null);
  const dispatch = useDispatch();
  const error = useSelector(userSelectors.selectError);
  const isLoading = useSelector(userSelectors.selectIsLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorText('Пожалуйста, заполните все поля');
      return;
    }

    setErrorText(null);
    dispatch(userActions.fetchLoginUserThunk({ email, password }))
      .unwrap()
      .catch(() => setErrorText(error));
  };

  return (
    <LoginUI
      errorText={errorText || ''}
      isLoading={isLoading}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
