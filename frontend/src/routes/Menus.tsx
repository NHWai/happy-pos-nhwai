import React from "react";
import { Box, Button, Chip, Stack, TextField, Typography } from "@mui/material";
import { RouteLayout } from "../components/RouteLayout";
import { Menu } from "../typing/types";
import { config } from "../config/config";
import { Link, useSearchParams } from "react-router-dom";

interface NewMenu {
  menuName: string;
  price: string;
}

export const Menus = () => {
  const [menuList, setMenuList] = React.useState<Menu[]>();
  const [newMenu, setNewMenu] = React.useState<NewMenu>({
    menuName: "",
    price: "",
  });
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    fetchData();
  }, []);
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMenu((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMenu();
  };

  const createMenu = async () => {
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    try {
      const response = await fetch(`${config.baseurl}/menus/`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          ...newMenu,
          price: Number(newMenu.price),
          locationId: Number(searchParams.get("location")),
        }),
        redirect: "follow",
      });
      const data = await response.json();
      if (data.length === 0) {
        fetchData();
        setNewMenu({ menuName: "", price: "" });
      } else {
        throw new Error("Something wrong with creating new menu");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RouteLayout>
      <Typography my={3} variant="h4">
        Create A Menu
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: "350px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginBottom: 3,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Name"
          name="menuName"
          value={newMenu.menuName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Price"
          name="price"
          value={newMenu.price}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Create
        </Button>
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
