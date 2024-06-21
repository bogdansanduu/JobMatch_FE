import { ChangeEvent, MouseEvent, useState } from "react";
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
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

import { useAppDispatch } from "../store/hooks";
import { login, setLoggedUser, setToken } from "../store/slices/AuthSlice";

import { AppRoutes } from "../utils/constants/routes";
import { Roles } from "../utils/constants/roles";

import Copyright from "../components/auth/Copyright";
import AppApi from "../server/api/AppApi";

enum FIELD_NAMES {
  email = "email",
  password = "password",
}

const LoginPage = () => {
  const authApi = AppApi.getAuthApi();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState<Record<FIELD_NAMES, string>>({
    email: "",
    password: "",
  });
  const [dirty, setDirty] = useState<Record<FIELD_NAMES, boolean>>({
    email: false,
    password: false,
  });

  const [isEmailValid, setIsEmailValid] = useState(false);

  const isSubmitDisabled = !user.password || !user.email || !isEmailValid;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    if (name === FIELD_NAMES.email) {
      setIsEmailValid(isEmail(value));
    }
  };

  const handleBlur = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    state: boolean
  ) => {
    const { name } = event.target;

    setDirty((prevDirty) => ({
      ...prevDirty,
      [name]: state,
    }));
  };

  const handleSubmit = async (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault();

    const { email, password } = user;

    try {
      const { payload } = await dispatch(login({ email, password }));
      const userLogged = payload.user;

      switch (userLogged.role) {
        case Roles.USER:
          navigate(AppRoutes.Home);
          return;
        case Roles.ADMIN:
          navigate(AppRoutes.HomeAdmin);
          return;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
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
          Sign in as a User
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            error={dirty.email && !user.email && !isEmailValid}
            label={"Email Address"}
            name={FIELD_NAMES.email}
            variant={"outlined"}
            value={user.email}
            onChange={(e) => handleChange(e)}
            fullWidth
            required
            margin="normal"
            type={"email"}
            onBlur={(e) => handleBlur(e, true)}
          />
          <TextField
            error={dirty.password && !user.password}
            label={"Password"}
            name={FIELD_NAMES.password}
            variant={"outlined"}
            value={user.password}
            onChange={(e) => handleChange(e)}
            fullWidth
            required
            margin="normal"
            type={"password"}
            onBlur={(e) => handleBlur(e, true)}
          />
          <Button
            disabled={isSubmitDisabled}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={(e) => handleSubmit(e)}
          >
            Log In
          </Button>
          <Box
            sx={{
              mt: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Link href={AppRoutes.Register} variant="body2">
              Don't have an account? Sign Up
            </Link>
            <Link href={AppRoutes.LoginCompany} variant="body2">
              Sign in as a Company
            </Link>
            <Copyright />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
export default LoginPage;
