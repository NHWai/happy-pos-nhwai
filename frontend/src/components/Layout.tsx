import { PageLayout } from "./PageLayout";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export const Layout = () => {
  return (
    <PageLayout>
      <Navbar />
      <Box sx={{ paddingX: "1.5rem" }}>
        <Outlet />
      </Box>
    </PageLayout>
  );
};
