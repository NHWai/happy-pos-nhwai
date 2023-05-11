import { Typography } from "@mui/material";
import React from "react";
import { AppContext } from "../components/AppContext";
import { config } from "../config/config";

export const Home = () => {
  const { setLocations } = React.useContext(AppContext);

  React.useEffect(() => {
    const getLocations = async (url: string) => {
      const myHeaders = new Headers();
      const jwttoken = localStorage.getItem("token");
      jwttoken && myHeaders.append("Authorization", `Bearer ${jwttoken}`);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: myHeaders,
        });
        if (response.status === 200) {
          const data = await response.json();
          if (!localStorage.getItem("selectedLocation")) {
            localStorage.setItem(
              "selectedLocation",
              JSON.stringify(data[0].id)
            );
          }
          setLocations(data);
        } else {
          throw new Error(await response.json());
        }
      } catch (err) {
        console.log(err);
      }
    };
    getLocations(`${config.baseurl}/locations`);
  }, []);
  return <Typography variant="h4">Home</Typography>;
};
