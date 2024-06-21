import React, { useRef, useState } from "react";
import { Stack } from "@mui/material";
import { Bounce, toast } from "react-toastify";

import DragAndDropActiveIcon from "../../assets/darg-and-drop-active.svg";
import DragAndDropIcon from "../../assets/drag-and-drop.svg";

import {
  DragAndDropContainer,
  DragAndDropIconContainer,
  DragFileElement,
  Label,
  UploadButton,
} from "./styledComponents";
import { BodyText2 } from "../typography/BodyTexts";
import ProfilePictureUploadCard from "./ProfilePictureUploadCard";
import { checkIfFileSupported } from "./utils";

interface UploadProfilePictureProps {
  file: File | undefined;
  setFile: (file: File | undefined) => void;
}

const UploadProfilePicture = ({ file, setFile }: UploadProfilePictureProps) => {
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddFiles = (newFile: File) => {
    const isFileSupported = checkIfFileSupported(newFile, [
      "png",
      "jpg",
      "jpeg",
    ]);

    if (!isFileSupported) {
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

      return;
    }

    setFile(newFile);
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
      handleAddFiles(event.dataTransfer.files[0]);
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
      handleAddFiles(event.target.files[0]);
    }
  };

  return (
    <Stack>
      <DragAndDropContainer onDragEnter={handleDrag}>
        <input
          ref={inputRef}
          id="input-file-upload"
          type={"file"}
          accept={".png,.jpg,.jpeg"}
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
              Drag and drop profile picture here or
              <UploadButton>search</UploadButton>
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
      <Stack
        sx={{ marginTop: "16px", gap: "8px", height: "100%", overflow: "auto" }}
      >
        {file && <ProfilePictureUploadCard file={file} setFile={setFile} />}
      </Stack>
    </Stack>
  );
};

export default UploadProfilePicture;
