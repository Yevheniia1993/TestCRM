import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./router/Login";
import Register from "./router/Register";
import User from "./router/User";
import AdminData from "./router/AdminData";
import Trips from "./router/Trips";
import Future from "./router/Future";
import ErrorPage from "./error-page";
import "./App.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="Login" />,
    errorElement: <ErrorPage />, // new
  },
  {
    path: "/",
    element: <Navigate to="Login" />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/User",
    element: <User />,
  },
  {
    path: "/AdminData",
    element: <AdminData />,
  },
  {
    path: "/Trips",
    element: <Trips />,
  },
  {
    path: "/Future",
    element: <Future />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
