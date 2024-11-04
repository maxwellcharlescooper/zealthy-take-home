import React from "react";
import { Box, TextField } from "@mui/material";
import { ComponentType, UserData } from "../../types";

interface ComponentRendererProps {
  components: ComponentType[];
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  components,
  data,
  onChange
}) => {
  const renderComponent = (type: ComponentType) => {
    switch (type) {
      case "about":
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            label="About Me"
            value={data.about || ""}
            onChange={e => onChange({ about: e.target.value })}
          />
        );
      case "address":
        return (
          <Box>
            <TextField
              fullWidth
              label="Street"
              value={data.address?.street || ""}
              onChange={e =>
                onChange({
                  address: { ...data.address, street: e.target.value }
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="City"
              value={data.address?.city || ""}
              onChange={e =>
                onChange({
                  address: { ...data.address, city: e.target.value }
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="State"
              value={data.address?.state || ""}
              onChange={e =>
                onChange({
                  address: { ...data.address, state: e.target.value }
                })
              }
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="ZIP"
              value={data.address?.zip || ""}
              onChange={e =>
                onChange({
                  address: { ...data.address, zip: e.target.value }
                })
              }
            />
          </Box>
        );
      case "birthdate":
        return (
          <TextField
            fullWidth
            type="date"
            label="Birthdate"
            value={data.birthdate || ""}
            onChange={e => onChange({ birthdate: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        );
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {components.map(type => (
        <Box key={type}>{renderComponent(type)}</Box>
      ))}
    </Box>
  );
};

export default ComponentRenderer;
