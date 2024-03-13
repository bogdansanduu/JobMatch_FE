import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import isEmail from "validator/lib/isEmail";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

const theme = createTheme();
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (event: any) => {
    const val = event.target.value;

    setEmail(val);
    setIsEmailValid(isEmail(val));
  };

  const handlePasswordChange = (event: any) => {
    const val = event.target.value;
    setPassword(val);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    dispatch(login({ email, password }));
    navigate("/home");
  };

  useEffect(() => {
    const isDisabled = !!password && isEmailValid;

    setIsSubmitDisabled(isDisabled);
  }, [password, isEmailValid]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              error={emailDirty && !isEmailValid}
              label={"Email Address"}
              name={"email"}
              variant="outlined"
              value={email}
              onChange={(e) => handleEmailChange(e)}
              fullWidth
              required
              margin="normal"
              type={"email"}
              onBlur={() => setEmailDirty(true)}
            />
            <TextField
              error={passwordDirty && !password}
              label={"Password"}
              name={"password"}
              variant="outlined"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              fullWidth
              required
              margin="normal"
              type={"password"}
              onBlur={() => setPasswordDirty(true)}
            />
            <Button
              disabled={!isSubmitDisabled}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default LoginPage;
