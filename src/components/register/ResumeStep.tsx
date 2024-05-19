import React, { ChangeEvent, Dispatch, useCallback, useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

import { MainContainer } from "./styledComponents";
import { FIELD_NAMES, LOCATION_NAMES } from "./types";

interface ResumeStepProps {
  handleNext: () => void;
  dirty: Record<FIELD_NAMES | LOCATION_NAMES, boolean>;
  setDirty: Dispatch<
    React.SetStateAction<Record<FIELD_NAMES | LOCATION_NAMES, boolean>>
  >;
  user: Record<FIELD_NAMES | LOCATION_NAMES, string>;

  setUser: Dispatch<
    React.SetStateAction<Record<FIELD_NAMES | LOCATION_NAMES, string>>
  >;
}

const ResumeStep = ({
  handleNext,
  dirty,
  setDirty,
  user,
  setUser,
}: ResumeStepProps) => {
  const isDisabled = !user.resume;

  const onNext = () => {
    handleNext();
  };

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value, name } = event.target;

      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    },
    [setUser]
  );

  const handleBlur = useCallback(
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      state: boolean
    ) => {
      const { name } = event.target;

      setDirty((prevDirty) => ({
        ...prevDirty,
        [name]: state,
      }));
    },
    [dirty]
  );

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
