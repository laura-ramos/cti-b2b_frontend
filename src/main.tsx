import * as React from "react"
import * as ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux';

import Login from "./modules/login/login"
import ResetPassword from "./modules/login/ResetPassword"
import RecoverPassword from "./modules/login/RecoverPassword"
import Root from "./routes/Root"
import ErrorPage from "./pages/errors/Error-Page"
import './utils/i18n'
import './index.css'
import store from './store/store';
import Dashboard from "./pages/Dashboard";
import { Users } from "./modules/users/Users";
import { Profile } from "./modules/users/Profile";

declare const window: any;

window.PF = {
  config: {
    mode: 'bs4',
  },
};

// Use the last version of React 
const router = createBrowserRouter([
  // Public routes
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/password/reset",
    element: <ResetPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/password/recover",
    element: <RecoverPassword />,
    errorElement: <ErrorPage />,
  },
  // Private routes star here.
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
          autoClose={3000}
          draggable={false}
          position="top-center"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnHover
        />
    </Provider>
  </React.StrictMode>,
)
