import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
  Typography,
} from "@mui/material";

const Dialog = ({ open, onClose, onConfirmation }) => {
  return (
    <MuiDialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{ textAlign: "center", color: "red", textTransform: "uppercase" }}
      >
        Alert
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">
          Are you sure you want to delete all itinearies added?
        </Typography>
        <Typography variant="body2">
          Once deleted, items can't be recovered
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => {
            onClose();
            onConfirmation();
          }}
        >
          Proceed
        </Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
