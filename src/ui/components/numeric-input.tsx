import { Info } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  SxProps,
  Tooltip,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ParseNumber } from "../../utils/number";

interface NumericInputProps {
  id?: string;
  label: string;
  value: number;
  required?: boolean;
  info?: string;
  sx?: SxProps;
  onChange: (value: number) => void;
}

export function NumericInput({
  id,
  value,
  label,
  required,
  info,
  sx,
  onChange,
}: NumericInputProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const parsed = Number.parseFloat(text);
    if (isNaN(parsed) || parsed !== value) {
      setText(value.toString());
    }
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setText(e.target.value);
    try {
      const parsed = ParseNumber(e.target.value);
      setError("");
      onChange(parsed);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    }
  }

  return (
    <FormControl
      sx={{
        backgroundColor: theme.palette.background.paper,
        ...sx
      }}
      required={required}
    >
      <InputLabel htmlFor={id} sx={{
        padding: "0 0",
      }}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        size="small"
        type="text"
        error={error !== ""}
        inputProps={{ inputMode: "decimal", pattern: "[0-9.]*" }}
        value={text}
        onChange={handleChange}
        onBlur={handleChange}
        label={label}
        endAdornment={info ?
          <Tooltip title={info} enterTouchDelay={0} leaveTouchDelay={2000} onContextMenu={(e) => e.preventDefault()}>
            <Info />
          </Tooltip> : undefined
        }
      />
    </FormControl>
  );
}
