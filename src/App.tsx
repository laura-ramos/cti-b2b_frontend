import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { setAuthentication } from './store/reducers/auth';
import Root from './routes/Root';
import Dashboard from './pages/Dashboard';
import Login from './modules/login/login';
import { getAuthStatus } from './utils/oidc-providers';
import { useDispatch } from 'react-redux';
import RecoverPassword from './modules/login/RecoverPassword';
import ResetPassword from './modules/login/ResetPassword';


const App = () => {
  const dispatch = useDispatch();
  const [isAppLoading, setIsAppLoading] = useState(true);

  //check session user
  const checkSession = async () => {
    try {
      let responses: any = await Promise.all([
        getAuthStatus(),
      ]);

      responses = responses.filter((r: any) => Boolean(r));

      if (responses && responses.length > 0) {
        dispatch(setAuthentication(responses[0]));
      }
      setIsAppLoading(false);
    } catch (error: any) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  if (isAppLoading) {
    return <p>Loading</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/password/reset" element={<PublicRoute />}>
          <Route path="/password/reset" element={<ResetPassword />} />
        </Route>
        <Route path="/password/recover" element={<PublicRoute />}>
          <Route path="/password/recover" element={<RecoverPassword />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Root />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </BrowserRouter>
  );
};

export default App;
