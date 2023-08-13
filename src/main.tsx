import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { UserContextProvider } from "./contexts/userContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login.tsx";
import Register from "./components/register.tsx";
import Albums from "./components/albums/albums.tsx";
import ProtectedRoute from "./components/protected-route.tsx";
import Users from "./components/users/users.tsx";

const router = createBrowserRouter([
  {
    path: "/",
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
    element: <Users />,
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
