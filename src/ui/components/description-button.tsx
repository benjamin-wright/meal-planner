import { Button, Card, Typography } from "@mui/material";
import { ChangeEvent } from "react";

interface DescriptionButtonProps {
  children: React.ReactNode;
  text: string;
  color?: "success" | "error";
  onClick?: () => void;
  onFileLoad?: (contents: string) => void;
  onFileError?: (error: Error) => void;
}

export function DescriptionButton({ children, text, color, onClick, onFileLoad, onFileError }: DescriptionButtonProps) {
  return <Card variant="outlined" sx={{
    padding: "0.25em",
    display: "flex",
    flexDirection: "column",
    gap: "0.5em",
  }}>
    <Typography>{children}</Typography>
    <Button variant="contained" color={color || "success"} onClick={onClick}>
      {text}
      {
        onFileLoad && <input type="file" hidden onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.item(0);
          if (!file) {
            return;
          }

          file.text().then(onFileLoad).catch(onFileError || (() => { }));
        }} />
      }
    </Button>
  </Card>
}
