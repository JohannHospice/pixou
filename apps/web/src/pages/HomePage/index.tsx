import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import LayoutSplited from "../../components/LayoutSplited";
import { LOGIN_ROUTE } from "../../constants/routes";
import { ReactComponent as Logo } from "../../assets/logos/logo-text-img.svg";

export default function HomePage() {
  return (
    <LayoutSplited>
      <Logo />
      <Button
        size="large"
        component={Link}
        to={LOGIN_ROUTE}
        color="primary"
        variant="contained"
      >
        Se connecter
      </Button>
    </LayoutSplited>
  );
}
