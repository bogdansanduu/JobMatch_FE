import React, { useCallback, useEffect, useState, MouseEvent } from "react";
import { debounce } from "lodash";
import {
  Avatar,
  Card,
  CardHeader,
  InputAdornment,
  Paper,
  Popper,
  TextField,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { useAppDispatch } from "../../store/hooks";
import { UserType } from "../../store/slices/UserSlice";
import { setUserSearchOpen } from "../../store/slices/UISlice";

import AppApi from "../../server/api/AppApi";
import { Blue, GrayColors, White } from "../../utils/constants/colorPallete";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../utils/constants/routes";

const SearchPopover = () => {
  const userApi = AppApi.getUserApi();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<UserType[]>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleSearch = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm === "") {
        setSearchResults([]);
        return;
      }

      const users = await userApi.searchByNameAndEmail(searchTerm);

      setSearchResults(users);
    }, 300),
    []
  );

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (open) {
      return;
    }

    setSearchTerm("");
    setSearchResults([]);

    setAnchorEl(event.currentTarget);
    dispatch(setUserSearchOpen(true));
  };

  const handlePopperClose = () => {
    setSearchTerm("");
    setAnchorEl(null);
    dispatch(setUserSearchOpen(false));
  };

  const handleAddUser = (user: UserType) => {
    console.log(`Selected user: ${user.firstName} ${user.lastName}`);
  };

  const handleClose = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();

    setSearchTerm("");
    setAnchorEl(null);
    dispatch(setUserSearchOpen(false));
  };

  const handleNavigate = (user: UserType) => {
    navigate(`${AppRoutes.UserProfile}/${user.id}`);

    setSearchTerm("");
    setAnchorEl(null);
    dispatch(setUserSearchOpen(false));
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm]);

  return (
    <ClickAwayListener onClickAway={handlePopperClose}>
      <div>
        <TextField
          variant="standard"
          margin="normal"
          placeholder="Search"
          sx={{
            backgroundColor: Blue.VoyagerBlue,
            borderRadius: "6px",
            marginTop: 0,
            marginBottom: 0,
            marginLeft: "4px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ paddingLeft: "4px" }}>
                <SearchIcon />
              </InputAdornment>
            ),
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={(e) => handleClose(e)} disableRipple>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={handlePopoverOpen}
        />
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement={"bottom-start"}
          sx={{ zIndex: 1000 }}
        >
          <Paper
            elevation={3}
            sx={{
              borderRadius: "6px",
              padding: "16px",
              backgroundColor: White.PureWhite,
              width: anchorEl?.clientWidth,
              overflowY: "auto",
            }}
          >
            {/* Display search results */}
            {searchResults.length === 0 && <div>No results found</div>}
            {searchResults.map((user) => (
              <Card
                key={user.id}
                sx={{
                  marginBottom: "4px",
                  backgroundColor: White.OffWhite,
                  border: `1px solid ${GrayColors.Gray2}`,
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt={`${user.firstName} ${user.lastName}`}
                      src={user.profilePicture}
                      sx={{ width: 30, height: 30 }}
                    />
                  }
                  title={`${user.firstName} ${user.lastName}`}
                  action={
                    <IconButton
                      aria-label="add-user"
                      onClick={() => handleAddUser(user)}
                    >
                      <PersonAddAlt1Icon />
                    </IconButton>
                  }
                  onClick={() => handleNavigate(user)}
                  sx={{ padding: "4px" }}
                />
              </Card>
            ))}
          </Paper>
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default SearchPopover;
