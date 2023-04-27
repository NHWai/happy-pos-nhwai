import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { AppContext } from "../components/AppContext";

export const Setting = () => {
  const { locations } = React.useContext(AppContext);

  const [userSelectlocation, setUserSelectlocation] = React.useState(
    localStorage.getItem("selectedLocation") || ""
  );

  const handleChange = (event: SelectChangeEvent) => {
    localStorage.setItem("selectedLocation", event.target.value as string);
    setUserSelectlocation(event.target.value as string);
  };
  return (
    <Box
      sx={{
        maxWidth: "500px",
        marginX: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 3,
      }}
    >
      <Typography mb={2} variant="h4">
        Choose Your Location
      </Typography>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userSelectlocation}
            label="Location"
            onChange={handleChange}
          >
            {locations?.map((el) => (
              <MenuItem key={el.id} value={el.id}>
                {el.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
