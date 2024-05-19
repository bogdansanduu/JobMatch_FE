import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

import { AppRoutes } from "../../utils/constants/routes";

import { FIELD_NAMES, LOCATION_NAMES } from "./types";
import AppApi from "../../server/api/AppApi";
import { MainContainer } from "./styledComponents";

interface SubmitStepProps {
  user: Record<FIELD_NAMES | LOCATION_NAMES, string>;
}
const SubmitStep = ({ user }: SubmitStepProps) => {
  const authApi = AppApi.getAuthApi();

  const navigate = useNavigate();

  console.log(user);

  const handleSubmit = async () => {
    try {
      await authApi.register({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        resume: user.resume,
        password: user.password,
        country: user.country,
        state: user.state,
        city: user.city,
      });

      navigate(AppRoutes.Login);
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      const messageMessage =
        axiosError?.response?.data.error || "An error occurred";

      alert(messageMessage);
    }
  };

  return (
    <MainContainer>
      <Typography>Submit</Typography>
      <Button
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Submit
      </Button>
    </MainContainer>
  );
};

export default SubmitStep;
