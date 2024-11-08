import React from "react";
import { Box, TextField } from "@mui/material";
import { UserData } from "../../../types";

interface AddressFieldProps {
  value: UserData["address"];
  onChange: (data: Partial<UserData>) => void;
}

export const AddressField: React.FC<AddressFieldProps> = ({
  value,
  onChange
}) => {
  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      address: { ...value, [field]: e.target.value }
    });
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Street"
        value={value?.street || ""}
        onChange={handleChange("street")}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="City"
        value={value?.city || ""}
        onChange={handleChange("city")}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="State"
        value={value?.state || ""}
        onChange={handleChange("state")}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="ZIP"
        value={value?.zip || ""}
        onChange={handleChange("zip")}
      />
    </Box>
  );
};
