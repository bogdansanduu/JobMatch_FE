import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import Geonames from "geonames.js";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import isEmail from "validator/lib/isEmail";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { GrayColors, White } from "../../utils/constants/colorPallete";
import { AppRoutes } from "../../utils/constants/routes";

import AppApi from "../../server/api/AppApi";
import { useAppSelector } from "../../store/hooks";
import { getLoggedUser } from "../../store/slices/AuthSlice";

import GeoLocation from "../../components/register/GeoLocation";

export enum FIELD_NAMES {
  name = "name",
  email = "email",
  password = "password",
  retypedPassword = "retypedPassword",
  industry = "industry",
  description = "description",
}

export enum LOCATION_NAMES {
  country = "country",
  state = "state",
  city = "city",
}

export const geonames = Geonames({
  username: "sandubogdan2001",
  lan: "en",
  encoding: "JSON",
});

const categories = ["IT", "Marketing", "Finance", "Healthcare", "Engineering"];

const CreateCompanyAccount = () => {
  const authApi = AppApi.getAuthApi();

  const currentUser = useAppSelector(getLoggedUser);
  const navigate = useNavigate();

  const [account, setAccount] = useState<
    Record<FIELD_NAMES | LOCATION_NAMES, string>
  >({
    name: "",
    email: "",
    country: "",
    state: "",
    city: "",
    password: "",
    retypedPassword: "",
    industry: "",
    description: "",
  });

  const [location, setLocation] = useState<Record<LOCATION_NAMES, number>>({
    country: 0,
    state: 0,
    city: 0,
  });

  const [dirty, setDirty] = useState<
    Record<FIELD_NAMES | LOCATION_NAMES, boolean>
  >({
    name: false,
    email: false,
    password: false,
    retypedPassword: false,
    country: false,
    state: false,
    city: false,
    industry: false,
    description: false,
  });

  const [isEmailValid, setIsEmailValid] = useState(false);

  const isDisabled =
    !!account.name &&
    !!account.password &&
    !!account.retypedPassword &&
    !!account.email &&
    !!account.country &&
    !!account.state &&
    !!account.city &&
    !!account.industry &&
    !!account.description &&
    isEmailValid;

  useEffect(() => {
    const alreadyHasAccount = !!currentUser?.company;

    if (alreadyHasAccount) {
      navigate(AppRoutes.Home);
    }
  }, [currentUser]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value, name } = event.target;
      setAccount((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      if (name === FIELD_NAMES.email) {
        setIsEmailValid(isEmail(value));
      }
    },
    [account]
  );

  const handleLocationChange = useCallback(
    async (key: LOCATION_NAMES, value: number, isCountry: boolean) => {
      if (!value) {
        setLocation((prevLocation) => ({
          ...prevLocation,
          [key]: 0,
        }));
        setAccount((prevState) => ({
          ...prevState,
          [key]: "",
        }));

        return;
      }

      setLocation((prevLocation) => ({
        ...prevLocation,
        [key]: value,
      }));

      const data = await geonames.get({ geonameId: value });
      const locationName = isCountry ? data.countryName : data.name;

      setAccount((prevState) => ({
        ...prevState,
        [key]: locationName,
      }));
    },
    [location, account]
  );

  const handleBlur = useCallback(
    (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      state: boolean
    ) => {
      const { name } = event.target;

      setDirty((prevDirty) => ({
        ...prevDirty,
        [name]: state,
      }));
    },
    [dirty]
  );

  const handleLocationBlur = useCallback(
    (key: LOCATION_NAMES, state: boolean) => {
      setDirty((prevDirty) => ({
        ...prevDirty,
        [key]: state,
      }));
    },
    [dirty]
  );

  const handleSelectIndustry = (event: SelectChangeEvent<string>) => {
    setAccount((prevAccountData) => ({
      ...prevAccountData,
      category: event.target.value,
    }));
  };

  const handleCreateAccount = async () => {
    if (!currentUser) {
      return;
    }

    try {
      await authApi.registerCompany({
        email: account.email,
        password: account.password,
        name: account.name,
        industry: account.industry,
        country: account.country,
        state: account.state,
        city: account.city,
        ownerId: currentUser.id,
        description: account.description,
      });

      navigate(AppRoutes.Home);
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      const messageMessage =
        axiosError?.response?.data.error || "An error occurred";

      alert(messageMessage);
    }
  };

  return (
    <Box
      sx={{
        margin: "12px 24px",

        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "8px",
        backgroundColor: White.PureWhite,
        border: `1px solid ${GrayColors.Gray2}`,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Create your Company Account
      </Typography>
      <Divider flexItem />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            error={dirty.name && !account.name}
            label={"Name"}
            name={FIELD_NAMES.name}
            variant={"outlined"}
            value={account.name}
            onChange={(e) => handleChange(e)}
            fullWidth
            required
            margin={"normal"}
            type={"text"}
            onBlur={(e) => handleBlur(e, true)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={dirty.email && !account.email && !isEmailValid}
            label={"Email Address"}
            name={FIELD_NAMES.email}
            variant={"outlined"}
            value={account.email}
            onChange={(e) => handleChange(e)}
            fullWidth
            required
            margin={"normal"}
            type={"email"}
            onBlur={(e) => handleBlur(e, true)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <GeoLocation
            locationTitle={"Country"}
            isCountry
            type={LOCATION_NAMES.country}
            error={dirty.country && !account.country}
            onChange={handleLocationChange}
            onBlur={handleLocationBlur}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <GeoLocation
            locationTitle={"State"}
            type={LOCATION_NAMES.state}
            onChange={handleLocationChange}
            onBlur={handleLocationBlur}
            error={dirty.state && !account.state}
            geoId={location.country ? location.country : undefined}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <GeoLocation
            locationTitle={"City"}
            type={LOCATION_NAMES.city}
            onChange={handleLocationChange}
            onBlur={handleLocationBlur}
            error={dirty.city && !account.city}
            geoId={location.state ? location.state : undefined}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={dirty.password && !account.password}
            label={"Password"}
            name={FIELD_NAMES.password}
            variant={"outlined"}
            value={account.password}
            onChange={(e) => handleChange(e)}
            fullWidth
            required
            margin="normal"
            type={"password"}
            onBlur={(e) => handleBlur(e, true)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={dirty.retypedPassword && !account.retypedPassword}
            label={"Retype Password"}
            name={FIELD_NAMES.retypedPassword}
            variant={"outlined"}
            value={account.retypedPassword}
            onChange={(e) => handleChange(e)}
            fullWidth
            required
            margin="normal"
            type={"password"}
            onBlur={(e) => handleBlur(e, true)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth error={dirty.industry && !account.industry}>
            <InputLabel id="industry-label">Industry</InputLabel>
            <Select
              labelId="industry-label"
              id="category"
              name={FIELD_NAMES.industry}
              value={account.industry}
              label="Industry"
              onChange={handleSelectIndustry}
              onBlur={(e) => handleBlur(e, true)}
            >
              {categories.map((industry) => (
                <MenuItem key={industry} value={industry}>
                  {industry}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={dirty.description && !account.description}
            label={"Description"}
            name={FIELD_NAMES.description}
            variant={"outlined"}
            value={account.description}
            onChange={(e) => handleChange(e)}
            fullWidth
            required
            margin={"normal"}
            type={"text"}
            onBlur={(e) => handleBlur(e, true)}
            multiline
            minRows={4}
            sx={{ mb: 2 }}
            placeholder="Include all relevant details about your company."
          />
        </Grid>
      </Grid>
      <Button
        fullWidth
        variant="contained"
        disabled={!isDisabled}
        sx={{ mt: 3, mb: 2 }}
        onClick={handleCreateAccount}
      >
        Create Account
      </Button>
    </Box>
  );
};

export default CreateCompanyAccount;
