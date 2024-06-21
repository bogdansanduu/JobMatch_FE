import React from "react";
import { Box, Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { banCompany, getCurrentCompany } from "../../store/slices/CompanySlice";

import { AppModal } from "./AppModal";

interface UnbanCompanyModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}
const UnbanCompanyModal = ({ open, setOpen }: UnbanCompanyModalProps) => {
  const company = useAppSelector(getCurrentCompany);

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleUnbanCompany = async () => {
    if (!company) {
      return;
    }

    await dispatch(
      banCompany({
        companyId: company.id,
        banned: false,
      })
    );
    setOpen(false);
  };

  return (
    <AppModal
      open={open}
      closeModal={handleCloseModal}
      noPadding
      customWidth={"500px"}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "24px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            style={{ marginRight: "8px" }}
            variant="subtitle2"
            color={"text.primary"}
          >
            {`Are you sure you want to unban ${company?.name}?`}
          </Typography>
          <IconButton sx={{ marginLeft: "auto" }} onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color={"text.secondary"}>
          <b>Warning!</b> This action will unban the company from the platform.
          Once unbanned, they will be able to access their account and
          associated services.
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          Are you sure you want to proceed?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <Button variant={"outlined"} onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant={"contained"}
            color={"success"}
            onClick={handleUnbanCompany}
          >
            Unban Company
          </Button>
        </Box>
      </Box>
    </AppModal>
  );
};

export default UnbanCompanyModal;
