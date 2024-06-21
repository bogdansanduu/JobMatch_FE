import React from "react";
import { Button, styled } from "@mui/material";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import Stack from "@mui/material/Stack";

import { Blue, GrayColors, Green } from "../../utils/constants/colorPallete";
import { BodyText5 } from "../typography/BodyTexts";

const CardContainer = styled(Box)`
  display: flex;
  align-items: center;

  padding: 16px;
  border-radius: 4px;
  border: 1px solid #e0e2e9;
  background-color: #fbfcff;
`;

interface ProfilePictureUploadCardProps {
  file: File;
  setFile: (file: File | undefined) => void;
}

const ProfilePictureUploadCard = ({
  file,
  setFile,
}: ProfilePictureUploadCardProps) => {
  const handleRemoveFile = () => {
    setFile(undefined);
  };

  return (
    <CardContainer>
      <CheckCircleIcon
        sx={{
          marginRight: "16px",
          fill: Green.PrimaryGreen,
          width: "24px",
          height: "24px",
        }}
      />

      <Stack>
        <BodyText5 style={{ wordBreak: "break-all", marginRight: "4px" }}>
          {file.name}
        </BodyText5>
      </Stack>
      <Button
        sx={{
          marginLeft: "auto",
          textTransform: "none",
          color: GrayColors.Gray10,
        }}
        endIcon={
          <RemoveCircleOutlineOutlinedIcon
            sx={{ fontSize: "14px !important", color: Blue.PrimaryBlue }}
          />
        }
        onClick={handleRemoveFile}
      >
        Remove
      </Button>
    </CardContainer>
  );
};

export default ProfilePictureUploadCard;
