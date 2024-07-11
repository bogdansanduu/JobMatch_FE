import React, { useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getCompanyById,
  getCurrentCompany,
} from "../../store/slices/CompanySlice";
import { getAllPostsByCompany } from "../../store/slices/PostSlice";

import {
  LoadingContainer,
  SpinnerContainer,
} from "../../router/styledComponents";
import CompanyPageHeader from "../../components/companyPage/CompanyPageHeader";
import CompanyPageDetails from "../../components/companyPage/CompanyPageDetails";
import AllJobsSectionForProfile from "../../components/job/AllJobsSectionForProfile";
import CompanyDescription from "../../components/companyPage/CompanyDescription";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AdminCompanyProfile = () => {
  const company = useAppSelector(getCurrentCompany);
  const dispatch = useAppDispatch();
  const { companyId } = useParams();

  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const currentCompanyId = Number(companyId);

      if (!currentCompanyId) {
        return;
      }

      await dispatch(getCompanyById(currentCompanyId));
      await dispatch(getAllPostsByCompany(currentCompanyId));

      setLoading(false);
    })();
  }, [companyId]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const currentCompanyId = Number(companyId);

      if (!currentCompanyId) {
        return;
      }

      await dispatch(getCompanyById(currentCompanyId));

      setLoading(false);
    })();
  }, [companyId]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (loading || !company)
    return (
      <LoadingContainer>
        <SpinnerContainer>
          <CircularProgress size={60} />
        </SpinnerContainer>
      </LoadingContainer>
    );

  return (
    <Box
      sx={{
        margin: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <CompanyPageHeader />
      <CompanyDescription />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Jobs" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <Box hidden={value !== 0}>
        <CompanyPageDetails />
      </Box>
      <Box hidden={value !== 1}>
        <AllJobsSectionForProfile />
      </Box>
    </Box>
  );
};

export default AdminCompanyProfile;
