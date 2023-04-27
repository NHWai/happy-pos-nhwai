import { Box, Button, TextField, Typography } from "@mui/material";

export const Menus = () => {
  return (
    <Box
      sx={{
        marginX: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography my={3} variant="h4">
        Create A Menu
      </Typography>

      <Box
        component="form"
        sx={{
          maxWidth: "350px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField fullWidth variant="outlined" size="small" label="Name" />
        <TextField fullWidth variant="outlined" size="small" label="Price" />
        <Button variant="contained">Create</Button>
      </Box>
    </Box>
  );
};
