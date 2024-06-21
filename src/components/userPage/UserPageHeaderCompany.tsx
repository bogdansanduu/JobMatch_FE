import React from "react";
import { White } from "../../utils/constants/colorPallete";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import userBanner from "../../assets/user_banner.jpg";
import { useAppSelector } from "../../store/hooks";
import { getCurrentUser } from "../../store/slices/UserSlice";

const UserPageHeaderCompany = () => {
  const user = useAppSelector(getCurrentUser);

  return (
    <Card
      sx={{
        display: "flex",
        height: "inherit",
        flexDirection: "column",
        backgroundColor: White.PureWhite,
        borderRadius: "8px",
        minHeight: "100px",
      }}
    >
      <CardMedia
        component={"img"}
        alt={"user banner"}
        height={"150"}
        image={userBanner}
      />
      <CardHeader
        title={`${user.firstName} ${user.lastName}`}
        subheader={"POSITION"}
        avatar={<Avatar src={user.profilePicture} />}
      />
      <CardContent>
        <Typography variant={"body2"} color={"text.secondary"} gutterBottom>
          {`${user.country}, ${user.city}, ${user.state}`}
        </Typography>
        <Typography variant={"body2"} color={"text.info"} gutterBottom>
          {`${user.followers.length} connections`}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginLeft: "auto" }}>
        <Button variant={"contained"} size="small">
          Message
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserPageHeaderCompany;
