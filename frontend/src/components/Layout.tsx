import { MainLayout } from "./MainLayout";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export const Layout = () => {
  return (
    <MainLayout>
      <Navbar />
      <Box sx={{ paddingX: "1.5rem" }}>
        <Outlet />
      </Box>
    </MainLayout>
  );
};
