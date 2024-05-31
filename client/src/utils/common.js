import moment from "moment";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const formatRelativeTime = (date) => {
  return moment(date).fromNow();
};
