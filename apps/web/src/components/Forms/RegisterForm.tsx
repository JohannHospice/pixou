import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
// import { ReactComponent as IllustrationCryptoPortfolio } from "../../assets/illustrations/crypto-portfolio-gold.svg";
import { ReactComponent as Logo } from "../../assets/logos/logo-text.svg";
import { register } from "../../api/authentification";
import React, { useState } from "react";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { useEffect } from "react";
import { LOGIN_ROUTE } from "../../constants/routes";

export default function RegisterForm() {
  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const [error, setError] = useState<string | undefined>();
  const theme = useTheme();
  const formik = useFormik({
    onSubmit: async ({ email, password, firstName, lastName }) => {
      try {
        await register({ email, password, firstName, lastName });
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          formik.setFieldError(
            "email",
            "Cette adresse e-mail est déjà utilisé. Essayer une autre adresse."
          );
          setError(undefined);
        } else {
          setError("Impossible de créer votre compte Pixou");
        }
      }
    },
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Saisissez une adresse e-mail valide.")
        .required("E-mail obligatoire"),
      password: Yup.string()
        .min(8, "Utilisez 8 caractères ou plus pour votre mot de passe.")
        .required("Mot de passe obligatoire"),
      passwordConfirm: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          "Ces mots de passe ne correspondent pas. Veuillez réessayer."
        )
        .required("Mot de passe obligatoire"),
      firstName: Yup.string().required("Prénom obligatoire"),
      lastName: Yup.string().required("Nom obligatoire"),
    }),
  });

  useEffect(() => {
    if (formik.isSubmitting && error) {
      setError(undefined);
    }
  }, [formik, error]);

  return (
    <CardContent
      style={{
        maxWidth: "748px",
        padding: "48px 36px 0 36px",
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={false} sm={12} md={7}>
          <Box display={"flex"} flexDirection="column">
            <Logo
              style={{
                fill: theme.palette.primary.main,
                width: "fit-content",
                height: "24px",
                marginBottom: "16px",
              }}
            />
            <Typography component="h1" variant="h5">
              Créer votre compte Pixou
            </Typography>
          </Box>
          <Box
            component="form"
            noValidate
            sx={{ mt: 2 }}
            onSubmit={formik.handleSubmit}
          >
            <FormControl margin="normal" fullWidth>
              <Box display={"flex"}>
                <TextField
                  margin="none"
                  required
                  id="firstName"
                  label="Prénom"
                  name="firstName"
                  autoComplete="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  error={Boolean(
                    error ||
                      (formik.errors.firstName && formik.touched.firstName)
                  )}
                  fullWidth
                  style={{
                    marginRight: "7px",
                  }}
                />
                <TextField
                  margin="none"
                  required
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  error={Boolean(
                    error || (formik.errors.lastName && formik.touched.lastName)
                  )}
                  fullWidth
                  style={{
                    marginLeft: "7px",
                  }}
                />
              </Box>
              <FormHelperText
                id="my-helper-text"
                error={Boolean(
                  (formik.errors.firstName && formik.touched.firstName) ||
                    (formik.errors.lastName && formik.touched.lastName)
                )}
                hidden={
                  !Boolean(
                    (formik.errors.firstName && formik.touched.firstName) ||
                      (formik.errors.lastName && formik.touched.lastName)
                  )
                }
                style={{ marginLeft: 0 }}
              >
                <ErrorOutlinedIcon
                  color="inherit"
                  fontSize="inherit"
                  style={{ marginRight: "2px" }}
                />
                {(formik.errors.firstName &&
                  formik.touched.firstName &&
                  formik.errors.firstName) ||
                  (formik.errors.lastName &&
                    formik.touched.lastName &&
                    formik.errors.lastName)}
              </FormHelperText>
            </FormControl>
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

            <FormControl margin="normal" fullWidth>
              <Box display={"flex"}>
                <TextField
                  margin="none"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type={passwordFieldType}
                  id="password"
                  autoComplete="current-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error={Boolean(
                    error || (formik.errors.password && formik.touched.password)
                  )}
                  style={{
                    marginRight: "7px",
                  }}
                />
                <TextField
                  margin="none"
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Confirmation du mot de passe"
                  type={passwordFieldType}
                  id="passwordConfirm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  error={Boolean(
                    error ||
                      (formik.errors.passwordConfirm &&
                        formik.touched.passwordConfirm)
                  )}
                  style={{
                    marginLeft: "7px",
                  }}
                />
              </Box>
              <FormHelperText
                id="my-helper-text"
                error={Boolean(
                  error ||
                    (formik.errors.password && formik.touched.password) ||
                    (formik.errors.passwordConfirm &&
                      formik.touched.passwordConfirm)
                )}
                hidden={
                  !Boolean(
                    error ||
                      (formik.errors.password && formik.touched.password) ||
                      (formik.errors.passwordConfirm &&
                        formik.touched.passwordConfirm)
                  )
                }
                style={{ marginLeft: 0 }}
              >
                <ErrorOutlinedIcon
                  color="inherit"
                  fontSize="inherit"
                  style={{ marginRight: "2px" }}
                />
                {error ||
                  (formik.errors.password &&
                    formik.touched.password &&
                    formik.errors.password) ||
                  (formik.errors.passwordConfirm &&
                    formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm)}
              </FormHelperText>

              <FormHelperText
                id="my-helper-text"
                hidden={Boolean(
                  (formik.errors.passwordConfirm &&
                    formik.touched.passwordConfirm) ||
                    (formik.errors.password && formik.touched.password)
                )}
              >
                Utilisez au moins huit caractères avec des lettres, des chiffres
                et des symboles.
              </FormHelperText>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(event) => {
                    if (event.target.checked) {
                      setPasswordFieldType("text");
                    } else {
                      setPasswordFieldType("password");
                    }
                  }}
                />
              }
              label="Afficher le mot de passe"
            />
          </Box>
          <CardActions
            style={{
              padding: "28px 0 48px 0",
              justifyContent: "space-between",
            }}
          >
            <Button component={Link} to={LOGIN_ROUTE} color="primary">
              Se connecter à un compte existant
            </Button>
            <Button variant="contained" onClick={formik.submitForm}>
              S'inscrire
            </Button>
          </CardActions>
        </Grid>
        <Grid
          md={5}
          item
          display={"flex"}
          flexDirection="column"
          alignItems="center"
          justifyContent={"center"}
          sx={{
            display: { xs: "none", sm: "none", md: "flex" },
            justifyContent: "flex-end",
          }}
        >
          {/* <Typography variant="caption" textAlign={"center"} mt={2}>
            L'investissement en cryptomonnaie n'aura jamais été aussi simple.
          </Typography> */}
        </Grid>
      </Grid>
    </CardContent>
  );
}
