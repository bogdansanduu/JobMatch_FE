import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { useAppDispatch } from "../../store/hooks";
import { getAllCompanies } from "../../store/slices/CompanySlice";

import { GrayColors, White } from "../../utils/constants/colorPallete";

import {
  LoadingContainer,
  SpinnerContainer,
} from "../../router/styledComponents";
import CompaniesTable from "../../components/tables/CompaniesTable";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AllCompaniesPage = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const banned = value === 1;

      await dispatch(getAllCompanies({ banned }));

      setLoading(false);
    })();
  }, [value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", padding: "12px", gap: "12px" }}>
      <Box
        sx={{
          flex: 1,

          display: "flex",
          gap: "12px",
          flexDirection: "column",

          height: "100%",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        <Typography variant="subtitle2">Company Info</Typography>
        <Typography variant="body2">
          Here you can see all the companies that are currently registered in
          the system. You can also see the companies that are banned from the
          system.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 5,

          display: "flex",
          gap: "12px",
          flexDirection: "column",

          height: "100%",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: White.PureWhite,
          border: `1px solid ${GrayColors.Gray2}`,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Active Companies" {...a11yProps(0)} />
            <Tab label="Banned Companies" {...a11yProps(1)} />
          </Tabs>
        </Box>
        {!loading ? (
          <>
            <Box hidden={value !== 0}>
              <CompaniesTable bannedCompanies={false} />
            </Box>
            <Box hidden={value !== 1}>
              <CompaniesTable bannedCompanies={true} />
            </Box>
          </>
        ) : (
          <LoadingContainer>
            <SpinnerContainer>
              <CircularProgress size={60} />
            </SpinnerContainer>
          </LoadingContainer>
        )}
      </Box>
    </Box>
  );
};

export default AllCompaniesPage;
