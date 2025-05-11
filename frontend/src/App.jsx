import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Forgot from "./pages/forgot";
import AppLayout from "./components/layout/appLayout";
import LoginLayout from "./components/layout/loginLayout";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "forgot", element: <Forgot /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/",
        element: <AppLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
