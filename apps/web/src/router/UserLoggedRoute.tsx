import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser, withUser } from "../contexts/UserContext";

const SubscritionRoute = withUser(function RedirectComponent() {
  const {
    data: { loaded, logged },
  } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (loaded && !logged) {
      navigate("/login");
    }
  }, [loaded, logged, navigate]);

  return <Outlet />;
});

export default SubscritionRoute;
