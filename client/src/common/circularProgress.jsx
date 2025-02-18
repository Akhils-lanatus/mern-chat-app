import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

function CircularProgressSpinner(props) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
          animationDuration: "250ms",
          position: "absolute",
          left: 0,
          bottom: 2.5,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={props.size}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export default function CustomizedProgressBars({ size = 30 }) {
  return (
    <Stack spacing={2}>
      <CircularProgressSpinner size={size} />
    </Stack>
  );
}
