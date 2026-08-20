import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import NotFoundPage from "./frontend/components/NotFoundPage";
import Home from "./frontend/features/Home/index";
import Login from "./frontend/features/Login/index";
import { AuthProvider } from "./frontend/context/AuthContext";
import Services from "./frontend/features/Services/index";
import About from "./frontend/features/About/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/services",
    element: <Services />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/about",
    element: <About />,
    errorElement: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
