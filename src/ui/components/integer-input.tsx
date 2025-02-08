import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { Box, IconButton, InputLabel, SxProps } from "@mui/material";

interface IntegerInputProps {
  value: number;
  sx?: SxProps;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function IntegerInput({value, sx, min, max, onChange}: IntegerInputProps) {
  function handleUp() {
    if (max && value >= max) {
      return;
    }

    onChange(value + 1);
  }

  function handleDown() {
    if (min && value <= min) {
      return;
    }

    onChange(value - 1);
  }

  return <Box sx={sx} position="relative" border={1} borderRadius="0.25em" borderColor="secondary.light" padding="0.35em">
    <InputLabel sx={{
      position: "absolute",
      fontSize: "0.75em",
      top: "-0.9em",
      left: "1em",
    }}>servings</InputLabel>
    <IconButton onClick={() => onChange(value - 1)} sx={{padding: 0}} disabled={min !== undefined && value <= min}>
      <ArrowLeft />
    </IconButton>
    {value}
    <IconButton onClick={() => onChange(value + 1)} sx={{padding: 0}}>
      <ArrowRight />
    </IconButton>
  </Box>
}