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
  useTheme,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/authentification";
import { useState } from "react";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../constants/routes";
import { toast } from "react-toastify";
import { ReactComponent as LogoText } from "../../assets/logos/logo-text.svg";

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
      } catch (err: any) {
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
          {" "}
          <Link to={HOME_ROUTE}>
            <LogoText
              fill={theme.palette.primary.main}
              style={{
                width: "fit-content",
                height: "24px",
                marginBottom: "16px",
              }}
            />{" "}
          </Link>
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
        <Button component={Link} to={LOGIN_ROUTE} color="primary">
          Annuler
        </Button>
        <LoadingButton
          loading={formik.isSubmitting}
          loadingPosition="start"
          variant="contained"
          onClick={formik.submitForm}
        >
          Se connecter
        </LoadingButton>
      </CardActions>
    </>
  );
}
