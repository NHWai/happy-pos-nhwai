import Box from "@mui/material/Box";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        maxWidth: "1280px",
        marginX: "auto",
        minHeight: "100vh",
      }}
    >
      {children}
    </Box>
  );
};
