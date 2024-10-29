import { FC, SyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { userActions } from '@slices';
import { userSelectors } from '@selectors';
import { RegisterUI } from '@ui-pages';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState<string | null>(null);
  const dispatch = useDispatch();
  const error = useSelector(userSelectors.selectError);
  const isLoading = useSelector(userSelectors.selectIsLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !userName || !password) {
      setErrorText('Пожалуйста, заполните все поля');
      return;
    }

    setErrorText(null);
    dispatch(
      userActions.fetchRegisterUserThunk({ email, name: userName, password })
    )
      .unwrap()
      .catch(() => setErrorText(error));
  };

  return (
    <RegisterUI
      errorText={errorText || ''}
      isLoading={isLoading}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
