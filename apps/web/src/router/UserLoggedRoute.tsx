import { Box, CircularProgress } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from "../constants/routes";
import { useUser, withUser } from "../contexts/UserContext";

export const AuthentifiedOnlyRoute = withUser(() => (
  <RenderByUser
    componentLogged={<Outlet />}
    componentLoaded={<Navigate to={LOGIN_ROUTE} />}
  />
));
export const GuestOnlyRoute = withUser(() => (
  <RenderByUser
    componentLogged={<Navigate to={DASHBOARD_ROUTE} />}
    componentLoaded={<Outlet />}
  />
));

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={80} />
    </Box>
  );
}

function RenderByUser({
  componentLogged,
  componentLoaded,
}: {
  componentLogged: any;
  componentLoaded: any;
}) {
  const {
    userStatus: { loaded, logged },
  } = useUser();

  if (loaded) {
    if (logged) {
      return componentLogged;
    }
    return componentLoaded;
  }

  return <Loading />;
}
