import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { login } from "../../api/authentification";
import LayoutSplited from "../../components/LayoutSplited";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState<string | undefined>();
  const formik = useFormik({
    onSubmit: async ({ email, password }) => {
      try {
        await login(email, password);
      } catch (err) {
        setError("Impossible de trouver votre compte Pixou");
      }
    },
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Saisissez une adresse e-mail valide.")
        .required("E-mail obligatoire"),
      password: Yup.string()
        .min(8, "Utilisez 8 caractères ou plus pour votre mot de passe.")
        .required("Mot de passe obligatoire"),
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
              Utiliser votre compte Pixou
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
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={Boolean(
                error || (formik.errors.email && formik.touched.email)
              )}
              helperText={
                formik.errors.email &&
                formik.touched.email && (
                  <>
                    <ErrorOutlinedIcon
                      color="inherit"
                      fontSize="inherit"
                      style={{ marginRight: "2px" }}
                    />
                    {formik.errors.email}
                  </>
                )
              }
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
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={Boolean(
                error || (formik.errors.password && formik.touched.password)
              )}
              helperText={
                formik.errors.password &&
                formik.touched.password && (
                  <>
                    <ErrorOutlinedIcon
                      color="inherit"
                      fontSize="inherit"
                      style={{ marginRight: "2px" }}
                    />
                    {formik.errors.password}
                  </>
                )
              }
            />
            <FormHelperText
              id="my-helper-text"
              error={Boolean(error)}
              hidden={!Boolean(error)}
              style={{ marginLeft: 0 }}
            >
              <ErrorOutlinedIcon
                color="inherit"
                fontSize="inherit"
                style={{ marginRight: "2px" }}
              />
              {error}
            </FormHelperText>
          </Box>
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
            variant="caption"
            color="text.secondary"
            mt={3}
          >
            L’argent n’est pas le but. L’argent n’a aucune valeur. La valeur
            vient des rêves que l’argent aide à réaliser.
          </Typography>
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
          <Button type="submit" variant="contained" onClick={formik.submitForm}>
            Se connecter
          </Button>
        </CardActions>
      </Card>
    </LayoutSplited>
  );
}
