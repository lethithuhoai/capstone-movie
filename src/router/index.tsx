import { Navigate, RouteObject } from "react-router-dom";
import { PATH } from "constant";
import { AuthLayout } from "components";
import { Home, Login, Register } from "pages";

export const router: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: PATH.login,
        element: <Login />,
      },
      {
        path: PATH.register,
        element: <Register />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];
