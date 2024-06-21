import React from "react";
import { Box, Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { banCompany, getCurrentCompany } from "../../store/slices/CompanySlice";

import { AppModal } from "./AppModal";

interface BanCompanyModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const BanCompanyModal = ({ open, setOpen }: BanCompanyModalProps) => {
  const company = useAppSelector(getCurrentCompany);

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleBanCompany = async () => {
    if (!company) {
      return;
    }

    await dispatch(
      banCompany({
        companyId: company.id,
        banned: true,
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
            {`Are you sure you want to ban ${company?.name}?`}
          </Typography>
          <IconButton sx={{ marginLeft: "auto" }} onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color={"text.secondary"}>
          <b>Warning!</b> This action will permanently ban the company from the
          platform. Once banned, they will no longer be able to access their
          account or any associated services. This action cannot be undone.
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
            color={"error"}
            onClick={handleBanCompany}
          >
            Ban Company
          </Button>
        </Box>
      </Box>
    </AppModal>
  );
};

export default BanCompanyModal;
