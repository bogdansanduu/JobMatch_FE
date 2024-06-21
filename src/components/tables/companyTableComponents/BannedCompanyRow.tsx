import React from "react";

import {
  CompanyType,
  setCurrentCompany,
} from "../../../store/slices/CompanySlice";
import { useAppDispatch } from "../../../store/hooks";
import { Avatar, TableCell, TableRow, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

interface BanCompanyRowProps {
  company: CompanyType;
  setOpenUnbanModal: (value: boolean) => void;
}
const BannedCompanyRow = ({
  company,
  setOpenUnbanModal,
}: BanCompanyRowProps) => {
  const dispatch = useAppDispatch();

  const handleUnbanClick = async () => {
    await dispatch(setCurrentCompany(company));

    setOpenUnbanModal(true);
  };

  return (
    <TableRow
      sx={{
        backgroundColor: "rgba(128,128,128,0.05)",
      }}
    >
      <TableCell
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <Avatar
          src={company.profilePicture}
          alt={company.name}
          sx={{
            width: 35,
            height: 35,
            filter: "grayscale(100%)",
          }}
        />
        <Typography variant="body2" sx={{ color: "gray" }}>
          {`${company.name}`}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2" sx={{ color: "gray" }}>
          {company.email}
        </Typography>
      </TableCell>
      <TableCell
        align="center"
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <Avatar
          src={company.owner.profilePicture}
          alt={company.owner.firstName}
          sx={{
            width: 35,
            height: 35,
            filter: "grayscale(100%)",
          }}
        />
        <Typography variant="body2" sx={{ color: "gray" }}>
          {`${company.owner.firstName} ${company.owner.lastName}`}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <IconButton size="small" onClick={handleUnbanClick}>
          <LockOpenOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default BannedCompanyRow;
