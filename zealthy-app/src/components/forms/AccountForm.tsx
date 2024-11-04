import React from "react";
import { TextField, Box } from "@mui/material";
import { UserData } from "../../types";

interface AccountFormProps {
  data: UserData;
  onChange: (data: Partial<UserData>) => void;
}

const AccountForm: React.FC<AccountFormProps> = ({ data, onChange }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={data.email}
        onChange={e => onChange({ email: e.target.value })}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={data.password}
        onChange={e => onChange({ password: e.target.value })}
      />
    </Box>
  );
};

export default AccountForm;
