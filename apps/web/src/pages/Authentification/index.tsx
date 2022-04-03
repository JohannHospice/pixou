import { alpha, Card, useMediaQuery, useTheme } from "@mui/material";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LayoutSplited from "../../components/LayoutSplited";
import LoginForm from "../../components/Forms/LoginForm";
import {
  AUTH_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  RESET_PASSWORD_ROUTE,
} from "../../constants/routes";
import RegisterForm from "../../components/Forms/RegisterForm";
import ResetPasswordForm from "../../components/Forms/ResetPasswordForm";
// @ts-ignore
import img from "../../assets/illustrations/business-3d-290.png";
import { PageTitle } from "../../components/Page";

export default function AuthentificationPage() {
  let { pathname } = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const isRegister = pathname === REGISTER_ROUTE;
  return (
    <LayoutSplited>
      <Card
        square={matches}
        variant="outlined"
        sx={{
          minHeight: {
            md: "auto",
            xs: "100vh",
          },
          minWidth: {
            md: "auto",
            sm: "100vw",
          },
          ...(isRegister
            ? {
                background: {
                  md: `${alpha(
                    theme.palette.background.paper,
                    0.7
                  )} url(${img}) no-repeat scroll 341px 17px`,
                },
                backgroundSize: {
                  md: "contain",
                },
              }
            : {}),
        }}
      >
        <Routes location={pathname}>
          <Route
            path={LOGIN_ROUTE.split(AUTH_ROUTE)[1]}
            element={
              <PageTitle title="Connexion - Pixou">
                <LoginForm />
              </PageTitle>
            }
          />
          <Route
            path={REGISTER_ROUTE.split(AUTH_ROUTE)[1]}
            element={
              <PageTitle title="Créer votre compte - Pixou">
                <RegisterForm />
              </PageTitle>
            }
          />
          <Route
            path={RESET_PASSWORD_ROUTE.split(AUTH_ROUTE)[1]}
            element={
              <PageTitle title="Récupération de compte - Pixou">
                <ResetPasswordForm />
              </PageTitle>
            }
          />
          <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
        </Routes>
      </Card>
    </LayoutSplited>
  );
}
