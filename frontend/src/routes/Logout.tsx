import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../components/MainLayout";
import Navbar from "../components/Navbar";

const Logout = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => navigate("/login"), 1000 * 10);
  }, []);

  return (
    <MainLayout>
      <Navbar />
      <Box sx={{ paddingX: "1.5rem" }}>
        {/* login page outlet starts here */}
        <Typography mt={3} variant="h3" align="center">
          You're logged out!!
        </Typography>
      </Box>
    </MainLayout>
  );
};

export default Logout;
