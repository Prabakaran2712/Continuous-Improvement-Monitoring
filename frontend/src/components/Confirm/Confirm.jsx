import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Confirm = (props) => {
  const [open, setOpen] = React.useState(props.open || false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    props.setOpen(false);
  };
  const handleSuccessClose = () => {
    props.setOpen(false);

    props.onSuccess();
  };
  const handleFailClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={props.open || false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.title || "Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content || "Are you sure?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFailClose}>{props.fail}</Button>
          <Button onClick={handleSuccessClose} autoFocus>
            {props.success}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Confirm;
