import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useAppSelector } from "../../store/hooks";
import { getCompanies } from "../../store/slices/CompanySlice";

import BanCompanyModal from "../modal/BanCompanyModal";
import UnbanCompanyModal from "../modal/UnbanCompanyModal";
import CompanyRow from "./companyTableComponents/CompanyRow";
import BannedCompanyRow from "./companyTableComponents/BannedCompanyRow";

interface CompaniesTableProps {
  bannedCompanies: boolean;
}

const CompaniesTable = ({ bannedCompanies }: CompaniesTableProps) => {
  const allCompanies = useAppSelector(getCompanies);

  const [openBanModal, setOpenBanModal] = useState(false);
  const [openUnbanModal, setOpenUnbanModal] = useState(false);

  return (
    <>
      <TableContainer component={Paper} sx={{ flex: 3 }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Owner</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!bannedCompanies &&
              allCompanies.map((company) => (
                <CompanyRow
                  company={company}
                  setOpenBanModal={setOpenBanModal}
                  key={company.id}
                />
              ))}
            {bannedCompanies &&
              allCompanies.map((company) => (
                <BannedCompanyRow
                  company={company}
                  setOpenUnbanModal={setOpenUnbanModal}
                  key={company.id}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BanCompanyModal open={openBanModal} setOpen={setOpenBanModal} />
      <UnbanCompanyModal open={openUnbanModal} setOpen={setOpenUnbanModal} />
    </>
  );
};

export default CompaniesTable;
