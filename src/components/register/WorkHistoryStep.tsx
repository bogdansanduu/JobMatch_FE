import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { MainContainer } from "./styledComponents";

interface WorkHistoryStepProps {
  handleNext: () => void;
}

const WorkHistoryStep = ({ handleNext }: WorkHistoryStepProps) => {
  const onNext = () => {
    handleNext();
  };

  return (
    <MainContainer>
      <Typography>Work History</Typography>
      <Button
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

export default WorkHistoryStep;
