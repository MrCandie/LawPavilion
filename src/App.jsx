import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallBack";
import Spinner from "./components/Spinner";

const Home = lazy(() => import("./pages/dashboard/Dashboard"));
const Settings = lazy(() => import("./pages/settings/Settings"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const Login = lazy(() => import("./pages/login/Login"));
const Report = lazy(() => import("./pages/reports/Report"));

const ProtectedRoute = () => {
  const token = localStorage.getItem("auth_token");

  const location = useLocation();

  const unauth = ["/login", "/signup"];

  const isUnauthPath = unauth.some((path) =>
    location.pathname.startsWith(path)
  );

  if (!token && !isUnauthPath) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

const routes = createRoutesFromElements(
  <Route>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/reports" element={<Report />} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routes);

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
