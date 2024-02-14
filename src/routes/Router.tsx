import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RecoverPassword from "../modules/login/RecoverPassword";
import ResetPassword from "../modules/login/ResetPassword";
import Login from "../modules/login/login"
import ErrorPage from "../pages/errors/ErrorPage";
import Main from "../modules/main/Main";
import Dashboard from "../pages/Dashboard";

const RouteList = createBrowserRouter([
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
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={RouteList} />;

export default Router;