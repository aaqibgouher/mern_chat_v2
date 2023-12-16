import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProfilePicture from "../../assets/profile2.avif";
import ForumIcon from "@mui/icons-material/Forum";
import { logoutAction } from "../../actions/authActions";
import UserDetailDrawerComponent from "./UserDetailDrawerComponent";
import { showDrawer } from "../../actions/helperActions";
import { REGISTER_USER } from "../../actionTypes/authActionTypes";
import {
  FETCH_CONTACTS,
  FETCH_CONTACT_DETAIL,
  FETCH_ME,
  SET_SELECTED_CHAT,
} from "../../actionTypes/userActionTypes";
import { FETCH_CHATS, FETCH_MESSAGES } from "../../actionTypes/chatActionTypes";

function NavbarComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navbarMenu = useSelector((state) => state.helperReducers.navbarMenu);
  const userDetails = useSelector((state) => state.userReducers.me);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNewGroup = async () => {
    console.log("handle new group");
    await dispatch(showDrawer("createGroup"));
  };

  const handleSettings = async () => {
    console.log("handle settings");
  };

  const handleLogout = async () => {
    console.log("handle logout");
    try {
      const res = await dispatch(logoutAction());

      if (!res) throw res;

      // setting all state values to null
      // user
      await dispatch({ type: REGISTER_USER, payload: null });
      await dispatch({ type: FETCH_ME, payload: null });
      await dispatch({ type: FETCH_CONTACTS, payload: [] });
      await dispatch({ type: SET_SELECTED_CHAT, payload: null });
      await dispatch({ type: FETCH_CONTACT_DETAIL, payload: null });

      // chat
      await dispatch({ type: FETCH_CHATS, payload: [] });
      await dispatch({ type: FETCH_MESSAGES, payload: [] });

      // redirecting to login page
      navigate("/login");
    } catch (error) {
      console.log(error, "from handle logout component");
    }
  };

  const handleMenuClose = async (action) => {
    setAnchorEl(null);
    if (action === "handleNewGroup") await handleNewGroup();
    else if (action === "handleSettings") await handleSettings();
    else if (action === "handleLogout") await handleLogout();
  };

  const handleUserDetailDrawer = (type) => {
    console.log("type", type);
    dispatch(showDrawer(type));
  };

  const handleContactOpen = (type) => {
    console.log("type", type);
    dispatch(showDrawer(type));
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Profile Picture */}
        <Avatar
          alt="Profile Picture"
          src={
            userDetails && userDetails.profile
              ? userDetails.profile
              : ProfilePicture
          }
          onClick={() => handleUserDetailDrawer("userDetail")}
        />
        {/* <UserDetailDrawerComponent /> */}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* chat icon */}
        <IconButton
          color="inherit"
          onClick={() => handleContactOpen("contactsDetail")}
        >
          <ForumIcon />
        </IconButton>

        {/* Three Dots Icon */}
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>

        {/* Menu for Three Dots Icon */}
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {navbarMenu.map((menu, index) => (
            <MenuItem key={index} onClick={() => handleMenuClose(menu.action)}>
              {menu.name}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
export default NavbarComponent;
