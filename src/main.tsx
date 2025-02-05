import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "virtual:uno.css";
import ErrorPage from "./routes/ErrorPage";
import Login from "./routes/Login";
import Recipe from "./routes/Recipe";
import Register from "./routes/Register";
import Root from "./routes/Root";

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
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
);
