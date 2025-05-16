import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { IconLink } from "./icon-link";
import Close from "@mui/icons-material/Close";
import Check from "@mui/icons-material/Check";

interface ConfirmDialogProps {
  message: string;
  open: boolean;
  disableRestoreFocus?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  message,
  open,
  disableRestoreFocus,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Dialog open={!!open} disableRestoreFocus={disableRestoreFocus}>
      <DialogTitle textAlign="center">{message}</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to do this?</Typography>
        <Box display="flex" justifyContent="space-between" marginTop="1em">
          <IconLink color="success" onClick={onConfirm}>
            <Check />
          </IconLink>
          <IconLink color="error" onClick={onCancel}>
            <Close />
          </IconLink>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
