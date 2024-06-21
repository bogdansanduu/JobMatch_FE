import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";

import { GrayColors } from "../../utils/constants/colorPallete";
import { AppRoutes } from "../../utils/constants/routes";

import { setCurrentUser, UserType } from "../../store/slices/UserSlice";
import { useAppDispatch } from "../../store/hooks";

interface UserCardProps {
  user: UserType;
}

const UserCard = ({ user }: UserCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUserCardClick = async () => {
    await dispatch(setCurrentUser(user));

    navigate(`${AppRoutes.UserProfile}/${user.id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        },
        overflow: "visible",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            src={user.profilePicture}
            sx={{ width: 40, height: 40, borderRadius: "50%" }}
          />
        }
        title={`${user.firstName} ${user.lastName}`}
        subheader={user.currentPosition || "No position"}
      />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: "4px" }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <EmailIcon sx={{ color: GrayColors.Gray5 }} />
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <LocationOnIcon sx={{ color: GrayColors.Gray5 }} />
          <Typography variant="body2" color="text.secondary">
            {user.city ? `${user.city}, ` : ""}
            {user.state ? `${user.state}, ` : ""}
            {user.country}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleUserCardClick}>
          View Profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
