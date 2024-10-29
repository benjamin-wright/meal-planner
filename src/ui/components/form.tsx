import { Box, Card } from "@mui/material";
import { Page } from "./page";
import Check from "@mui/icons-material/Check";
import { IconLink } from "./icon-link";
import Close from "@mui/icons-material/Close";

interface FormProps {
  title: string;
  returnTo?: string;
  children?: React.ReactNode;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export function Form({
  title,
  returnTo,
  children,
  onSubmit,
  onCancel,
}: FormProps) {
  return (
    <Page title={title} returnTo={returnTo} hideNav>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
        <Card>
          <Box
            component="form"
            margin="0.5em"
            padding="0.5em"
            display="flex"
            flexDirection="column"
            gap="1em"
          >
            {children}
          </Box>
        </Card>
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          flexShrink="1"
        >
          <IconLink color="success" onClick={onSubmit}>
            <Check />
          </IconLink>
          <IconLink color="error" onClick={onCancel}>
            <Close />
          </IconLink>
        </Box>
      </Box>
    </Page>
  );
}
