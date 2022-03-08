import { Card } from "@mui/material";
import LayoutSplited from "../../components/LayoutSplited";
import LoginForm from "../../components/Forms/LoginForm";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  AUTH_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  RESET_PASSWORD_ROUTE,
} from "../../constants/routes";
import RegisterForm from "../../components/Forms/RegisterForm";
import ResetPasswordForm from "../../components/Forms/ResetPasswordForm";

export default function AuthentificationPage() {
  let { pathname } = useLocation();
  return (
    <LayoutSplited>
      <Card variant="outlined">
        <Routes location={pathname}>
          <Route
            path={LOGIN_ROUTE.split(AUTH_ROUTE)[1]}
            element={<LoginForm />}
          />
          <Route
            path={REGISTER_ROUTE.split(AUTH_ROUTE)[1]}
            element={<RegisterForm />}
          />
          <Route
            path={RESET_PASSWORD_ROUTE.split(AUTH_ROUTE)[1]}
            element={<ResetPasswordForm />}
          />
          <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
      </Card>
    </LayoutSplited>
  );
}
