import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Tab, Tabs, Typography } from "@mui/material";

import { GrayColors, White } from "../../utils/constants/colorPallete";

import { useAppDispatch } from "../../store/hooks";
import { getAllUsers } from "../../store/slices/UserSlice";

import {
  LoadingContainer,
  SpinnerContainer,
} from "../../router/styledComponents";
import UsersTable from "../../components/tables/UsersTable";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AllUsersPage = () => {
  const dispatch = useAppDispatch();

  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const banned = value === 1;

      await dispatch(getAllUsers({ banned }));

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
        <Typography variant="subtitle2">Usage Info</Typography>
        <Typography variant="body2">
          Here you can see all the users that are currently registered in the
          system. You can also see the users that are banned from the system.
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
            <Tab label="Active Users" {...a11yProps(0)} />
            <Tab label="Banned Users" {...a11yProps(1)} />
          </Tabs>
        </Box>
        {!loading ? (
          <>
            <Box hidden={value !== 0}>
              <UsersTable bannedUsers={false} />
            </Box>
            <Box hidden={value !== 1}>
              <UsersTable bannedUsers={true} />
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

export default AllUsersPage;
