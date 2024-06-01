import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, styled } from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import { BodyText5 } from "../typography/BodyTexts";

import AppApi from "../../server/api/AppApi";
import { Blue, GrayColors, Green } from "../../utils/constants/colorPallete";
import { FileToUpload } from "./UploadFile";

const CardContainer = styled(Box)`
  display: flex;
  align-items: center;

  padding: 16px;
  border-radius: 4px;
  border: 1px solid #e0e2e9;
  background-color: #fbfcff;
`;

interface FileUploadCardProps {
  file: FileToUpload;
  progress: number;
  removeFileByKey: () => void;
}

const FileUploadCard = ({
  file,
  progress,
  removeFileByKey,
}: FileUploadCardProps) => {
  const s3DocumentApi = AppApi.getS3DocumentApi();

  const [loading, setLoading] = useState(false);

  const handleRemoveFile = async () => {
    if (!file.documentKey) {
      return;
    }

    try {
      setLoading(true);
      await s3DocumentApi.deleteDocument(file.documentKey);

      removeFileByKey();
    } catch (e) {
      console.log("e ------------------->> ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContainer>
      {progress < 100 ? (
        <UploadFileOutlinedIcon sx={{ marginRight: "16px" }} />
      ) : (
        <CheckCircleIcon
          sx={{
            marginRight: "16px",
            fill: Green.PrimaryGreen,
            width: "24px",
            height: "24px",
          }}
        />
      )}
      <Stack>
        <BodyText5 style={{ wordBreak: "break-all", marginRight: "4px" }}>
          {file.file.name}
        </BodyText5>
        <BodyText5 style={{ fontWeight: 400 }} color={GrayColors.Gray6}>
          {progress}% uploaded
        </BodyText5>
      </Stack>
      {progress < 100 ? (
        <CircularProgress
          variant={"determinate"}
          value={progress}
          sx={{ marginLeft: "auto" }}
          thickness={5}
        />
      ) : (
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
          disabled={loading}
        >
          Remove
        </Button>
      )}
    </CardContainer>
  );
};

export default FileUploadCard;
