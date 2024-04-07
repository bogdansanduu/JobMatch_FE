import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
import isEmail from "validator/lib/isEmail";
import { AxiosError } from "axios";

import { AppRoutes } from "../utils/constants/routes";

import Copyright from "../components/auth/Copyright";
import AppApi from "../server/api/AppApi";
import { useNavigate } from "react-router-dom";

const authApi = AppApi.getAuthApi();
enum FIELD_NAMES {
  firstName = "firstName",
  lastName = "lastName",
  email = "email",
  password = "password",
  retypedPassword = "retypedPassword",
}

const RegisterPage = () => {
  const [user, setUser] = useState<Record<FIELD_NAMES, string>>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    retypedPassword: "",
  });
  const [dirty, setDirty] = useState<Record<FIELD_NAMES, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    retypedPassword: false,
  });
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const navigate = useNavigate();

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { password, retypedPassword } = user;

    if (password !== retypedPassword) {
      setUser((prevUser) => ({
        ...prevUser,
        password: "",
        retypedPassword: "",
      }));
      setDirty((prevDirty) => ({
        ...prevDirty,
        password: true,
        retypedPassword: true,
      }));
      alert("Passwords do not match");
      return;
    }

    try {
      await authApi.register({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });

      navigate(AppRoutes.Login);
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      const messageMessage =
        axiosError?.response?.data.error || "An error occurred";

      alert(messageMessage);
    }
  };

  useEffect(() => {
    const { firstName, lastName, email, password, retypedPassword } = user;

    const isDisabled =
      !!firstName &&
      !!lastName &&
      !!password &&
      !!retypedPassword &&
      !!email &&
      isEmailValid;

    setIsSubmitDisabled(isDisabled);
  }, [user, isEmailValid]);

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
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={dirty.firstName && !user.firstName}
                label={"First Name"}
                name={FIELD_NAMES.firstName}
                variant={"outlined"}
                value={user.firstName}
                onChange={(e) => handleChange(e)}
                fullWidth
                required
                margin={"normal"}
                type={"text"}
                onBlur={(e) => handleBlur(e, true)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={dirty.lastName && !user.lastName}
                label={"Last Name"}
                name={FIELD_NAMES.lastName}
                variant={"outlined"}
                value={user.lastName}
                onChange={(e) => handleChange(e)}
                fullWidth
                required
                margin={"normal"}
                type={"text"}
                onBlur={(e) => handleBlur(e, true)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={dirty.email && !user.email && !isEmailValid}
                label={"Email Address"}
                name={FIELD_NAMES.email}
                variant={"outlined"}
                value={user.email}
                onChange={(e) => handleChange(e)}
                fullWidth
                required
                margin={"normal"}
                type={"email"}
                onBlur={(e) => handleBlur(e, true)}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={dirty.retypedPassword && !user.retypedPassword}
                label={"Retype Password"}
                name={FIELD_NAMES.retypedPassword}
                variant={"outlined"}
                value={user.retypedPassword}
                onChange={(e) => handleChange(e)}
                fullWidth
                required
                margin="normal"
                type={"password"}
                onBlur={(e) => handleBlur(e, true)}
              />
            </Grid>
          </Grid>
          <Button
            disabled={!isSubmitDisabled}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={AppRoutes.Login} variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default RegisterPage;
