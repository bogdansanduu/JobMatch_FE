import React from "react";

import { AppModal } from "./AppModal";
import UploadFile from "../uploadFile/UploadFile";

interface UploadFileModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const UploadFileModal = ({ open, setOpen }: UploadFileModalProps) => {
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <AppModal open={open}>
      <UploadFile closeModal={handleCloseModal} />
    </AppModal>
  );
};

export default UploadFileModal;
