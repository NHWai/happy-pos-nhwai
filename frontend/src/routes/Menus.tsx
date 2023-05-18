import React from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { RouteLayout } from "../components/RouteLayout";
import { Menu } from "../typing/types";
import { config } from "../config/config";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import MenuItem from "../components/MenuItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const Menus = () => {
  const [menuList, setMenuList] = React.useState<Menu[]>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <RouteLayout>
      <Box sx={{ width: "100%", marginTop: 3 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={6} sm={4} md={3}>
            <Box
              sx={{
                padding: 1,
                paddingBottom: 0,
                textAlign: "center",
                boxShadow: "1px 2px 4px rgba(0,0,0,0.3)",
                borderRadius: 1,
                height: { xs: "160px", sm: "220px" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/create-menu">
                <AddCircleOutlineIcon
                  sx={{
                    fontSize: "80px",
                    cursor: "pointer",
                    padding: 2,
                    border: "2px dotted #000",
                    borderRadius: 1,
                  }}
                />
              </Link>
            </Box>
          </Grid>
          {menuList?.map((menu) => (
            <Grid key={menu.id} item xs={6} sm={4} md={3}>
              <MenuItem name={menu.name} url={menu.menu_url} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </RouteLayout>
  );
};
