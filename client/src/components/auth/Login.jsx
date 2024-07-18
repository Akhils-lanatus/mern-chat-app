import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import CustomizedProgressBars from "../../common/circularProgress";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../services/api";
import { showToast } from "../../services/showToast";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#2e7d32" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color={"#232323"}>
          Login
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .required("Email is required")
              .email("Invalid email format"),
            password: Yup.string()
              .required("Password is required")
              .min(4, "Enter at least 4 characters")
              .max(16, "Max 16 characters are allowed"),
          })}
          onSubmit={async (values, { resetForm }) => {
            setIsLoading(true);
            const res = await loginUser(values);
            if (res.error) {
              const msg =
                res.error.response.data.message || "Internal Server Error";
              showToast("ERROR", msg);
              setIsLoading(false);
            }
            if (res.data) {
              showToast("SUCCESS", res.data.message);
              setIsLoading(false);
              resetForm();
            }
          }}
        >
          <Form sx={{ mt: 1 }}>
            <Field
              as={TextField}
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete={"false"}
            />
            <Typography color={"red"} fontSize={"12px"}>
              {<ErrorMessage name="email" />}
            </Typography>
            <FormControl sx={{ mt: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <Field
                as={OutlinedInput}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                name="password"
              />
              <Typography color={"red"} fontSize={"12px"}>
                {<ErrorMessage name="password" />}
              </Typography>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isLoading}
              sx={{
                mt: 2,
                mb: 2,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-end",
                gap: "20px",
              }}
            >
              {isLoading ? "Verifying..." : "Login"}
              {isLoading && <CustomizedProgressBars size={20} />}
            </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
}
