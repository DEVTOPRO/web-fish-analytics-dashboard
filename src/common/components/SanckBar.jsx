import React from "react";
import { Snackbar, IconButton, MuiAlert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({}));

export default function CustomSnackbar(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={props.handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div>
      <Snackbar
        open={props.open}
        autoHideDuration={3000}
        onClose={props.handleClose}
        action={action}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        ContentProps={{
          sx: {
            background: props.background || "green",
          },
        }}
        message={props.message}
      />
    </div>
  );
}

