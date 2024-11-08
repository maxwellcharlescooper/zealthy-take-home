import React from "react";
import { TextField } from "@mui/material";
import { UserData } from "../../../types";

interface AboutFieldProps {
  value: string;
  onChange: (data: Partial<UserData>) => void;
}

export const AboutField: React.FC<AboutFieldProps> = ({ value, onChange }) => (
  <TextField
    fullWidth
    multiline
    rows={4}
    label="About Me"
    value={value || ""}
    onChange={e => onChange({ about: e.target.value })}
  />
);
