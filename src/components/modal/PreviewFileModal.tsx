import React from "react";

import { AppModal } from "./AppModal";
import PreviewFileContent from "../previewFile/PreviewFileContent";
import { ResumeFile } from "../../store/slices/UserSlice";

interface PreviewFileModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  file: ResumeFile;
}

const PreviewFileModal = ({ open, setOpen, file }: PreviewFileModalProps) => {
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <AppModal open={open}>
      <PreviewFileContent file={file} closePreview={handleCloseModal} />
    </AppModal>
  );
};

export default PreviewFileModal;
