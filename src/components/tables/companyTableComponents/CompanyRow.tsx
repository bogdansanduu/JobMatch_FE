import React from "react";
import { Avatar, TableCell, TableRow, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useAppDispatch } from "../../../store/hooks";
import {
  CompanyType,
  setCurrentCompany,
} from "../../../store/slices/CompanySlice";
import { AppRoutes } from "../../../utils/constants/routes";
import { useNavigate } from "react-router-dom";

interface CompanyRowProps {
  company: CompanyType;
  setOpenBanModal: (value: boolean) => void;
}

const CompanyRow = ({ company, setOpenBanModal }: CompanyRowProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBanClick = async () => {
    await dispatch(setCurrentCompany(company));

    setOpenBanModal(true);
  };

  const handleClickCompany = async () => {
    await dispatch(setCurrentCompany(company));
    navigate(`${AppRoutes.AdminCompanyProfile}/${company.id}`);
  };

  return (
    <TableRow>
      <TableCell
        sx={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleClickCompany}
      >
        <Avatar
          src={company.profilePicture}
          alt={company.name}
          sx={{
            width: 35,
            height: 35,
          }}
        />
        <Typography variant="body2">{`${company.name}`}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography variant="body2">{company.email}</Typography>
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
          }}
        />
        <Typography variant="body2">{`${company.owner.firstName} ${company.owner.lastName}`}</Typography>
      </TableCell>
      <TableCell align="right">
        <IconButton size="small" onClick={handleBanClick}>
          <LockOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CompanyRow;
