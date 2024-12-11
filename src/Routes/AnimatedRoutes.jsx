// App.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { childrenRoutes, sidebarRoutes } from "./PageRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import { CircularProgress } from "@mui/joy";
import PageNotFound from "../Pages/404/PageNotFound";
import { Suspense } from "react";
import Layout from "../Layout";
import Authentication from "../Pages/Authentication/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Layout />
      </ProtectedRoutes>
    ), // Parent component that renders common layout
    children: sidebarRoutes, // Custom page routes
  },
  {
    // path: "/releasing",
    element: <Layout />, // Parent component that renders common layout
    children: childrenRoutes, // Custom page routes
  },
  {
    path: "/signing-in/:id",
    element: <Authentication />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function AnimatedRoutes() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default AnimatedRoutes;
