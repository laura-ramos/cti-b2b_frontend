import { createContext, useEffect, useState } from 'react';
import { Global } from '../utils/Global';

const AuthContext = createContext(null);

// This context always checks if token is still valid if user refreshes the browser 
export const AuthProvider = ({children}) => {

  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async() => {
    // Retrieve user auth data from local storage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // Check if I have token and user
    if(!token || !user) {
      setLoading(false);
      return false;
    }

    // Transform data in JavaScript object
    const objUser = JSON.parse(user);
    const userID = objUser.id;

    // Ajax request to backend for token acknowledge and return all user data.
    const request = await fetch(Global.url + "/api/restful/user/profile?id=" + userID, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + token,
      }
    });

    const backendData = await request.json();

    // Set auth and loading state 
    setAuth(backendData);
    setLoading(false);

  }

  return (
    <AuthContext.Provider
      value = {{
        auth,
        setAuth,
        loading
      }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthContext;
