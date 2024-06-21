import React, { ChangeEvent, Dispatch, useCallback } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import { FIELD_NAMES_JOB, geonames } from "../register/types";
import GeoLocation from "../register/GeoLocation";
import { LOCATION_NAMES } from "../../pages/user-pages/CreateCompanyAccount";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

const categories = ["IT", "Marketing", "Finance", "Healthcare", "Engineering"];

interface JobBasicInfoStepProps {
  jobData: Record<FIELD_NAMES_JOB | LOCATION_NAMES, string>;
  setJobData: Dispatch<
    React.SetStateAction<Record<FIELD_NAMES_JOB | LOCATION_NAMES, string>>
  >;
  handleChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  location: Record<LOCATION_NAMES, number>;
  setLocation: Dispatch<React.SetStateAction<Record<LOCATION_NAMES, number>>>;
  setLatLng: Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;

  dirty: Record<FIELD_NAMES_JOB | LOCATION_NAMES, boolean>;
  setDirty: React.Dispatch<
    React.SetStateAction<Record<FIELD_NAMES_JOB | LOCATION_NAMES, boolean>>
  >;
  handleBlur: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    state: boolean
  ) => void;

  handleNext: () => void;
}

const JobBasicInfoStep = ({
  jobData,
  setJobData,
  handleChange,
  location,
  setLocation,
  setLatLng,
  dirty,
  setDirty,
  handleBlur,
  handleNext,
}: JobBasicInfoStepProps) => {
  const isDisabled =
    !!jobData.title &&
    !!jobData.description &&
    !!jobData.category &&
    !!jobData.country &&
    !!jobData.city &&
    !!jobData.state;

  const onNext = () => {
    handleNext();
  };

  const handleLocationChange = useCallback(
    async (key: LOCATION_NAMES, value: number, isCountry: boolean) => {
      if (!value) {
        setLocation((prevLocation) => ({
          ...prevLocation,
          [key]: 0,
        }));
        setJobData((prevJobData) => ({
          ...prevJobData,
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

      setJobData((prevJobData) => ({
        ...prevJobData,
        [key]: locationName,
      }));

      if (key === LOCATION_NAMES.country) {
        setLatLng({
          lng: Number(data.lng),
          lat: Number(data.lat),
        });
      }
    },
    [location, jobData]
  );

  const handleSelectCategory = (event: SelectChangeEvent<string>) => {
    setJobData((prevJobData) => ({
      ...prevJobData,
      category: event.target.value,
    }));
  };

  const handleLocationBlur = useCallback(
    (key: LOCATION_NAMES, state: boolean) => {
      setDirty((prevDirty) => ({
        ...prevDirty,
        [key]: state,
      }));
    },
    [dirty]
  );

  return (
    <Box
      sx={{
        flex: 4,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <TextField
        label={"Title"}
        name={FIELD_NAMES_JOB.title}
        variant={"standard"}
        value={jobData.title}
        onChange={(e) => handleChange(e)}
        fullWidth
        required
        error={dirty.title && !jobData.title}
        placeholder={"Title"}
        margin={"normal"}
        type={"text"}
        onBlur={(e) => handleBlur(e, true)}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <GeoLocation
            locationTitle={"Country"}
            isCountry
            type={LOCATION_NAMES.country}
            error={dirty.country && !jobData.country}
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
            error={dirty.state && !jobData.state}
            geoId={location.country ? location.country : undefined}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <GeoLocation
            locationTitle={"City"}
            type={LOCATION_NAMES.city}
            onChange={handleLocationChange}
            onBlur={handleLocationBlur}
            error={dirty.city && !jobData.city}
            geoId={location.state ? location.state : undefined}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name={FIELD_NAMES_JOB.category}
              value={jobData.category}
              label="Category"
              onChange={handleSelectCategory}
              onBlur={(e) => handleBlur(e, true)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TextField
        label={"Description"}
        name={FIELD_NAMES_JOB.description}
        variant={"outlined"}
        value={jobData.description}
        onChange={(e) => handleChange(e)}
        fullWidth
        required
        error={dirty.description && !jobData.description}
        margin={"normal"}
        type={"text"}
        multiline
        rows={5}
        placeholder={"Include all relevant job details."}
        onBlur={(e) => handleBlur(e, true)}
      />
      <Button
        disabled={!isDisabled}
        onClick={onNext}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Next
      </Button>
    </Box>
  );
};

export default JobBasicInfoStep;
