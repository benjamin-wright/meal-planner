import { useEffect, useState } from "react";
import { Database } from "../../database";
import { Unit } from "../../database/schemas";
import { Box, TextField, useTheme } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UnitsEditLoaderResult } from "./units-edit-loader";
import { Form } from "../components/form";
import { NumericInput } from "../components/numeric-input";

interface UnitsEditProps {
  database: Database;
}

export function UnitsEdit({ database }: UnitsEditProps) {
  const [object, setObject] = useState<Unit>({ name: "", magnitudes: [] });
  const data = useLoaderData() as UnitsEditLoaderResult;
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (data.object) {
      setObject(data.object);
    }
  }, [data.object]);

  return (
    <Form
      title={object ? `Editing ${object.name}` : "New Unit"}
      returnTo="/units"
      onSubmit={async () => {
        if (object.id) {
          await database.units.put(object);
        } else {
          await database.units.add(object);
        }
        navigate("/units");
      }}
    >
      <TextField
        id="variant"
        variant="outlined"
        label="name"
        value={object.name}
        onChange={(e) =>
          setObject({ ...object, name: e.target.value.toLowerCase() })
        }
      />

      {object.magnitudes.map((magnitude, index) => (
        <Box
          key={index}
          border="dashed 1px"
          borderColor={theme.palette.primary.light}
          padding="0.5em"
          display="flex"
          flexWrap="wrap"
          gap="0.5em"
        >
          <TextField
            size="small"
            id={`magnitude-${index}-abbr`}
            variant="outlined"
            label="abbreviation"
            value={magnitude.abbrev}
            onChange={(e) => {
              object.magnitudes[index].abbrev = e.target.value;
              setObject({ ...object });
            }}
          />

          <Box display="flex" gap="0.5em">
            <TextField
              size="small"
              id={`magnitude-${index}-singular`}
              variant="outlined"
              label="singular"
              value={magnitude.singular}
              onChange={(e) => {
                object.magnitudes[index].singular = e.target.value;
                setObject({ ...object });
              }}
            />

            <TextField
              size="small"
              id={`magnitude-${index}-plural`}
              variant="outlined"
              label="plural"
              value={magnitude.plural}
              onChange={(e) => {
                object.magnitudes[index].plural = e.target.value;
                setObject({ ...object });
              }}
            />
          </Box>

          <NumericInput
            label="multiplier"
            id={`magnitude-${index}-multiplier`}
            value={magnitude.multiplier}
            onChange={(value) => {
              object.magnitudes[index].multiplier = value;
              setObject({ ...object });
            }}
          />
        </Box>
      ))}
    </Form>
  );
}
