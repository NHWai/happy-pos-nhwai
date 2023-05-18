import React from "react";
import { RouteLayout } from "../components/RouteLayout";
import Box from "@mui/material/Box/Box";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import Typography from "@mui/material/Typography/Typography";
import { config } from "../config/config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Menu } from "../typing/types";

interface NewMenu {
  menuName: string;
  price: string;
}

const CreateMenu = () => {
  const [menuList, setMenuList] = React.useState<Menu[]>();
  const [newMenu, setNewMenu] = React.useState<NewMenu>({
    menuName: "",
    price: "",
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    const url = `${config.baseurl}/menus?location=${searchParams.get(
      "location"
    )}`;
    const myHeaders = new Headers();
    const jwttoken = localStorage.getItem("token");
    jwttoken && myHeaders.append("Authorization", `Bearer ${jwttoken}`);

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      });
      if (res.ok) {
        const data = await res.json();
        setMenuList(data);
      } else {
        const data = await res.json();
        console.log(data);
        navigate(data.redirecturl);
        throw Error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMenu((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = new FormData(e.target as HTMLFormElement);
    formEl.append("locationId", searchParams.get("location") as string);
    for (let [name, value] of formEl.entries()) {
      console.log(name, value);
    }
    createMenu(formEl);
  };

  const createMenu = async (formEl: FormData) => {
    const myHeaders = new Headers();

    const jwttoken = localStorage.getItem("token");
    jwttoken && myHeaders.append("Authorization", `Bearer ${jwttoken}`);

    const response = await fetch(`${config.baseurl}/menus/`, {
      method: "POST",
      headers: myHeaders,
      body: formEl,
    });
    if (response.ok) {
      fetchData();
      setNewMenu({ menuName: "", price: "" });
    } else {
      const data = await response.json();
      navigate(`/error/${response.status}-${data.message}`);
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
        encType="multipart/form-data"
      >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Name"
          name="menuName"
          value={newMenu.menuName}
          onChange={handleChange}
          autoComplete="off"
        />
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Price"
          name="price"
          value={newMenu.price}
          onChange={handleChange}
          autoComplete="off"
        />
        <input name="menuImg" type="file" />
        <Button type="submit" variant="contained">
          Create
        </Button>
      </Box>
    </RouteLayout>
  );
};

export default CreateMenu;
