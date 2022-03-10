import { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import "./polyfills";
import "react-toastify/dist/ReactToastify.css";
import getTheme, { THEME_MODE } from "./theme";
import AuthentificationPage from "./pages/Authentification";
import {
  AuthentifiedOnlyRoute,
  GuestOnlyRoute,
} from "./router/UserLoggedRoute";
import {
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  AUTH_ROUTE,
  ACCOUNT_ROUTE,
  SETTINGS_ROUTE,
} from "./constants/routes";
import DashboardPage from "./pages/DashboardPage";
import AccountPage from "./pages/AccountPage";
import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage";

import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";

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
            <Route path={ACCOUNT_ROUTE} element={<AccountPage />} />
            <Route path={SETTINGS_ROUTE} element={<SettingsPage />} />
          </Route>

          <Route path={"*"} element={<Navigate to={HOME_ROUTE} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
  </StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.register({
  onUpdate: (registration: any) => {
    toast("onUpdate");
    console.log("onUpdate", registration);
  },
  onSuccess: (registration: any) => {
    toast("onSuccess");
    console.log("onSuccess", registration);
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
