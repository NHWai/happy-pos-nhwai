import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { PrivateRoutes } from "./components/PrivateRoutes.tsx";
import { Menus } from "./routes/Menus.tsx";
import { MenuCategories } from "./routes/MenuCategories.tsx";
import { Addons } from "./routes/Addons.tsx";
import { AddonCategories } from "./routes/AddonCategories.tsx";
import { Setting } from "./routes/Setting.tsx";
import { MenuDetail } from "./routes/MenuDetail.tsx";
import AppProvider from "./components/AppContext.tsx";
import Login from "./routes/Login.tsx";
import Register from "./routes/Register.tsx";
import Logout from "./routes/Logout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/menus",
        element: <Menus />,
      },
      {
        path: "/menus/:id",
        element: <MenuDetail />,
      },
      {
        path: "/menu-categories",
        element: <MenuCategories />,
      },
      {
        path: "/addons",
        element: <Addons />,
      },
      {
        path: "/addon-categories",
        element: <AddonCategories />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);
