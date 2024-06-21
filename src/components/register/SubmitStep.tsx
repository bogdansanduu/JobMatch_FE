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
  file: File | undefined;
}
const SubmitStep = ({ user, file }: SubmitStepProps) => {
  const authApi = AppApi.getAuthApi();

  const navigate = useNavigate();

  const toBase64 = (
    file?: File,
    maxWidth = 800,
    maxHeight = 800,
    quality = 0.5
  ): Promise<string> => {
    if (!file) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Calculate the new dimensions while maintaining aspect ratio
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.floor(height * (maxWidth / width));
              width = maxWidth;
            } else {
              width = Math.floor(width * (maxHeight / height));
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
            resolve(compressedDataUrl);
          } else {
            reject(new Error("Failed to get canvas context"));
          }
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleSubmit = async () => {
    try {
      const base64ProfilePicture = await toBase64(file);

      await authApi.register({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: base64ProfilePicture,
        currentPosition: user.currentPosition,
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
      <Typography>Submit and Create Account</Typography>
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
