import { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import getTheme, { THEME_MODE } from "./theme";
import LoginPage from "./pages/Login";
import {
  AuthentifiedOnlyRoute,
  GuestOnlyRoute,
} from "./router/UserLoggedRoute";
import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  RESET_PASSWORD_ROUTE,
  HOME_ROUTE,
  AUTH_ROUTE,
} from "./constants/routes";
import { logout } from "./api/authentification";

function DashboardPage() {
  return (
    <>
      dashboard
      <a
        onClick={() => {
          logout();
        }}
      >
        logout()
      </a>
    </>
  );
}
function HomePage() {
  return (
    <>
      home
      <a href={LOGIN_ROUTE}>login page</a>
    </>
  );
}
function ResetPasswordPage() {
  return <>ResetPasswordPage</>;
}
ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={getTheme(THEME_MODE)}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path={HOME_ROUTE} element={<HomePage />} />

          <Route path={HOME_ROUTE} element={<GuestOnlyRoute />}>
            <Route
              path={RESET_PASSWORD_ROUTE}
              element={<ResetPasswordPage />}
            />
            <Route path={AUTH_ROUTE + "/*"} element={<LoginPage />} />
          </Route>

          <Route path={HOME_ROUTE} element={<AuthentifiedOnlyRoute />}>
            <Route path={DASHBOARD_ROUTE} element={<DashboardPage />} />
          </Route>

          {/* <Route path={"*"} element={<Navigate to={"/"} />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
  </StrictMode>,
  document.getElementById("root")
);
