import { StrictMode } from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import LoginPage from "./pages/Login";
import UserLoggedRoute from "./router/UserLoggedRoute";

function DashboardPage() {
  return <>dashboard</>;
}
function HomePage() {
  return <>home</>;
}
function ResetPasswordPage() {
  return <>ResetPasswordPage</>;
}
function RegisterPage() {
  return <>RegisterPage</>;
}
ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={
              <UserLoggedRoute>
                <DashboardPage />
              </UserLoggedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    <ToastContainer position="bottom-right" pauseOnFocusLoss={false} />
  </StrictMode>,
  document.getElementById("root")
);
