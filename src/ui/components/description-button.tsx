import { Button, Card, Typography } from "@mui/material";
import { ChangeEvent, useRef } from "react";

interface DescriptionButtonProps {
  children: React.ReactNode;
  text: string;
  color?: "success" | "error";
  onClick?: () => void;
  onFileLoad?: (contents: string) => void;
  onFileError?: (error: Error) => void;
}

export function DescriptionButton({ children, text, color, onClick, onFileLoad, onFileError }: DescriptionButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onFileInputClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return <Card variant="outlined" sx={{
    padding: "0.25em",
    display: "flex",
    flexDirection: "column",
    gap: "0.5em",
    backgroundColor: "background.paper"
  }}>
    <Typography>{children}</Typography>
    <Button variant="contained" color={color || "success"} onClick={onFileLoad ? onFileInputClick : onClick}>
      {text}
      {
        onFileLoad && <input type="file" ref={fileInputRef} hidden onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.item(0);
          if (!file) {
            return;
          }

          file.text().then((contents: string) => onFileLoad(contents)).catch(onFileError || (() => { }));
        }} />
      }
    </Button>
  </Card>
}
