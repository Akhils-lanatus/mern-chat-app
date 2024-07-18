import { Box, Button, Container, Stack } from "@mui/material";
import { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
const HomePage = () => {
  const [authPage, setAuthPage] = useState("login");

  return (
    <Container
      sx={{
        mt: 4,
      }}
    >
      <Box>
        <Stack
          color="primary"
          aria-label="Platform"
          sx={{
            borderColor: "#fff !important",
          }}
          flexDirection={"row"}
          justifyContent={"center"}
          gap={4}
        >
          <Button
            variant={authPage === "login" ? "contained" : "text"}
            onClick={() => {
              setAuthPage("login");
            }}
            size="large"
            sx={{ fontSize: "medium" }}
            color="success"
          >
            Login
          </Button>
          <Button
            variant={authPage === "register" ? "contained" : "text"}
            onClick={() => {
              setAuthPage("register");
            }}
            size="large"
            color="success"
            sx={{ fontSize: "medium" }}
          >
            Register
          </Button>
        </Stack>
      </Box>
      {authPage === "login" ? (
        <Login />
      ) : (
        <Register setAuthPage={setAuthPage} />
      )}
    </Container>
  );
};

export default HomePage;
