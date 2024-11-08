import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnboardingFlow from "./components/onboarding/OnboardingFlow";
import AdminPanel from "./components/admin/AdminPanel";
import DataTable from "./components/data/DataTable";
import { api } from "./api";
import { Config } from "./types";

const defaultConfig: Config = {
  page2Components: ["about", "birthdate"],
  page3Components: ["address"]
};

const App: React.FC = () => {
  const [config, setConfig] = useState<Config>(defaultConfig);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await api.getConfig();
        setConfig(data);
      } catch (error) {
        console.error("Failed to fetch config:", error);
        setConfig(defaultConfig);
      }
    };

    fetchConfig();
  }, []);

  const handleConfigUpdate = async (newConfig: Config) => {
    setConfig(newConfig);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnboardingFlow config={config} />} />
        <Route
          path="/admin"
          element={
            <AdminPanel config={config} onConfigChange={handleConfigUpdate} />
          }
        />
        <Route path="/data" element={<DataTable />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
