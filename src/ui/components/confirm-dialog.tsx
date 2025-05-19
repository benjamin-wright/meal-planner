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

interface ConfirmDialogProps<T> {
  message: string;
  item?: T;
  disableRestoreFocus?: boolean;
  onConfirm: (item: T) => void;
  onCancel: () => void;
}

export function ConfirmDialog<T>({
  message,
  item,
  disableRestoreFocus,
  onConfirm,
  onCancel,
}: ConfirmDialogProps<T>) {
  return (
    <Dialog open={!!item} disableRestoreFocus={disableRestoreFocus}>
      <DialogTitle textAlign="center">{message}</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to do this?</Typography>
        <Box display="flex" justifyContent="space-between" marginTop="1em">
          <IconLink color="success" onClick={() => onConfirm(item as T)}>
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
