import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ActionButton from "./Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "425px !important",
    },
  },
  root1: {
    '& .MuiDialog-paperWidthSm': {
      width: '100%',
      borderRadius: '3px',
      minWidth:'700px'
    },
  },
  root3: {
    textAlign: "center",
    fontWeight: "1000",
    fontSize: "large",
  },
  closeButton: {
    position: "absolute",
    color: "grey",
  },
}));

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    // onClose(selectedValue);
  };
  return (
   
    <Dialog
      className={props.otpModal?classes.root:classes.root1}
      aria-labelledby="simple-dialog-title"
      aria-describedby="alert-dialog-description"
      open={open}
    >
      {props.modalTitle && (
        <DialogTitle
          className={props.modalTitleCenter ? classes.root3 : ""}
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{
                padding: "5px 0px 0px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {props.modalTitle}
            </div>
            <div>
              {props.isNotRequiredCancelIcon ? null : (
                <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={() => {
                    props.onClose(false);
                  }}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </div>
          </div>
        </DialogTitle>
      ) }
      <DialogContent
        style={{
          background: props.background,
          backgroundColor: props.backgroundColor,
          maxWidth: props.maxWidth,
          backgroundImage: props.backgroundImage,
          padding: props.padding,
          paddingTop: props.paddingTop ? props.paddingTop : "0px",
        }}
      >
        <DialogContentText id="alert-dialog-description">
          {props.modalContent}
        </DialogContentText>
      </DialogContent>
      {props.modalFooterRequired ? (
        <div>
          <DialogActions>
            {props.buttonFooter ? (
              <div>
                {" "}
                <ActionButton
                  buttonText={props.modalActionText}
                  handleSubmit={props.handleSubmit}
                  backgroundColor={"#1976d2"}
                  color="#fff"
                  border={"none"}
                  width="120px"
                />
              </div>
            ) : (
              ""
            )}
          </DialogActions>
        </div>
      ) : (
        ""
      )}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  // selectedValue: PropTypes.string.isRequired,
};

export default function CustomModal(props) {
  return (
    <div>
      <SimpleDialog
        modalContent={props.modalContent}
        modalTitleRequired={props.modalTitleRequired}
        modalFooterRequired={props.modalFooterRequired}
        handleSubmit={props.handleSubmit}
        modalActionText={props.modalActionText}
        open={props.open}
        onClose={props.handleClose}
        modalTitle={props.modalTitle}
        isNotRequiredCancelIcon={props.isNotRequiredCancelIcon}
        background={props.background}
        backgroundColor={props.backgroundColor}
        maxWidth={props.maxWidth}
        backgroundImage={props.backgroundImage}
        paddingTop={props.paddingTop}
        buttonFooter={props.buttonFooter}
        modalTitleCenter={props.modalTitleCenter}
        otpModal={props.otpModal}
      />
    </div>
  );
}
