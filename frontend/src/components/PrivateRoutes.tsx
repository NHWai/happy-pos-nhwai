import { MainLayout } from "./MainLayout";
import Navbar from "./Navbar";
import { Navigate, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export const PrivateRoutes = () => {
  const isLoggedIn =
    localStorage.getItem("token") &&
    Number(localStorage.getItem("exp")) > Date.now();

  return (
    <MainLayout>
      <Navbar />
      <Box sx={{ paddingX: "1.5rem" }}>
        {isLoggedIn ? <Outlet /> : <Navigate to="/login" />}
      </Box>
    </MainLayout>
  );
};
