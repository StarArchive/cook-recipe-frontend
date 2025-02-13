import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import ErrorPage from "./routes/ErrorPage";
import Login from "./routes/Login";
import Recipe from "./routes/Recipe";
import Register from "./routes/Register";
import Root from "./routes/Root";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  { path: "/recipe/:id", element: <Recipe /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider classNamesPrefix="app" defaultColorScheme="auto">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
      <Notifications />
    </MantineProvider>
  </StrictMode>
);
