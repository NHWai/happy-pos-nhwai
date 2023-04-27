import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";

export default function Navbar() {
  let { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const locationId = localStorage.getItem("selectedLocation");

  const drawerItems = [
    { label: "Menus", icon: <LocalDiningIcon />, link: "menus" },
    {
      label: "Menu Categories",
      icon: <CategoryIcon />,
      link: "menu-categories",
    },
    { label: "Addons", icon: <LunchDiningIcon />, link: "addons" },
    {
      label: "Addon Categories",
      icon: <ClassIcon />,
      link: "addon-categories",
    },
    { label: "Setting", icon: <SettingsIcon />, link: "setting" },
  ];
  const pageLabel =
    drawerItems[drawerItems.findIndex((el) => el.link === pathname.slice(1))]
      ?.label || "Home";

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setIsOpen(open);
    };

  const list = () => {
    return (
      <Box
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        sx={{ width: "250" }}
      >
        <List>
          {drawerItems.slice(0, 4).map((item) => (
            <ListItem key={item.label}>
              <ListItemButton
                component={RouterLink}
                to={item.link + "?location=" + locationId}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          {drawerItems.slice(-1).map((item) => (
            <ListItem key={item.label}>
              <ListItemButton component={RouterLink} to={item.link}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "primary" }}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageLabel}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
