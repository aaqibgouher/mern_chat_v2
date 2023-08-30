import { useSelector, useDispatch } from "react-redux";
import { hideSnackbar } from "../../actions/helperActions";
import { Snackbar, useTheme } from "@mui/material";

const SnackbarComponent = () => {
  const theme = useTheme();

  let open = useSelector((state) => state.helperReducers.showSnackbar);
  let message = useSelector((state) => state.helperReducers.snackbarMessage);
  let dispatch = useDispatch();

  setTimeout(() => {
    dispatch(hideSnackbar());
    console.log("called");
  }, 5000);

  return (
    <>
      <Snackbar
        open={open}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        style={{ backgroundColor: theme.palette.primary.main }}
      />
    </>
  );
};

export default SnackbarComponent;
