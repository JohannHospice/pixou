import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ReactComponent as IllustrationCryptoPortfolio } from "../../assets/illustrations/crypto-portfolio-gold.svg";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { register } from "../../api/authentification";
import LayoutSplited from "../../components/LayoutSplited";
import { toast } from "react-toastify";
import React, { useState } from "react";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import getTheme, { THEME_MODE, THEME_MODE_ALT } from "../../theme";
export default function RegisterPage() {
  const [passwordFieldType, setPasswordFieldType] = useState("2px");

  const formik = useFormik({
    onSubmit: async ({ email, password, firstName, lastName }) => {
      try {
        await register({ email, password, firstName, lastName });
        toast("Connexion réussi !");
      } catch (err) {
        toast(JSON.stringify(err));
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

  return (
    <LayoutSplited>
      <Card
        variant="outlined"
        style={{
          maxWidth: "748px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent
          style={{
            padding: "48px 36px 0 36px",
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={false} sm={4} md={7}>
              <Box display={"flex"} flexDirection="column">
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
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
                <FormControl margin="normal">
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
                        formik.errors.firstName && formik.touched.firstName
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
                        formik.errors.lastName && formik.touched.lastName
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
                  error={Boolean(formik.errors.email && formik.touched.email)}
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

                <FormControl margin="normal">
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
                        formik.errors.password && formik.touched.password
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
                        formik.errors.passwordConfirm &&
                          formik.touched.passwordConfirm
                      )}
                      style={{
                        marginLeft: "7px",
                      }}
                    />
                  </Box>
                  <FormHelperText
                    id="my-helper-text"
                    error={Boolean(
                      (formik.errors.password && formik.touched.password) ||
                        (formik.errors.passwordConfirm &&
                          formik.touched.passwordConfirm)
                    )}
                    hidden={
                      !Boolean(
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
                    {(formik.errors.password &&
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
                    Utilisez au moins huit caractères avec des lettres, des
                    chiffres et des symboles.
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
                <Button component={Link} to="/login" color="primary">
                  Se connecter à un compte existant
                </Button>
                <Button variant="contained" onClick={formik.submitForm}>
                  S'inscrire
                </Button>
              </CardActions>
            </Grid>
            <Grid
              xs={12}
              sm={8}
              md={5}
              item
              display={"flex"}
              flexDirection="column"
              alignItems="center"
              justifyContent={"center"}
            >
              <IllustrationCryptoPortfolio
                style={{ width: "100%", height: "fit-content" }}
              />
              <Typography variant="caption" textAlign={"center"} mt={2}>
                L'investissement en cryptomonnaie n'aura jamais été aussi
                simple.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </LayoutSplited>
  );
}
