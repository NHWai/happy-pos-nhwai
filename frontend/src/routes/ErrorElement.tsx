import { Box, Button, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

export const ErrorElement = () => {
  const { errmsg } = useParams();
  const navigate = useNavigate();

  if (errmsg) {
    const [status, msg] = errmsg?.split("-");
    return (
      <Box
        sx={{
          height: window.innerHeight - 64,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Error: {status}</Typography>
        <Typography variant="h4" align="center">
          {msg}
        </Typography>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    );
  }

  return <div>Error</div>;
};
