import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

export default function TransitionAlerts(props) {
  // const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <Stack sx={{ }} spacing={2}>
      <Alert severity={props.status || "success"}>{props.message}</Alert>
    </Stack>
  );
}
