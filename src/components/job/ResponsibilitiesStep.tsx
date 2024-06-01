import React, { ChangeEvent } from "react";
import { Box, Divider, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import { FIELD_NAMES_JOB } from "../register/types";
import { LOCATION_NAMES } from "../../pages/user-pages/CreateCompanyAccount";

interface ResponsibilitiesStepProps {
  jobData: Record<FIELD_NAMES_JOB | LOCATION_NAMES, string>;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  dirty: Record<FIELD_NAMES_JOB | LOCATION_NAMES, boolean>;
  handleBlur: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    state: boolean
  ) => void;

  handleNext: () => void;
}

const ResponsibilitiesStep = ({
  jobData,
  handleChange,
  dirty,
  handleBlur,
  handleNext,
}: ResponsibilitiesStepProps) => {
  const isDisabled = !!jobData.responsibilities;

  const onNext = () => {
    handleNext();
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
      <Divider flexItem />
      <TextField
        label={"Responsibilities"}
        name={FIELD_NAMES_JOB.responsibilities}
        variant={"outlined"}
        value={jobData.responsibilities}
        onChange={(e) => handleChange(e)}
        fullWidth
        required
        error={dirty.responsibilities && !jobData.responsibilities}
        margin={"normal"}
        type={"text"}
        multiline
        rows={7}
        placeholder={"Include all relevant job responsibilities."}
        onBlur={(e) => handleBlur(e, true)}
      />
      <Button
        disabled={!isDisabled}
        onClick={onNext}
        fullWidth
        variant="contained"
        sx={{ mt: "auto", mb: 2 }}
      >
        Next
      </Button>
    </Box>
  );
};

export default ResponsibilitiesStep;
