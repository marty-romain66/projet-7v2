import React, { useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logModalChange } from "../feature/loginModal.slice";
import { auths } from "../feature/auth.slice";
import SignUp from "./SignUp";

const theme = createTheme();
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.logModal.logModal);
  const auth = useSelector((state) => state.auth.auth);

  const login = (email, password) => {
    return axios
      .post("http://localhost:3001/api/auth/login", {
        email,
        password,
      })

      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));

          dispatch(auths(response.data));
        }

        return response.data;
      })
      .catch((error) => {
        setErrorMsg(error.response.data.error);
        console.log(error.response.data.error);
      });
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    login(email, password).then(() => {});
  };

  return (
    <>
      {modal === null ? (
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
              sx={{
                m: "auto",
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Se connecter
              </Typography>
              <Box
                component="form"
                onSubmit={handleLogin}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  onChange={onChangeEmail}
                  value={email}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoFocus
                />
                <TextField
                  onChange={onChangePassword}
                  value={password}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                {errorMsg && (
                  <Typography color="red" component="h3" variant="h6">
                    {errorMsg}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Se connecter
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      style={{ cursor: "pointer" }}
                      onClick={() => dispatch(logModalChange(true))}
                      variant="body2"
                    >
                      S'inscrire
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      ) : (
        <SignUp />
      )}
    </>
  );
}
