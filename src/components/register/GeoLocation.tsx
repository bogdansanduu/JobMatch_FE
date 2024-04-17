import React, { useEffect, useState, useRef } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { geonames, LOCATION_NAMES } from "./types";

interface GeoLocationProps {
  locationTitle: string;
  onChange: (key: LOCATION_NAMES, value: number, isCountry: boolean) => void;
  onBlur: (key: LOCATION_NAMES, value: boolean) => void;
  type: LOCATION_NAMES;
  error?: boolean;
  geoId?: number;
  isCountry?: boolean;
}

const GeoLocation = ({
  locationTitle,
  geoId,
  onChange,
  onBlur,
  isCountry,
  type,
  error,
}: GeoLocationProps) => {
  const [options, setOptions] = useState<any[]>([]);
  const [currentItem, setCurrentItem] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isCountry) {
          const res = await geonames.countryInfo({});
          setOptions(res.geonames);
        } else {
          const res = await geonames.children({ geonameId: geoId || 0 });
          if (res.totalResultsCount) setOptions(res.geonames);
        }
      } catch (err) {
        setCurrentItem("");
        setOptions([]);
        console.error(err);
      }
    };
    fetchData();
  }, [geoId, isCountry]);

  const inputLabel = useRef<HTMLLabelElement>(null);

  const handleChange = async (e: SelectChangeEvent) => {
    setCurrentItem(e.target.value);
    onChange(type, Number(e.target.value), !!isCountry);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel ref={inputLabel}>{locationTitle}</InputLabel>

      <Select
        value={currentItem}
        onChange={handleChange}
        error={error}
        onBlur={() => onBlur(type, true)}
        required
        MenuProps={{
          PaperProps: {
            sx: { maxHeight: "250px" },
          },
        }}
      >
        <MenuItem value="">
          <em>-</em>
        </MenuItem>
        {options.map((v, index) => (
          <MenuItem key={index} value={v.geonameId}>
            {isCountry ? v.countryName : v.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GeoLocation;
