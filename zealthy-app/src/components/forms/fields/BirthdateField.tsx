import React from "react";
import { TextField } from "@mui/material";
import { UserData } from "../../../types";

interface BirthdateFieldProps {
  value: string;
  onChange: (data: Partial<UserData>) => void;
}

export const BirthdateField: React.FC<BirthdateFieldProps> = ({
  value,
  onChange
}) => (
  <TextField
    fullWidth
    type="date"
    label="Birthdate"
    value={value || ""}
    onChange={e => onChange({ birthdate: e.target.value })}
    InputLabelProps={{ shrink: true }}
  />
);
