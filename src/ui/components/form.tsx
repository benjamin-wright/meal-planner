import { Box } from "@mui/material";
import { Page } from "./page";
import { IconLink } from "./icon-link";
import Save from "@mui/icons-material/Save";
import { ArrowForward } from "@mui/icons-material";

interface FormProps {
  title: string;
  returnTo?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  morePages?: boolean;
  onSubmit?: () => void;
}

export function Form({ title, returnTo, children, disabled, morePages, onSubmit }: FormProps) {
  return (
    <Page title={title} returnTo={returnTo} noScroll>
      <Box
        height="100%"
        maxHeight="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box
          component="form"
          margin="0.5em"
          padding="0.5em"
          display="flex"
          flexDirection="column"
          flexGrow="1"
          gap="1em"
          sx={{
            overflowY: "scroll",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit?.();
          }}
        >
          {children}
        </Box>
        <Box display="flex" width="100%" justifyContent="center">
          <IconLink color="success" onClick={onSubmit} big disabled={disabled}>
            {morePages ? <ArrowForward /> : <Save />}
          </IconLink>
        </Box>
      </Box>
    </Page>
  );
}
