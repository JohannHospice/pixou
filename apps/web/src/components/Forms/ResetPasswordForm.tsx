import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/authentification";
import { useState } from "react";
import { LOGIN_ROUTE } from "../../constants/routes";
import { toast } from "react-toastify";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { useTheme } from "@emotion/react";

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();
  const theme = useTheme();

  const formik = useFormik({
    onSubmit: async ({ email }) => {
      try {
        await resetPassword({ email });
        toast("Un e-mail contenant un code de validation vous a été envoyé.");
        navigate(LOGIN_ROUTE);
      } catch (err) {
        console.error(err);
        if (err.code === "auth/user-not-found") {
          setError("Impossible de trouver votre compte Pixou");
        } else {
          setError("Une erreur s'est produite");
        }
      }
    },
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Saisissez une adresse e-mail valide.")
        .required("E-mail obligatoire"),
    }),
  });

  return (
    <>
      <CardContent
        style={{
          maxWidth: "400px",
          padding: "48px 36px 0 36px ",
        }}
      >
        <Box
          alignItems={"center"}
          justifyContent={"center"}
          display={"flex"}
          flexDirection="column"
        >
          <Logo
            style={{
              fill: theme.palette.primary.main,
              width: "fit-content",
              height: "24px",
              marginBottom: "16px",
            }}
          />
          <Typography component="h1" variant="h5">
            Récupération de compte
          </Typography>
          <Typography component="h2" variant="body2" textAlign={"center"}>
            Afin de protéger votre compte, Pixou veut s'assurer que c'est bien
            vous qui essayez de vous connecter. Un e-mail contenant un code de
            validation vous sera envoyé.
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
              (error || (formik.errors.email && formik.touched.email)) && (
                <>
                  <ErrorOutlinedIcon
                    color="inherit"
                    fontSize="inherit"
                    style={{ marginRight: "2px" }}
                  />
                  {formik.errors.email || error}
                </>
              )
            }
          />
        </Box>
      </CardContent>
      <CardActions
        style={{
          padding: "28px 36px 48px 28px",
          justifyContent: "space-between",
        }}
      >
        <Button component={Link} to={LOGIN_ROUTE} color="primary">
          Annuler
        </Button>
        <Button variant="contained" onClick={formik.submitForm}>
          Se connecter
        </Button>
      </CardActions>
    </>
  );
}
