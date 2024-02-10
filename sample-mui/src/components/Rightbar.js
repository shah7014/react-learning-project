import { Avatar, AvatarGroup, Box, Typography } from "@mui/material";
import React from "react";

const Rightbar = () => {
  return (
    <Box
      sx={{
        flex: 2,
        display: { xs: "none", md: "block" },
      }}
      p={2}
    >
      <Box position={"fixed"}>
        <Typography variant="h6" fontWeight={100}>
          Online Friends
        </Typography>
        <AvatarGroup max={4}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default Rightbar;
