import React, { useEffect } from "react";
import DashboardComponent from "../components/dashboard/messages/MessageComponent";
import DashboardLayout from "../layouts/DashboardLayout";
import { useDispatch } from "react-redux";
import { fetchContactsAction, fetchMeAction } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../actions/helperActions";
import { SHOW_SNACKBAR } from "../actionTypes/helperActionTypes";

const DashboardPage = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchMe = async () => {
    try {
      const res = await dispatch(fetchMeAction());
    } catch (error) {
      console.log(error, "from fetch me dashboard page ");
    }
  };

  const fetchContacts = async () => {
    try {
      await dispatch(fetchContactsAction());
    } catch (error) {
      console.log(error, "from fetch contacts");
    }
  };

  useEffect(() => {
    fetchMe();
    fetchContacts();
  }, []);

  return <DashboardLayout />;
};

export default DashboardPage;
