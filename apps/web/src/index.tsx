import { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "./polyfills";
import getTheme from "./theme";
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
import { UserProvider } from "./contexts/UserContext";
import AuthentificationPage from "./pages/Authentification";
import DashboardPage from "./pages/DashboardPage";
import AccountPage from "./pages/AccountPage";
import SettingsPage from "./pages/SettingsPage";
import HomePage from "./pages/HomePage";
import StrategyPage from "./pages/StrategyPage";
import StrategyDashboardPage from "./pages/StrategyDashboardPage";

import "./api/analytics";
import "./api/performace";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import Page from "./components/Page";

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={getTheme("dark")}>
      <BrowserRouter>
        <Page>
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              width: "100%",
            }}
          >
            <CssBaseline />
            <UserProvider>
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
            </UserProvider>
          </Box>
        </Page>
      </BrowserRouter>
    </ThemeProvider>
    <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
  </StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: async (registration: ServiceWorkerRegistration) => {
    console.log("onUpdate", registration);
    await registration.unregister();
    // await caches
    //   .keys()
    //   .then((names) => names.map((name) => caches.delete(name)));
    window.location.reload();
  },
  onSuccess: (registration: any) => {
    console.log("onSuccess", registration);
    toast.dark("🐤 Il y a du nouveau sur Pixou !", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
