import TextField, { TextFieldVariants } from "@mui/material/TextField";
import { ChangeEvent, createRef, FocusEvent, KeyboardEvent } from "react";

interface TextInputProps {
  size?: "small" | "medium";
  value?: string;
  onChange: (value: string) => void;
  id: string;
  variant?: TextFieldVariants;
  label: string;
  lowercase?: boolean;
  required?: boolean;
}

export function TextInput({
  size,
  value,
  onChange,
  id,
  variant,
  label,
  lowercase,
  required,
}: TextInputProps) {
  const inputRef = createRef<HTMLTextAreaElement | HTMLInputElement>();

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (lowercase && e.key === "Enter") {
      inputRef.current?.blur();
    }
  }

  return (
    <TextField
      size={size || "medium"}
      inputRef={inputRef}
      id={id}
      variant={variant || "outlined"}
      label={label}
      value={value}
      required={required}
      onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onChange(e.target.value);
      }}
      onBlur={(e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (lowercase) {
          return onChange(e.target.value.toLowerCase());
        }
      }}
      onKeyDown={onKeyDown}
    />
  )
}