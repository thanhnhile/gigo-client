import { useContext, useDebugValue, useEffect } from 'react';
import { AuthContext } from '~/contexts/AuthProvider';
import useLocalStorage from './useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../utils/enum';

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  const { setValue } = useLocalStorage(LOCAL_STORAGE_KEY, {});
  useEffect(() => {
    setValue(auth);
  }, [auth, setValue]);
  useDebugValue(auth, (auth) => (auth?.user ? 'Logged In' : 'Logged Out'));
  return useContext(AuthContext);
};
export default useAuth;
