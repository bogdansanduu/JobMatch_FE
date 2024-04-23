import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import { White } from "../../utils/constants/colorPallete";

const modalStyle = {
  display: "flex",
  alignItems: "center",
};

const paperStyle = {
  maxWidth: "70%",
  background: White.PureWhite,
  zIndex: 10,
  borderRadius: "8px",
  fontWeight: "lighter",
};

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  alignRight?: boolean;
  disableEnforceFocus?: boolean;
  noPadding?: boolean;
  closeModal?: any;
  minWidth?: string;
  customWidth?: string;
  zIndex?: string;
}

export const AppModal = ({
  alignRight,
  open,
  closeModal,
  disableEnforceFocus,
  children,
  noPadding,
  minWidth,
  customWidth,
  zIndex,
}: ModalProps) => {
  const defaultPaperStyle = paperStyle;
  const currentMinWidth = minWidth || customWidth || "400px";
  const currentWidth = customWidth;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      sx={[
        modalStyle,
        {
          justifyContent: alignRight ? "flex-end" : "center",
          zIndex: zIndex || "1300",
        },
      ]}
      open={open}
      closeAfterTransition
      disableEnforceFocus={disableEnforceFocus}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      onClick={(e) => e.stopPropagation()}
      onClose={closeModal}
      keepMounted
    >
      <Fade in={open}>
        <Box
          sx={[
            defaultPaperStyle,
            {
              padding: noPadding ? 0 : "24px",
              minWidth: currentMinWidth,
              width: currentWidth,
            },
          ]}
        >
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};
