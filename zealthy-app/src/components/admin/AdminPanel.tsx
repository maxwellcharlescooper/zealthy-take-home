import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
  Snackbar,
  Grid
} from "@mui/material";
import { api } from "../../api";
import { ComponentType, Config } from "../../types";

interface AdminPanelProps {
  config: Config;
  onConfigChange: (config: Config) => void;
}

const COMPONENTS = {
  about: "About Me Section",
  address: "Address Collection",
  birthdate: "Birth Date Selection"
} as const;

const AdminPanel: React.FC<AdminPanelProps> = ({ config, onConfigChange }) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Handle component selection for each page
  const handleChange = (page: "page2Components" | "page3Components") => (
    event: any
  ) => {
    const newComponents = event.target.value as ComponentType[];
    const newConfig = {
      ...config,
      [page]: newComponents
    };

    // Validate selection
    const allComponents = [
      ...newConfig.page2Components,
      ...newConfig.page3Components
    ];
    const hasDuplicates = allComponents.length !== new Set(allComponents).size;

    if (hasDuplicates) {
      setError("Components cannot be used on multiple pages");
      return;
    }

    if (newComponents.length === 0) {
      setError("Each page must have at least one component");
      return;
    }

    onConfigChange(newConfig);
  };

  // Save configuration
  const handleSave = async () => {
    try {
      await api.updateConfig(config);
      setSuccess("Configuration saved successfully");
    } catch (err) {
      setError("Failed to save configuration");
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Configure Onboarding Flow
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          {/* Page 2 Configuration */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Page 2 Components</InputLabel>
              <Select
                label="Page 2 Components"
                multiple
                value={config.page2Components}
                onChange={handleChange("page2Components")}
                renderValue={selected =>
                  (selected as string[])
                    .map(s => COMPONENTS[s as ComponentType])
                    .join(", ")
                }
              >
                {(Object.keys(COMPONENTS) as ComponentType[]).map(comp => (
                  <MenuItem
                    key={comp}
                    value={comp}
                    disabled={config.page3Components.includes(comp)}
                  >
                    {COMPONENTS[comp]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Page 3 Configuration */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Page 3 Components </InputLabel>
              <Select
                label="Page 3 Components"
                multiple
                value={config.page3Components}
                onChange={handleChange("page3Components")}
                renderValue={selected =>
                  (selected as string[])
                    .map(s => COMPONENTS[s as ComponentType])
                    .join(", ")
                }
              >
                {(Object.keys(COMPONENTS) as ComponentType[]).map(comp => (
                  <MenuItem
                    key={comp}
                    value={comp}
                    disabled={config.page2Components.includes(comp)}
                  >
                    {COMPONENTS[comp]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" onClick={handleSave}>
            Save Configuration
          </Button>
          <Button variant="outlined" href="/">
            Preview Flow
          </Button>
        </Box>
      </Paper>

      <Typography variant="body2" color="text.secondary">
        Note: Each component can only be used on one page, and each page must
        have at least one component.
      </Typography>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(success)}
        autoHideDuration={3000}
        onClose={() => setSuccess("")}
      >
        <Alert severity="success" onClose={() => setSuccess("")}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPanel;
