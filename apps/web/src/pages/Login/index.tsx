import { Card } from "@mui/material";
import LayoutSplited from "../../components/LayoutSplited";
import LoginForm from "../../components/Forms/LoginForm";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  AUTH_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "../../constants/routes";
import RegisterForm from "../../components/Forms/RegisterForm";

export default function LoginPage() {
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
          {/* <Route path={"*"} element={<Navigate to={"/"} />} /> */}
        </Routes>
      </Card>
    </LayoutSplited>
  );
}
