// App.js
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { childrenRoutes, sidebarRoutes } from "./PageRoutes";
import Layout from "../Layout";
import { Suspense } from "react";
import { CircularProgress } from "@mui/joy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Parent component that renders common layout
    children: sidebarRoutes, // Custom page routes
  },
  {
    path: "/transactions",
    element: <Layout />, // Parent component that renders common layout
    children: childrenRoutes, // Custom page routes
  },

  // Below are pages that are not included in the sidebar display
  {
    path: "/sample",
    element: <div>Sample page</div>,
  },

  // Page not found
  {
    path: "*",
    element: <div>404 Not Found</div>,
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
