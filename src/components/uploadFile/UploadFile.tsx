import React, { useRef, useState } from "react";
import { Stack, Typography, Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";
import { Bounce, toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { uploadUserResume } from "../../store/slices/UserSlice";
import {
  getLoggedUser,
  refreshCurrentUserData,
} from "../../store/slices/AuthSlice";

import DragAndDropIcon from "../../assets/drag-and-drop.svg";
import DragAndDropActiveIcon from "../../assets/darg-and-drop-active.svg";
import { GrayColors } from "../../utils/constants/colorPallete";

import {
  getUserResumeFileKey,
  isFileSizeValid,
  uploadDocumentSecurely,
} from "../../utils/s3/s3Utils";
import AppApi from "../../server/api/AppApi";
import {
  DragAndDropContainer,
  DragAndDropIconContainer,
  DragFileElement,
  Label,
  UploadButton,
} from "./styledComponents";
import { BodyText2 } from "../typography/BodyTexts";
import { checkIfFileSupported } from "./utils";
import FileUploadCard from "./FileUploadCard";

export interface FileToUpload {
  documentKey: string;
  file: File;
  isSupportedExtension: boolean;
  isSizeValid?: boolean;
}

interface UploadFileProps {
  closeModal: () => void;
}

const UploadFile = ({ closeModal }: UploadFileProps) => {
  const s3DocumentApi = AppApi.getS3DocumentApi();

  const currentLoggedUser = useAppSelector(getLoggedUser);

  const dispatch = useAppDispatch();

  const [file, setFile] = useState<FileToUpload | undefined>(undefined);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const doneButtonDisabled = uploadProgress > 0 && uploadProgress < 100;

  const handleCloseModal = async () => {
    const uploadedFileKey = file?.documentKey;

    if (!uploadedFileKey) {
      closeModal();
      return;
    }

    try {
      await s3DocumentApi.deleteDocument(uploadedFileKey);
    } catch (e) {
      toast.error("Error deleting file", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setFile(undefined);
      closeModal();
    }
  };

  const uploadFile = async (fileToUpload: FileToUpload) => {
    const file = fileToUpload.file;

    const preSignedUrl = await s3DocumentApi.generatePreSignedPutUrl(
      fileToUpload.documentKey,
      file.type
    );

    await uploadDocumentSecurely(preSignedUrl, file, (progress: number) => {
      setUploadProgress(progress);
    });
  };

  const handleAddUserResume = async (file: FileToUpload | undefined) => {
    if (!file || !currentLoggedUser) {
      return;
    }

    await dispatch(
      uploadUserResume({
        userId: currentLoggedUser.id,
        resumeDto: {
          fileKey: file.documentKey,
          fileName: file.file.name,
        },
      })
    );

    await dispatch(refreshCurrentUserData());

    toast.success("File uploaded successfully", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

    setFile(undefined);
    closeModal();
  };

  const removeFile = () => {
    setFile(undefined);
    setUploadProgress(0);
  };

  const handleAddFiles = async (newFile: File) => {
    if (!currentLoggedUser) {
      return;
    }

    const fileToAdd: FileToUpload = {
      isSupportedExtension: checkIfFileSupported(newFile),
      documentKey: getUserResumeFileKey(currentLoggedUser.id, newFile.name),
      file: newFile,
      isSizeValid: isFileSizeValid(newFile),
    };

    if (!fileToAdd.isSizeValid) {
      toast.error("File size invalid", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    if (!fileToAdd.isSupportedExtension) {
      toast.error("File extension invalid", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }

    if (!fileToAdd.isSupportedExtension || !fileToAdd.isSizeValid) {
      return;
    }

    setFile(fileToAdd);

    await uploadFile(fileToAdd);
    // await handleAddFilesToPatient(fileToAdd);
  };

  const onInputClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
  };

  const handleDrag = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    if (file) {
      toast.error("File already selected", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    if (event.dataTransfer.files && event.dataTransfer.files.length > 1) {
      toast.error("Only one file can be uploaded at a time", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      await handleAddFiles(event.dataTransfer.files[0]);
    }
  };

  const handleChange = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    if (file) {
      toast.error("File already selected", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    if (event.target.files && event.target.files.length > 1) {
      toast.error("Only one file can be uploaded at a time", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    if (event.target.files && event.target.files[0]) {
      await handleAddFiles(event.target.files[0]);
    }
  };

  return (
    <Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Typography variant={"h5"}>Upload Files</Typography>
        <IconButton size={"small"} onClick={handleCloseModal}>
          <Close fontSize={"small"} />
        </IconButton>
      </Box>

      <DragAndDropContainer onDragEnter={handleDrag}>
        <input
          ref={inputRef}
          id="input-file-upload"
          type={"file"}
          accept={".pdf"}
          style={{ display: "none" }}
          multiple
          onChange={handleChange}
          onClick={onInputClick}
        />
        <Label htmlFor="input-file-upload" dragActive={dragActive}>
          <Stack sx={{ alignItems: "center", gap: "16px" }}>
            <DragAndDropIconContainer
              src={dragActive ? DragAndDropActiveIcon : DragAndDropIcon}
              alt={"drag-and-drop-icon"}
            />
            <BodyText2
              style={{
                display: "inline-flex",
                gap: "4px",
                flexDirection: "row",
              }}
              fontWeight={"500"}
            >
              Drag and drop files here or <UploadButton>search</UploadButton>
            </BodyText2>
          </Stack>
        </Label>
        {dragActive && (
          <DragFileElement
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          />
        )}
      </DragAndDropContainer>
      <Typography
        sx={{ marginTop: "16px" }}
        variant={"subtitle2"}
        color={GrayColors.Gray5}
      >
        Files Supported: .pdf
      </Typography>
      <Stack
        sx={{ marginTop: "16px", gap: "8px", height: "100%", overflow: "auto" }}
      >
        {file && (
          <FileUploadCard
            file={file}
            progress={uploadProgress}
            removeFileByKey={removeFile}
          />
        )}
      </Stack>
      <Box
        sx={{
          display: "flex",
          marginTop: "24px",
          justifyContent: "flex-end",
          gap: "16px",
        }}
      >
        <Button
          variant={"contained"}
          color={"error"}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button
          variant={"contained"}
          onClick={() => handleAddUserResume(file)}
          disabled={doneButtonDisabled}
        >
          Upload
        </Button>
      </Box>
    </Stack>
  );
};

export default UploadFile;
