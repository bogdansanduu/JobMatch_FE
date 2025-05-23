import React, {
  ChangeEvent,
  Dispatch,
  useCallback,
  useEffect,
  useState,
} from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import GeoLocation from "./GeoLocation";
import { FIELD_NAMES, geonames, LOCATION_NAMES } from "./types";
import { MainContainer } from "./styledComponents";
import isEmail from "validator/lib/isEmail";
import UploadProfilePicture from "../uploadFile/UploadProfilePicture";
import { setFips } from "crypto";

interface BasicInfoStepProps {
  user: Record<FIELD_NAMES | LOCATION_NAMES, string>;
  setUser: Dispatch<
    React.SetStateAction<Record<FIELD_NAMES | LOCATION_NAMES, string>>
  >;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  location: Record<LOCATION_NAMES, number>;
  setLocation: Dispatch<React.SetStateAction<Record<LOCATION_NAMES, number>>>;

  dirty: Record<FIELD_NAMES | LOCATION_NAMES, boolean>;
  setDirty: Dispatch<
    React.SetStateAction<Record<FIELD_NAMES | LOCATION_NAMES, boolean>>
  >;
  handleBlur: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    state: boolean
  ) => void;

  file: File | undefined;
  setFile: (file: File | undefined) => void;

  handleNext: () => void;
}

const BasicInfoStep = ({
  user,
  setUser,
  handleChange,
  location,
  setLocation,
  dirty,
  setDirty,
  handleBlur,
  file,
  setFile,
  handleNext,
}: BasicInfoStepProps) => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const {
    firstName,
    lastName,
    email,
    password,
    retypedPassword,
    country,
    state,
    city,
  } = user;

  const isDisabled =
    !!firstName &&
    !!lastName &&
    !!password &&
    !!retypedPassword &&
    !!email &&
    !!country &&
    !!state &&
    !!city &&
    !!file &&
    isEmailValid;

  const handleChangeEmail = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;

    handleChange(event);

    if (name === FIELD_NAMES.email) {
      setIsEmailValid(isEmail(value));
    }
  };

  const handleLocationChange = useCallback(
    async (key: LOCATION_NAMES, value: number, isCountry: boolean) => {
      if (!value) {
        setLocation((prevLocation) => ({
          ...prevLocation,
          [key]: 0,
        }));
        setUser((prevUser) => ({
          ...prevUser,
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

      setUser((prevUser) => ({
        ...prevUser,
        [key]: locationName,
      }));
    },
    [location, user]
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

  const onNext = () => {
    if (!isDisabled) {
      return;
    }

    const { password, retypedPassword } = user;

    if (password !== retypedPassword) {
      setUser((prevUser) => ({
        ...prevUser,
        password: "",
        retypedPassword: "",
      }));
      setDirty((prevDirty) => ({
        ...prevDirty,
        password: true,
        retypedPassword: true,
      }));
      alert("Passwords do not match");
      return;
    }

    handleNext();
  };

  return (
    <MainContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            error={dirty.firstName && !user.firstName}
            label={"First Name"}
            name={FIELD_NAMES.firstName}
            variant={"outlined"}
            value={user.firstName}
            onChange={(e) => handleChange(e)}
            fullWidth
            required
            margin={"normal"}
            type={"text"}
            onBlur={(e) => handleBlur(e, true)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            error={dirty.lastName && !user.lastName}
            label={"Last Name"}
            name={FIELD_NAMES.lastName}
            variant={"outlined"}
            value={user.lastName}
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
            error={dirty.email && !user.email && !isEmailValid}
            label={"Email Address"}
            name={FIELD_NAMES.email}
            variant={"outlined"}
            value={user.email}
            onChange={(e) => handleChangeEmail(e)}
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
            error={dirty.country && !user.country}
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
            error={dirty.state && !user.state}
            geoId={location.country ? location.country : undefined}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <GeoLocation
            locationTitle={"City"}
            type={LOCATION_NAMES.city}
            onChange={handleLocationChange}
            onBlur={handleLocationBlur}
            error={dirty.city && !user.city}
            geoId={location.state ? location.state : undefined}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={dirty.password && !user.password}
            label={"Password"}
            name={FIELD_NAMES.password}
            variant={"outlined"}
            value={user.password}
            onChange={(e) => handleChange(e)}
            fullWidth
            required
            margin="normal"
            type={"password"}
            onBlur={(e) => handleBlur(e, true)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            error={dirty.retypedPassword && !user.retypedPassword}
            label={"Retype Password"}
            name={FIELD_NAMES.retypedPassword}
            variant={"outlined"}
            value={user.retypedPassword}
            onChange={(e) => handleChange(e)}
            fullWidth
            required
            margin="normal"
            type={"password"}
            onBlur={(e) => handleBlur(e, true)}
          />
        </Grid>
        <Grid item xs={12}>
          <UploadProfilePicture file={file} setFile={setFile} />
        </Grid>
      </Grid>
      <Button
        disabled={!isDisabled}
        onClick={onNext}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Next
      </Button>
    </MainContainer>
  );
};

export default BasicInfoStep;
