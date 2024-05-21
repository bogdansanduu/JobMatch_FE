import React from "react";
import { FIELD_NAMES_JOB } from "../register/types";
import { LOCATION_NAMES } from "../../pages/CreateCompanyAccount";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import AppApi from "../../server/api/AppApi";
import { AxiosError } from "axios";
import { getLoggedCompany } from "../../store/slices/AuthSlice";

interface SubmitJobListingStepProps {
  jobData: Record<FIELD_NAMES_JOB | LOCATION_NAMES, string>;
  latLng: { lat: number; lng: number };
  handleNext: () => void;
}

const SubmitJobListingStep = ({
  jobData,
  latLng,
  handleNext,
}: SubmitJobListingStepProps) => {
  const jobApi = AppApi.getJobApi();

  const currentCompany = useAppSelector(getLoggedCompany);

  console.log(jobData);
  console.log(latLng);

  const handleSubmit = async () => {
    try {
      await jobApi.createJobListing({
        title: jobData.title,
        description: jobData.description,
        category: jobData.category,
        country: jobData.country,
        state: jobData.state,
        city: jobData.city,
        lat: latLng.lat,
        lng: latLng.lng,
        responsibilities: jobData.responsibilities,
        minimumQualifications: jobData.minimumQualifications,
        preferredQualifications: jobData.preferredQualifications,
        companyId: currentCompany?.id || -1,
      });
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      const messageMessage =
        axiosError?.response?.data.error || "An error occurred";

      alert(messageMessage);
    } finally {
      handleNext();
    }
  };

  return (
    <Box
      sx={{
        flex: 4,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        alignSelf: "stretch",
      }}
    >
      <Typography variant={"body1"}>Job Title: {jobData.title}</Typography>
      <Typography variant={"body1"}>
        Are you sure all the details are correct? If not, check them again and
        then submit the job listing.
      </Typography>
      <Button
        onClick={handleSubmit}
        fullWidth
        variant="contained"
        sx={{ mt: "auto", mb: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default SubmitJobListingStep;
