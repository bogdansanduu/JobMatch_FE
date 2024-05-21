import React from "react";
import { Avatar, Card, CardHeader } from "@mui/material";

import { CompanyType } from "../../store/slices/CompanySlice";

import { GrayColors, White } from "../../utils/constants/colorPallete";
import { AppRoutes } from "../../utils/constants/routes";

interface CompaniesSearchListProps {
  searchResultsCompanies: CompanyType[];
  handleNavigate: (user: CompanyType) => void;
}

const CompaniesSearchList = ({
  searchResultsCompanies,
  handleNavigate,
}: CompaniesSearchListProps) => {
  return (
    <>
      {searchResultsCompanies.map((company) => {
        return (
          <Card
            key={company.id}
            sx={{
              marginBottom: "4px",
              backgroundColor: White.OffWhite,
              border: `1px solid ${GrayColors.Gray2}`,
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  alt={company.name}
                  src={company.profilePicture}
                  sx={{ width: 30, height: 30 }}
                />
              }
              title={company.name}
              onClick={() => handleNavigate(company)}
              sx={{ padding: "4px" }}
            />
          </Card>
        );
      })}
    </>
  );
};

export default CompaniesSearchList;
