import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { NumericInput } from "../../../components/numeric-input";
import Button from "@mui/material/Button";
import Delete from "@mui/icons-material/Delete";
import { Collective } from "../../../../models/units";
import { TextInput } from "../../../components/text-input";

interface CollectiveEditProps {
  index: number;
  collective: Collective;
  multiple?: boolean;
  onChange?: (collective: Collective) => void;
  onRemove?: () => void;
}

export function CollectiveEdit({
  index,
  collective,
  multiple,
  onChange,
  onRemove,
}: CollectiveEditProps) {
  return (
    <Box
      display="flex"
      component={Card}
      overflow="unset"
      alignItems="stretch"
    >
      <Box
        padding="0.75em"
        display="flex"
        flexWrap="wrap"
        gap="0.5em"
        overflow="unset"
      >
        <Box display="flex" gap="0.5em">
          <TextInput
            size="small"
            id={`collective-${index}-singular`}
            variant="outlined"
            label="singular"
            required={multiple}
            lowercase
            value={collective.singular}
            onChange={(value) => onChange?.({ ...collective, singular: value })}
          />

          <TextInput
            size="small"
            id={`collective-${index}-plural`}
            variant="outlined"
            label="plural"
            required={multiple}
            lowercase
            value={collective.plural}
            onChange={(value) => onChange?.({ ...collective, plural: value })}
          />
        </Box>

        {multiple && (
          <NumericInput
            label="multiplier"
            required
            value={collective.multiplier || 1}
            onChange={(value) => {
              collective.multiplier = value;
              onChange?.(collective);
            }}
          />
        )}
      </Box>
      <Button
        color="error"
        size="small"
        sx={{ flexShrink: 1, minWidth: "unset", padding: "0.5em" }}
        onClick={() => {
          onRemove?.();
        }}
      >
        <Delete />
      </Button>
    </Box>
  );
}
