import { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import getTheme, { THEME_MODE } from "./theme";
import AuthentificationPage from "./pages/Authentification";
import {
  AuthentifiedOnlyRoute,
  GuestOnlyRoute,
} from "./router/UserLoggedRoute";
import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  HOME_ROUTE,
  AUTH_ROUTE,
} from "./constants/routes";
import { logout } from "./api/authentification";

function DashboardPage() {
  return (
    <>
      dashboard
      <button
        onClick={() => {
          logout();
        }}
      >
        logout()
      </button>
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
ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={getTheme(THEME_MODE)}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path={HOME_ROUTE} element={<HomePage />} />

          <Route path={"/"} element={<GuestOnlyRoute />}>
            <Route
              path={`${AUTH_ROUTE}/*`}
              element={<AuthentificationPage />}
            />
          </Route>

          <Route path={"/"} element={<AuthentifiedOnlyRoute />}>
            <Route path={DASHBOARD_ROUTE} element={<DashboardPage />} />
          </Route>

          <Route path={"*"} element={<Navigate to={HOME_ROUTE} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
  </StrictMode>,
  document.getElementById("root")
);
