import { Box, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import LayoutSplited from "../../components/LayoutSplited";
import { LOGIN_ROUTE, ORDERS_ROUTE } from "../../constants/routes";
import { ReactComponent as Logo } from "../../assets/logos/logo-text-img.svg";

export default function HomePage() {
  return (
    <LayoutSplited>
      <Container>
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          alignItems="center"
        >
          <Box maxWidth="100%">
            <Logo width="100%" />
          </Box>
          <Button
            size="large"
            component={Link}
            to={LOGIN_ROUTE}
            color="primary"
            variant="contained"
          >
            Se connecter
          </Button>
          <Button
            size="large"
            component={Link}
            to={ORDERS_ROUTE}
            color="secondary"
            variant="contained"
          >
            Voir la strategy
          </Button>
        </Box>
      </Container>
    </LayoutSplited>
  );
}
