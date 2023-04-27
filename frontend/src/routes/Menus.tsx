import React from "react";
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import { RouteLayout } from "../components/RouteLayout";
import { Menu } from "../typing/types";
import { config } from "../config/config";
import { Link, useSearchParams } from "react-router-dom";

export const Menus = () => {
  const [menuList, setMenuList] = React.useState<Menu[]>();
  const [searchParams] = useSearchParams();
  React.useEffect(() => {
    const fetchData = async () => {
      const url = `${config.baseurl}/menus?location=${searchParams.get(
        "location"
      )}`;
      const res = await fetch(url, {
        method: "GET",
      });
      const data = await res.json();
      setMenuList(data);
    };
    fetchData();
  }, []);

  return (
    <RouteLayout>
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
          marginBottom: 3,
        }}
      >
        <TextField fullWidth variant="outlined" size="small" label="Name" />
        <TextField fullWidth variant="outlined" size="small" label="Price" />
        <Button variant="contained">Create</Button>
      </Box>
      <Box
        sx={{
          maxWidth: "400px",
        }}
      >
        <Typography mb={1} variant="h5">
          Menu Lists
        </Typography>
        <Stack flexDirection={"row"} gap={1}>
          {menuList?.map((item) => (
            <Link key={item.name} to={`/menus/${item.id}`}>
              <Chip label={item.name} style={{ cursor: "pointer" }} />
            </Link>
          ))}
        </Stack>
      </Box>
    </RouteLayout>
  );
};
