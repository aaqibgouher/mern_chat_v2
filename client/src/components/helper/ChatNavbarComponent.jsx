import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import ProfilePicture from "../../assets/profile.avif";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { showDrawer } from "../../actions/helperActions";

function NavbarComponent() {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.userReducers.selectedChat);
  const soloMenuNavbarState = useSelector(
    (state) => state.helperReducers.chatNavbarMenuSolo
  );
  const groupMenuNavbarState = useSelector(
    (state) => state.helperReducers.chatNavbarMenuGroup
  );
  const selectedContactDetailState = useSelector(
    (state) => state.userReducers.selectedContactDetail
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (action) => {
    setAnchorEl(null);
    if (action === "handleNewGroup")
      console.log("need to implement"); // await handleNewGroup();
    else if (action === "handleSettings")
      console.log("need to implement"); // await handleSettings();
    else if (action === "handleLogout") console.log("need to implement"); // await handleLogout();
    console.log(action, "called");
  };

  const handleDetailOpen = (type) => {
    console.log("type", type);
    dispatch(showDrawer(type));
  };

  useEffect(() => {
    if (selectedContactDetailState) {
      // means group detail else solo detail
      if ("group" in selectedContactDetailState) {
        setName(selectedContactDetailState.group.name || "Group");
        setProfile(
          selectedContactDetailState.group.profileURL || ProfilePicture
        );
      } else {
        setName(selectedContactDetailState.name || "Solo");
        setProfile(selectedContactDetailState.profile || ProfilePicture);
      }
    }
  }, [selectedContactDetailState]);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            alt="Profile Picture"
            src={profile}
            onClick={() => handleDetailOpen("userContactDetail")}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              ml: 2,
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {name}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {selectedChat &&
              ("isGroup" in selectedChat && !selectedChat.isGroup
                ? soloMenuNavbarState
                : groupMenuNavbarState
              ).map((menu, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleMenuClose(menu.action)}
                >
                  {menu.name}
                </MenuItem>
              ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavbarComponent;
