import { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import "./polyfills";
import "react-toastify/dist/ReactToastify.css";
import getTheme from "./theme";
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
  STRATEGIES_ROUTE,
} from "./constants/routes";
import DashboardPage from "./pages/DashboardPage";
import AccountPage from "./pages/AccountPage";
import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage";
import StrategyPage from "./pages/StrategyPage";
import StrategyDashboardPage from "./pages/StrategyDashboardPage";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./contexts/UserContext";
import { Box } from "@mui/material";

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={getTheme("dark")}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          width: "100%",
        }}
      >
        <CssBaseline />
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path={HOME_ROUTE} element={<HomePage />} />
              <Route
                path={`${STRATEGIES_ROUTE}/:symbol`}
                element={<StrategyPage />}
              />
              <Route
                path={STRATEGIES_ROUTE}
                element={<StrategyDashboardPage />}
              />

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
        </UserProvider>
      </Box>
    </ThemeProvider>
    <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
  </StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: (registration: any) => {
    toast.dark("🐤 Il y a du nouveau sur Pixou !", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    console.log("onUpdate", registration);
    registration.showNotification("hey", {
      body: "Did you make a $1,000,000 purchase at Dr. Evil...",
      icon: "images/ccard.png",
      vibrate: [200, 100, 200, 100, 200, 100, 400],
      tag: "request",
      actions: [
        { action: "yes", title: "Yes" },
        { action: "no", title: "No" },
      ],
    });
  },
  onSuccess: (registration: any) => {
    console.log("onSuccess", registration);
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
