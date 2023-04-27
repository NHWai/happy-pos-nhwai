import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Layout } from "./components/Layout.tsx";
import { Menus } from "./routes/Menus.tsx";
import { MenuCategories } from "./routes/MenuCategories.tsx";
import { Addons } from "./routes/Addons.tsx";
import { AddonCategories } from "./routes/AddonCategories.tsx";
import { Setting } from "./routes/Setting.tsx";
import { MenuDetail } from "./routes/MenuDetail.tsx";
import AppProvider from "./components/AppContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);
