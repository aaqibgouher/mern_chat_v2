import React, { useEffect } from "react";
import { Drawer, Divider, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";
import { hideDrawer } from "../../actions/helperActions";
import UserDetailComponent from "../dashboard/UserDetailComponent";
import ContactsDetailComponent from "../dashboard/ContactsDetailComponent";
import UserContactDetailComponent from "../dashboard/UserContactDetailComponent";
import CreateGroupComponent from "../dashboard/CreateGroupComponent";

const useStyles = makeStyles(() => ({
  drawer: {
    width: 400,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 400,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "8px",
  },
}));

const UserDetailDrawerComponent = () => {
  const showDrawer = useSelector((state) => state.helperReducers.showDrawer);
  const drawerType = useSelector((state) => state.helperReducers.drawerType);
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleDrawerClose = () => {
    dispatch(hideDrawer());
  };

  return (
    <>
      <Drawer
        className={classes.drawer}
        anchor="right"
        open={showDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={handleDrawerClose}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {drawerType === "userDetail" && <UserDetailComponent />}
        {drawerType === "contactsDetail" && <ContactsDetailComponent />}
        {drawerType === "userContactDetail" && <UserContactDetailComponent />}
        {drawerType === "createGroup" && <CreateGroupComponent />}
      </Drawer>
    </>
  );
};

export default UserDetailDrawerComponent;
