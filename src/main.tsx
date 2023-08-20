import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContextProvider } from "./contexts/userContext";
import App from "./App";
import Login from "./components/login";
import Register from "./components/register";
import Albums from "./components/albums/albums";
import ProtectedRoute from "./components/protected-route";
import Users from "./components/users/users";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/albums",
    element: (
      <ProtectedRoute>
        <Albums />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <RouterProvider router={router} />
          <App />
        </UserContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
