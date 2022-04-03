import { Box, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import LayoutSplited from "../../components/LayoutSplited";
import { LOGIN_ROUTE, STRATEGIES_ROUTE } from "../../constants/routes";
import { ReactComponent as Logo } from "../../assets/logos/logo-text-img.svg";
import { PageTitle } from "../../components/Page";

export default function HomePage() {
  return (
    <PageTitle>
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
            <Box display="flex" width="100%" justifyContent="center">
              <Button
                size="large"
                component={Link}
                to={LOGIN_ROUTE}
                color="primary"
                variant="contained"
              >
                Se connecter
              </Button>
              <Box ml={2}>
                <Button
                  size="large"
                  component={Link}
                  to={STRATEGIES_ROUTE}
                  color="primary"
                  variant="outlined"
                >
                  Voir la strategy
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </LayoutSplited>
    </PageTitle>
  );
}
