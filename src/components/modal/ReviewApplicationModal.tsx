import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";

import {
  APPLICATION_STATUS,
  getCurrentJobApplication,
  reviewJobApplication,
} from "../../store/slices/JobApplicationSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { AppModal } from "./AppModal";
import AppApi from "../../server/api/AppApi";

interface ReviewApplicationModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ReviewApplicationModal = ({
  open,
  setOpen,
}: ReviewApplicationModalProps) => {
  const emailApi = AppApi.getEmailApi();
  const currentJobApplication = useAppSelector(getCurrentJobApplication);

  const dispatch = useAppDispatch();

  const [applicationStatus, setApplicationStatus] = useState<
    APPLICATION_STATUS | ""
  >("");
  const [applicationObservations, setApplicationObservations] = useState("");
  const [applicationStatusDirty, setApplicationStatusDirty] = useState(false);
  const [applicationObservationsDirty, setApplicationObservationsDirty] =
    useState(false);
  const applicationStatuses = Object.values(APPLICATION_STATUS);

  const reviewButtonDisabled = !applicationStatus || !applicationObservations;

  const handleCloseReviewApplicationModal = () => {
    setApplicationObservations("");
    setApplicationObservationsDirty(false);
    setApplicationStatus("");
    setApplicationStatusDirty(false);
    setOpen(false);
  };

  const handleChangeObservations = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplicationObservations(e.target.value);
  };

  const handleObservationsBlur = () => {
    setApplicationObservationsDirty(true);
  };

  const handleChangeApplicationStatus = (e: SelectChangeEvent) => {
    if (!e.target.value) {
      setApplicationStatus("");
      return;
    }

    setApplicationStatus(e.target.value as APPLICATION_STATUS);
  };

  const handleStatusBlur = () => {
    setApplicationStatusDirty(true);
  };

  const handleReviewApplication = async () => {
    if (
      !currentJobApplication ||
      !applicationStatus ||
      !applicationObservations
    ) {
      return;
    }

    await dispatch(
      reviewJobApplication({
        jobApplicationId: currentJobApplication.id,
        status: applicationStatus,
        observations: applicationObservations,
      })
    );
    handleCloseReviewApplicationModal();
    await emailApi.sendApplicationEvaluatedEmail(currentJobApplication.id);
  };

  return (
    <AppModal open={open} noPadding customWidth={"600px"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "24px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{ marginRight: "8px" }}
            variant="h5"
            color={"text.primary"}
          >
            Review Application
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={handleCloseReviewApplicationModal}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {currentJobApplication?.applicant && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Avatar
              src={currentJobApplication.applicant.profilePicture}
              sx={{ alignSelf: "start", marginTop: "6px" }}
            />
            <Typography variant="subtitle1" color="text.secondary">
              {`${currentJobApplication.applicant.firstName} ${currentJobApplication.applicant.lastName}`}
            </Typography>
            <Box
              sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
            >
              <Typography variant="subtitle1" color="text.secondary">
                Contact:&nbsp;
              </Typography>
              <Typography variant="body1">
                {currentJobApplication.applicant.email}
              </Typography>
            </Box>
          </Box>
        )}
        <TextField
          label={"Observations"}
          variant={"outlined"}
          value={applicationObservations}
          onChange={handleChangeObservations}
          fullWidth
          required
          error={applicationObservationsDirty && !applicationObservations}
          margin={"normal"}
          type={"text"}
          multiline
          rows={7}
          placeholder={"Include all relevant observations."}
          onBlur={handleObservationsBlur}
        />
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select
            value={applicationStatus}
            onChange={handleChangeApplicationStatus}
            error={applicationStatusDirty && !applicationStatus}
            fullWidth
            required
            label="Application Status"
            onBlur={handleStatusBlur}
          >
            <MenuItem value={""}>
              <em>None</em>
            </MenuItem>
            {applicationStatuses.map((status, index) => (
              <MenuItem key={index} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", gap: "8px", marginLeft: "auto" }}>
          <Button
            variant={"contained"}
            color={"error"}
            onClick={handleCloseReviewApplicationModal}
          >
            Cancel
          </Button>
          <Button
            variant={"contained"}
            disabled={reviewButtonDisabled}
            onClick={handleReviewApplication}
          >
            Review
          </Button>
        </Box>
      </Box>
    </AppModal>
  );
};

export default ReviewApplicationModal;
