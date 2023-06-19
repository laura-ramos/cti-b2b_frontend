import { useContext } from 'react'
import AuthContext  from '../context/AuthProvider'

// This hook share information of user logged between all my componentes
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
