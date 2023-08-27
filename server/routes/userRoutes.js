const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// USER ROUTES

// get logged in user detail
router.get("/me", userController.getUser);

// get users for add user
router.get("/search", userController.getSearchUsers);

// get added users
router.get("/connected", userController.getConnectedUsers);

// create group
router.post("/create-group", userController.createGroup);

// exit a  group
router.delete("/exit-group", userController.exitGroup);

// add User In  Contacts
router.post("/add-user-in-contact", userController.addUserInContact);

// get users for profile
router.get("/Contact-details", userController.getContactDetails);

// remove group members from group
router.delete("/remove-user-from-group", userController.removeUserFromGroup);

// add participant to group
router.post("/add-member-to-group", userController.addMemberToGroup);

// send message solo or to group
router.post("/send-message", userController.sendMessage);
// toggle admin status in group
router.post("/toggle-admin-status", userController.toggleAdminStatus);

// exported router
module.exports = router;
