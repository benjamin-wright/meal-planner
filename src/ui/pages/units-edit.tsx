import { useEffect, useState } from "react";
import { Database } from "../../database";
import { Unit } from "../../database/schemas";
import { Box, Button, Card, CardActionArea, TextField } from "@mui/material";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UnitsEditLoaderResult } from "./units-edit-loader";
import { Form } from "../components/form";
import { NumericInput } from "../components/numeric-input";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import { Magnitude } from "../../database/schemas/units";

interface UnitsEditProps {
  database: Database;
}

export function UnitsEdit({ database }: UnitsEditProps) {
  const [isNew, setIsNew] = useState(false);
  const [object, setObject] = useState<Unit>({ name: "", magnitudes: [] });
  const data = useLoaderData() as UnitsEditLoaderResult;
  const navigate = useNavigate();

  useEffect(() => {
    if (data.object) {
      setIsNew(false);
      setObject(data.object);
    }
  }, [data.object]);

  function MagnitudeView({
    magnitude,
    index,
  }: {
    magnitude: Magnitude;
    index: number;
  }) {
    return (
      <Box
        display="flex"
        component={Card}
        overflow="unset"
        alignItems="stretch"
      >
        <Box
          key={index}
          padding="0.75em"
          display="flex"
          flexWrap="wrap"
          gap="0.5em"
          overflow="unset"
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
        <Button
          color="error"
          size="small"
          sx={{ flexShrink: 1, minWidth: "unset", padding: "0.5em" }}
          onClick={() => {
            object.magnitudes.splice(index, 1);
            setObject({ ...object });
          }}
        >
          <Delete />
        </Button>
      </Box>
    );
  }

  function NewMagnitude() {
    return (
      <Card
        sx={{
          overflow: "unset",
        }}
      >
        <CardActionArea
          onClick={() => {
            object.magnitudes.push({
              abbrev: "",
              singular: "",
              plural: "",
              multiplier: 1,
            });
            setObject({ ...object });
          }}
          sx={{
            padding: "1.5em",
            textAlign: "center",
          }}
        >
          <Add />
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Form
      title={isNew ? "Units: new" : `Units: ${object.name}`}
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
        <MagnitudeView magnitude={magnitude} index={index} />
      ))}

      <NewMagnitude />
    </Form>
  );
}
