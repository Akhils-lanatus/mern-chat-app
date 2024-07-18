import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../services/api";
import { showToast } from "../../services/showToast";
import CustomizedProgressBars from "../../common/circularProgress";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

export default function SignIn({ setAuthPage }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

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
          Register
        </Typography>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirm_password: "",
            avatar: null,
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("Name is required")
              .max(20, "Max 20 characters are allowed"),
            email: Yup.string()
              .required("Email is required")
              .email("Invalid email format"),
            password: Yup.string()
              .required("Password is required")
              .min(4, "Enter at least 4 characters")
              .max(16, "Max 16 characters are allowed"),
            confirm_password: Yup.string()
              .required("Confirm Password is required")
              .oneOf([Yup.ref("password"), null], "Passwords didn't match"),
            avatar: Yup.mixed()
              .required("Avatar needed")
              .test(
                "fileSize",
                "File too large (Max 2 MB)",
                (value) => value && !(value.size >= 1024 * 1024 * 2)
              )
              .test(
                "fileFormat",
                "Unsupported Format",
                (value) =>
                  value &&
                  ["image/png", "image/jpg", "image/jpeg"].includes(value.type)
              ),
          })}
          onSubmit={async (values, { resetForm }) => {
            const formData = new FormData();
            for (let key in values) {
              formData.append(key, values[key]);
            }
            setIsLoading(true);
            const res = await registerUser(formData);
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
              setAuthPage("login");
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <Field
                as={TextField}
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete={"false"}
              />
              <Typography color={"red"} fontSize={"12px"}>
                {<ErrorMessage name="name" />}
              </Typography>
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    sx={{ mt: 1.5, width: "100%" }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <Field
                      as={OutlinedInput}
                      id="outlined-adornment-password"
                      name="password"
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
                    />
                    <Typography color={"red"} fontSize={"12px"}>
                      {<ErrorMessage name="password" />}
                    </Typography>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    sx={{ mt: 1.5, width: "100%" }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-confirm-password">
                      Confirm Password
                    </InputLabel>
                    <Field
                      as={OutlinedInput}
                      name="confirm_password"
                      id="outlined-adornment-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm-password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="confirm-password"
                    />
                    <Typography color={"red"} fontSize={"12px"}>
                      {<ErrorMessage name="confirm_password" />}
                    </Typography>
                  </FormControl>
                </Grid>
              </Grid>

              <InputLabel
                sx={{ mt: 1, mb: -1.5, color: "black" }}
                htmlFor="avatar"
              >
                Select Avatar
              </InputLabel>
              <Field
                as={TextField}
                type="file"
                margin="normal"
                fullWidth
                id="avatar"
                name="avatar"
                inputProps={{ accept: "image/png,image/jpg,image/jpeg" }}
                value={undefined}
                onChange={(event) => {
                  setFieldValue("avatar", event.currentTarget.files[0]);
                }}
              />
              <Typography color={"red"} fontSize={"12px"}>
                {<ErrorMessage name="avatar" />}
              </Typography>

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
                {isLoading ? "Registering..." : "Register"}
                {isLoading && <CustomizedProgressBars size={20} />}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
