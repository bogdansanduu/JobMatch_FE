import React, { ChangeEvent } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

import { MainContainer } from "./styledComponents";
import { FIELD_NAMES, LOCATION_NAMES } from "./types";

interface ResumeStepProps {
  user: Record<FIELD_NAMES | LOCATION_NAMES, string>;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  dirty: Record<FIELD_NAMES | LOCATION_NAMES, boolean>;
  handleBlur: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    state: boolean
  ) => void;

  handleNext: () => void;
}

const ResumeStep = ({
  user,
  handleChange,
  dirty,
  handleBlur,
  handleNext,
}: ResumeStepProps) => {
  const isDisabled = !user.resume;

  const onNext = () => {
    handleNext();
  };

  return (
    <MainContainer>
      <TextField
        error={dirty.resume && !user.resume}
        label={"Paste your resume here"}
        name={FIELD_NAMES.resume}
        variant={"outlined"}
        value={user.resume}
        onChange={(e) => handleChange(e)}
        fullWidth
        required
        margin={"normal"}
        type={"text"}
        onBlur={(e) => handleBlur(e, true)}
        multiline
        minRows={4}
        sx={{ mb: 2 }}
        placeholder="Include all relevant work and education details."
      />
      <Button
        disabled={isDisabled}
        onClick={onNext}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Next
      </Button>
    </MainContainer>
  );
};

export default ResumeStep;
