import { Box } from "@mui/material";
import { Page } from "./page";
import { IconLink } from "./icon-link";
import Save from "@mui/icons-material/Save";

interface FormProps {
  title: string;
  returnTo?: string;
  children?: React.ReactNode;
  onSubmit?: () => void;
}

export function Form({ title, returnTo, children, onSubmit }: FormProps) {
  return (
    <Page title={title} returnTo={returnTo} hideNav>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="space-between"
      >
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
        <Box display="flex" width="100%" flexShrink="1" justifyContent="center">
          <IconLink color="success" onClick={onSubmit} big>
            <Save />
          </IconLink>
        </Box>
      </Box>
    </Page>
  );
}
