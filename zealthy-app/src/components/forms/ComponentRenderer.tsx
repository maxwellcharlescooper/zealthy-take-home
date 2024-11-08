import React from "react";
import { Box } from "@mui/material";
import { ComponentType, UserData } from "../../types";

import { AboutField } from "./fields/AboutField";
import { AddressField } from "./fields/AddressField";
import { BirthdateField } from "./fields/BirthdateField";
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
  const componentMap: Record<ComponentType, React.FC<any>> = {
    about: AboutField,
    address: AddressField,
    birthdate: BirthdateField
  };

  const getComponentProps = (type: ComponentType) => {
    switch (type) {
      case "about":
        return { value: data.about };
      case "address":
        return { value: data.address };
      case "birthdate":
        return { value: data.birthdate };
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {components.map(type => {
        const Component = componentMap[type];
        return (
          <Box key={type}>
            <Component {...getComponentProps(type)} onChange={onChange} />
          </Box>
        );
      })}
    </Box>
  );
};

export default ComponentRenderer;
