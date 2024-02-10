import {
  Book,
  GroupOutlined,
  Home,
  LightMode,
  ModeNight,
  Pages,
  People,
  Settings,
  Shop,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React, { useState } from "react";

const list = [
  { icon: <Home />, title: "Homepage", id: 1 },
  { icon: <Pages />, title: "Pages", id: 2 },
  { icon: <GroupOutlined />, title: "Groups", id: 3 },
  { icon: <Shop />, title: "Marketplace", id: 4 },
  { icon: <People />, title: "Friends", id: 5 },
  { icon: <Settings />, title: "Settings", id: 6 },
  { icon: <Book />, title: "Profile", id: 7 },
];

const Sidebar = ({ setMode }) => {
  const onModeChange = (e) => {
    if (e.target.checked) {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: { xs: "none", md: "block" },
      }}
      p={2}
    >
      <Box sx={{ position: "fixed" }}>
        <List>
          {list.map(({ icon, title, id }) => (
            <ListItem disablePadding key={id}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch onChange={onModeChange} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
