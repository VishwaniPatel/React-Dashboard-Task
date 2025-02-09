import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/components/dashboard/Dashboard";
import ManageProducts from "./pages/components/manageProducts/ManageProducts";
import ManageOrders from "./pages/components/manageOrders/ManageOrders";
import ProtectedRoute from "./ProtectedRoutes";
import Login from "./core/components/authentication/Login";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <App />,
            children: [
              {
                path: "",
                element: <Dashboard />,
              },
              {
                path: "products",
                element: <ManageProducts />,
              },
              {
                path: "orders",
                element: <ManageOrders />,
              },
            ],
          },
        ],
      },
]);

export default router;
