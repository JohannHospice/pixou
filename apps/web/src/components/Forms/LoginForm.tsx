import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  FormHelperText,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { Link } from "react-router-dom";
import { login } from "../../api/authentification";
import { useState } from "react";
import { REGISTER_ROUTE, RESET_PASSWORD_ROUTE } from "../../constants/routes";
import { ReactComponent as LogoText } from "../../assets/logos/logo-text.svg";

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>();
  const theme = useTheme();

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
    <>
      <CardContent
        sx={{
          maxWidth: { md: "400px", sm: "100%" },
          pt: "48px",
          pb: "0",
          px: {
            sm: "24px",
            md: "36px",
          },
        }}
      >
        <Box
          alignItems={"center"}
          justifyContent={"center"}
          display={"flex"}
          flexDirection="column"
        >
          <LogoText
            fill={theme.palette.primary.main}
            style={{
              width: "fit-content",
              height: "24px",
              marginBottom: "16px",
            }}
          />
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
          to={RESET_PASSWORD_ROUTE}
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
          L’argent n’est pas le but. L’argent n’a aucune valeur. La valeur vient
          des rêves que l’argent aide à réaliser.
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "space-between",
          pt: "36px",
          pb: "48px",
          pr: {
            xs: "18px",
            sm: "24px",
            md: "36px",
          },
          pl: {
            xs: "12px",
            sm: "18px",
            md: "28px",
          },
        }}
      >
        <Button component={Link} to={REGISTER_ROUTE} color="primary">
          Créer un compte
        </Button>
        <Button variant="contained" onClick={formik.submitForm}>
          Se connecter
        </Button>
      </CardActions>
      {/* <Copyright sx={{ mt: { sx: 5 }, display: { sx: "block", md: "none" } }} /> */}
    </>
  );
}
