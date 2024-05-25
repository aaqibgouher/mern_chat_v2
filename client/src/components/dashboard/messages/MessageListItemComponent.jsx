import { Avatar, Box, Chip, Grid, Paper, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";

const MessageListItemComponent = ({ msg, loading }) => {
  const theme = useTheme();
  const meState = useSelector((state) => state.userReducers.me);
  msg.type = "text";

  const renderContent = () => {
    switch (msg.type) {
      case "text":
        return (
          <Chip
            avatar={
              <Avatar
                style={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.text.white,
                }}
              >
                {msg.fromUserName}
              </Avatar>
            }
            label={msg.message}
            variant="outlined"
            size="medium"
          />
        );
      case "image":
        return (
          <img
            src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/05/online-learning.jpeg.jpg"
            alt="message"
            style={{ maxWidth: "100%" }}
          />
        );
      case "video":
        return (
          <video controls style={{ maxWidth: "100%" }}>
            <source src={msg.message} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      default:
        return "Unsupported message type";
    }
  };

  return (
    <>
      <Grid
        container
        justifyContent={
          msg.fromUserId === meState?._id ? "flex-end" : "flex-start"
        }
        sx={{
          textAlign: msg.fromUserId === meState?._id ? "right" : "left",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{ mb: 1, mr: msg.fromUserId === meState?._id ? 0 : 2 }}
        >
          {loading ? (
            <Chip
              avatar={
                <Skeleton variant="circular">
                  <Avatar
                    style={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.text.white,
                    }}
                  >
                    {msg.fromUserName}
                  </Avatar>
                </Skeleton>
              }
              label={
                <Skeleton variant="text" width="80%">
                  {msg.message}
                </Skeleton>
              }
              variant="outlined"
              size="medium"
              sx={{
                "& .MuiChip-label": {
                  color: "transparent", // Hide the text
                },
              }}
            />
          ) : (
            <Box>{renderContent()}</Box>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default MessageListItemComponent;
