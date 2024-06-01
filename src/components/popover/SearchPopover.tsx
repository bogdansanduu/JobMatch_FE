import React, { useCallback, useEffect, useState, MouseEvent } from "react";
import { debounce } from "lodash";
import {
  Chip,
  Divider,
  InputAdornment,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import { useAppDispatch } from "../../store/hooks";
import { UserType } from "../../store/slices/UserSlice";
import { setUserSearchOpen } from "../../store/slices/UISlice";

import AppApi from "../../server/api/AppApi";
import { Blue, White } from "../../utils/constants/colorPallete";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../utils/constants/routes";
import { CompanyType } from "../../store/slices/CompanySlice";
import UsersSearchList from "./UsersSearchList";
import CompaniesSearchList from "./CompaniesSearchList";

const SearchPopover = () => {
  const userApi = AppApi.getUserApi();
  const companyApi = AppApi.getCompanyApi();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResultsUsers, setSearchResultsUsers] = useState<UserType[]>([]);
  const [searchResultsCompanies, setSearchResultsCompanies] = useState<
    CompanyType[]
  >([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const totalSearchResults =
    searchResultsUsers.length + searchResultsCompanies.length;

  const handleSearch = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm === "") {
        setSearchResultsUsers([]);
        setSearchResultsCompanies([]);
        return;
      }

      const users = await userApi.searchByNameAndEmail(searchTerm);
      const companies = await companyApi.searchByNameAndEmail(searchTerm);

      setSearchResultsUsers(users);
      setSearchResultsCompanies(companies);
    }, 300),
    []
  );

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (open) {
      return;
    }

    setSearchTerm("");
    setSearchResultsUsers([]);
    setSearchResultsCompanies([]);

    setAnchorEl(event.currentTarget);
    dispatch(setUserSearchOpen(true));
  };

  const handlePopperClose = () => {
    setSearchTerm("");
    setAnchorEl(null);
    dispatch(setUserSearchOpen(false));
  };

  const handleClose = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    event.stopPropagation();

    setSearchTerm("");
    setAnchorEl(null);
    dispatch(setUserSearchOpen(false));
  };

  const handleNavigateUser = (user: UserType) => {
    navigate(`${AppRoutes.UserProfile}/${user.id}`);

    setSearchTerm("");
    setAnchorEl(null);
    dispatch(setUserSearchOpen(false));
  };

  const handleNavigateCompany = (company: CompanyType) => {
    navigate(`${AppRoutes.UserCompanyProfile}/${company.id}`);

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
            {totalSearchResults === 0 ? (
              <Typography variant={"h6"} sx={{ textAlign: "center" }}>
                No results found
              </Typography>
            ) : (
              <>
                <Divider sx={{ margin: "4px 0" }}>
                  <Chip label="Users" size="small" />
                </Divider>
                <UsersSearchList
                  searchResultsUsers={searchResultsUsers}
                  handleNavigate={handleNavigateUser}
                />
                <Divider sx={{ margin: "6px 0" }}>
                  <Chip label="Companies" size="small" />
                </Divider>
                <CompaniesSearchList
                  searchResultsCompanies={searchResultsCompanies}
                  handleNavigate={handleNavigateCompany}
                />
              </>
            )}
          </Paper>
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default SearchPopover;
