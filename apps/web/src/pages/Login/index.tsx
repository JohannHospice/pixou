import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login } from "../../api/authentification";
import LayoutSplited from "../../components/LayoutSplited";
import { toast } from "react-toastify";

export default function LoginPage() {
  const formik = useFormik({
    onSubmit: async ({ email, password }) => {
      try {
        await login(email, password);
        toast("Connexion réussi !");
      } catch (err) {
        toast(JSON.stringify(err));
      }
    },
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string(),
      password: Yup.string(),
    }),
  });

  return (
    <LayoutSplited>
      <Card
        variant="outlined"
        style={{
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent
          style={{
            padding: "48px 36px 0 36px ",
          }}
        >
          <Box
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
            flexDirection="column"
          >
            <Avatar sx={{ mb: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Connexion
            </Typography>
            <Typography component="h2" variant="body2">
              Utiliser votre compte Crin
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={formik.handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse e-mail"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
            />
            <Button
              size="small"
              component={Link}
              to="/reset-password"
              color="primary"
              style={{
                paddingLeft: "0",
              }}
            >
              Mot de passe oublié ?
            </Button>
            <Typography
              component="h2"
              variant="body2"
              color="text.secondary"
              mt={3}
            >
              Utiliser votre compte Crin
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          style={{
            padding: "28px 36px 48px 28px",
            justifyContent: "space-between",
          }}
        >
          <Button component={Link} to="/register" color="primary">
            Créer un compte
          </Button>
          <Button type="submit" variant="contained">
            Se connecter
          </Button>
        </CardActions>
      </Card>
    </LayoutSplited>
  );
}
