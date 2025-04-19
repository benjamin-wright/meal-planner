import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

interface OutlinedContainerProps {
  label: string;
  children: React.ReactNode;
}

export function OutlinedContainer({children, label}: OutlinedContainerProps) {
  const theme = useTheme();

  return (<Paper style={{ padding: "10px -1px", border: "none", boxShadow: "none" }}>
      <fieldset style={{ border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`, borderRadius: theme.shape.borderRadius, padding: "0", margin: "-1px", marginTop: "-6px", outline: "none" }}>
      <legend style={{ margin: "0 1em", padding: "0 0.25em", fontSize: "0.75em"}}>
        <span>{label}</span>
      </legend>
      <Box padding="0.5em 1em 0.75em">
        {children}
      </Box>
    </fieldset>
  </Paper>);
}