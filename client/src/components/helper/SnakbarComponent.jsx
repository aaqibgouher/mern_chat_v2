import { useSelector, useDispatch } from "react-redux";
import { hideSnackbar } from "../../actions/helperActions";
import { Snackbar } from "@mui/material";

const SnackbarComponent = () => {
  let open = useSelector((state) => state.helperReducers.showSnackbar);
  let message = useSelector((state) => state.helperReducers.snackbarMessage);
  let dispatch = useDispatch();

  setTimeout(() => {
    dispatch(hideSnackbar());
    console.log("called");
  }, 3000);

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </>
  );
};

export default SnackbarComponent;
