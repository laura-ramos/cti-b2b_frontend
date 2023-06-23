import * as React from "react"
import * as ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux';

import Login from "./modules/login/login"
import Root from "./routes/Root"
import ErrorPage from "./pages/errors/Error-Page"
import './utils/i18n'
import './index.css'
import store from './store/store';

// Use the last version of React 
const router = createBrowserRouter([
  // Public routes
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  // Private routes star here.
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
